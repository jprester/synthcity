import { useEffect, useMemo, useRef, useState } from "react";
import { Mesh, PlaneGeometry, MeshBasicMaterial, DoubleSide } from "three";
import type { Material } from "three";
import { useFrame } from "@react-three/fiber";
import { useGameStore } from "../../context/GameContext";
import { generateLayout, loadLayoutFromURL } from "../../config/cityLayouts";
import { createPerlin } from "../../utils";
import type { FiniteCityLayout } from "../../config/cityLayouts";
import {
  InstancedBuildings,
  type BuildingDescriptor,
} from "../visuals/InstancedBuildings";
import { CityBlockUpdateableVisuals } from "../visuals/CityBlockUpdateableVisuals";
import type { GameRuntime, UpdateableVisualState } from "../../types/game";

// Holographic wall-ad textures with their native (width / height) aspect.
// Used to size the procedural plane on the building wall so the image isn't
// stretched and so portrait / landscape compositions feel intentional.
const ADS_HOLO_META = [
  { key: "ads_holo_01", aspect: 964 / 1280 }, // portrait — ninja
  { key: "ads_holo_02", aspect: 1 }, // square — Sengoku icon
  { key: "ads_holo_03", aspect: 853 / 1280 }, // portrait — pixel koi
  { key: "ads_holo_04", aspect: 964 / 1280 }, // portrait — calligraphy
  { key: "ads_holo_05", aspect: 1280 / 717 }, // landscape (16:9) — cdbj
  { key: "ads_holo_06", aspect: 1280 / 900 }, // landscape (~3:2) — teal gradient
  { key: "ads_holo_07", aspect: 1 }, // square — cyberpunk visual
  { key: "ads_holo_08", aspect: 1280 / 717 }, // landscape (16:9) — retrowave
  { key: "ads_holo_09", aspect: 1 }, // square — ramen poster
  { key: "ads_holo_10", aspect: 1 }, // square — dragon logo
] as const;

const ADS_HOLO_PORTRAIT = ADS_HOLO_META.filter((a) => a.aspect <= 0.95);
const ADS_HOLO_LANDSCAPE = ADS_HOLO_META.filter((a) => a.aspect >= 1.2);
const ADS_HOLO_SQUARE = ADS_HOLO_META.filter(
  (a) => a.aspect > 0.95 && a.aspect < 1.2,
);

// Buildings with big, flat side walls — ideal hosts for wide landscape ads.
// Landscape ads_holo_* (16:9 and 3:2) get routed almost exclusively here so
// they sit on a real surface instead of floating in front of a narrow tower.
const BIG_FLAT_WALL_BUILDINGS: ReadonlySet<string> = new Set([
  "tower_01", // cyberpunk-hightower-big-with-logo
  "tower_05", // quality-skyscraper-rectangular-big
  "tower_06", // lz-tower-4
  "tower_08", // sci-fi-corporate-building
  "tower_10", // sci-fi-brutalist-tower-with-ads
  "tower_11", // new-massive-skyscraper.001
  "skyscraper_05", // Frankfurt_Skyper_LOD0
  "skyscraper_07", // ny-office-building
  "skyscraper_08", // lz-skyscraper-2
  "skyscraper_11", // quality-skyscraper-thick
]);

type WallAd = {
  matKey: string;
  aspect: number;
  /** World-space position of the plane center */
  x: number;
  y: number;
  z: number;
  /** Plane width / height in world units */
  width: number;
  height: number;
  /** Y rotation so the plane faces outward from the building */
  rotationY: number;
  /** Optional periodic texture cycling among same-orientation candidates */
  update?: () => void;
};

type GroundLight = {
  x: number;
  z: number;
  hue: number;
};

export function FiniteCitySystem() {
  const { gameRef, settings } = useGameStore();
  const { visibility } = settings;
  const initRef = useRef(false);
  const spawnAppliedRef = useRef(false);

  const [layout, setLayout] = useState<FiniteCityLayout | null>(null);

  useEffect(() => {
    if (settings.finiteLayout) {
      loadLayoutFromURL(`/layouts/${settings.finiteLayout}`)
        .then(setLayout)
        .catch((err) => {
          console.warn(
            "Failed to load layout, falling back to generated:",
            err,
          );
          setLayout(generateLayout(settings.worldSeed));
        });
    } else {
      setLayout(generateLayout(settings.worldSeed));
    }
  }, [settings.finiteLayout, settings.worldSeed]);

  // Initialize noise and apply spawn position once game is running
  useFrame(() => {
    const game = gameRef.current;
    if (!game || !game.isRunning || !game.initialized) return;

    if (!initRef.current) {
      if (!game.cityBlockNoise) {
        game.cityBlockNoise = createPerlin(game.settings.worldSeed);
        game.cityBlockNoise.noiseDetail(8, 0.5);
        game.cityBlockNoiseFactor = 0.0017;
      }
      game.generatorsInitialized = true;
      initRef.current = true;
    }

    // Apply layout spawn position once both game and layout are ready
    if (!spawnAppliedRef.current && layout && game.player) {
      const { x, z, rotationY } = layout.spawn;
      game.player.body.position.x = x;
      game.player.body.position.z = z;
      if (game.player.camera_target) {
        game.player.camera_target.rotation.y = rotationY;
      }
      spawnAppliedRef.current = true;
    }
  });

  const buildings: BuildingDescriptor[] = useMemo(
    () =>
      (layout?.buildings ?? []).map((b) => ({
        modelKey: b.modelKey,
        materialKey: b.materialKey,
        position: { x: b.x, y: 0, z: b.z },
        scale: { x: b.scaleX, y: b.scaleY, z: b.scaleZ },
        rotationY: b.rotationY,
        blockKey: "finite",
      })),
    [layout],
  );

  // Generate smoke visual states from building positions (seeded for determinism)
  const smokeStates = useMemo(() => {
    if (!layout) return [];
    const smokes: UpdateableVisualState[] = [];
    const smokeMats = ["smoke_01", "smoke_02", "smoke_03"];
    // Simple seeded PRNG from world seed
    let seed = settings.worldSeed;
    const seededRandom = () => {
      seed = (seed * 16807 + 0) % 2147483647;
      return (seed - 1) / 2147483646;
    };
    for (const b of layout.buildings) {
      if (seededRandom() < 0.05) {
        const s = 1 + seededRandom() * 8;
        const sy = s * (1 + seededRandom() * 0.5);
        smokes.push({
          isVisual: true,
          kind: "smoke",
          modelKey: "smoke",
          matKey: smokeMats[Math.floor(seededRandom() * smokeMats.length)],
          position: { x: b.x, y: 190 * b.scaleY, z: b.z },
          scale: { x: s, y: sy, z: s },
          rstep: seededRandom() * 7,
        });
      }
    }
    return smokes;
  }, [layout, settings.worldSeed]);

  // Generate topper visual states for industrial buildings (s_03)
  const topperStates = useMemo(() => {
    if (!layout) return [];
    const toppers: UpdateableVisualState[] = [];
    const topperGeos = [
      "topper_01",
      "topper_02",
      "topper_03",
      "topper_04",
      "topper_05",
      "topper_06",
      "topper_07",
      "topper_08",
      "topper_09",
      "topper_10",
      "topper_11",
      "topper_12",
    ];
    const topperMats = [
      "ads_large_01",
      "ads_large_02",
      "ads_large_03",
      "ads_large_04",
      "ads_large_05",
    ];
    let seed = settings.worldSeed ^ 0xd0d0;
    const seededRandom = () => {
      seed = (seed * 16807 + 0) % 2147483647;
      return (seed - 1) / 2147483646;
    };
    for (const b of layout.buildings) {
      if (!b.modelKey.startsWith("s_03_")) continue;
      // ~5% of industrial buildings
      if (seededRandom() > 0.05) continue;
      const geoKey = topperGeos[Math.floor(seededRandom() * topperGeos.length)];
      const matKey = topperMats[Math.floor(seededRandom() * topperMats.length)];
      const s = 0.8 + seededRandom();
      const rdir =
        seededRandom() <= 0.5 ? seededRandom() * 0.01 : -seededRandom() * 0.01;
      const topper: UpdateableVisualState = {
        isVisual: true,
        kind: "topper",
        modelKey: geoKey,
        matKey,
        position: { x: b.x, y: 190 * b.scaleY, z: b.z },
        scale: { x: s, y: s, z: s },
        rotationY: 0,
      };
      topper.update = () => {
        topper.rotationY = (topper.rotationY ?? 0) + rdir;
      };
      toppers.push(topper);
    }
    return toppers;
  }, [layout, settings.worldSeed]);

  // Generate spotlight/hologram visual states for industrial buildings (s_03)
  const spotlightStates = useMemo(() => {
    if (!layout) return [];
    const spots: UpdateableVisualState[] = [];
    const spotMats = [
      "spotlight_01",
      "spotlight_02",
      "spotlight_03",
      "spotlight_04",
    ];
    let seed = settings.worldSeed ^ 0x5b;
    const seededRandom = () => {
      seed = (seed * 16807 + 0) % 2147483647;
      return (seed - 1) / 2147483646;
    };
    for (const b of layout.buildings) {
      if (!b.modelKey.startsWith("s_03_")) continue;
      // ~25% of industrial buildings
      if (seededRandom() > 0.25) continue;
      const matKey = spotMats[Math.floor(seededRandom() * spotMats.length)];
      const s = 10 + seededRandom() * 10;
      const spot: UpdateableVisualState = {
        isVisual: true,
        kind: "spotlight",
        modelKey: "spotlight",
        matKey,
        position: { x: b.x, y: 160 * b.scaleY, z: b.z },
        scale: { x: s, y: s, z: s },
        rstep: seededRandom() * 7,
      };
      spot.update = () => {
        spot.rstep = (spot.rstep ?? 0) + 0.01;
      };
      spots.push(spot);
    }
    return spots;
  }, [layout, settings.worldSeed]);

  // Generate procedural holographic wall ads on towers and skyscrapers.
  // The legacy ads_s_04 / ads_s_05 OBJ ad models were built for the original
  // OBJ buildings; the finite city uses GLB tower_*/skyscraper_* assets that
  // those geometries don't fit. Instead, attach a single ad plane (sized to
  // the texture's native aspect) to one face of each eligible building.
  const wallAdStates = useMemo(() => {
    if (!layout) return [];
    const ads: WallAd[] = [];

    let seed = settings.worldSeed ^ 0xb1ad;
    const seededRandom = () => {
      seed = (seed * 16807 + 0) % 2147483647;
      return (seed - 1) / 2147483646;
    };
    const pick = <T,>(arr: readonly T[]): T =>
      arr[Math.floor(seededRandom() * arr.length)];

    for (const b of layout.buildings) {
      const isTower = b.modelKey.startsWith("tower_");
      const isSkyscraper = b.modelKey.startsWith("skyscraper_");
      if (!isTower && !isSkyscraper) continue;

      // ~55% of eligible buildings get a wall ad — leaves enough breathing
      // room that the skyline doesn't read as solid billboards.
      if (seededRandom() > 0.55) continue;

      // Pick a texture group that suits the building silhouette.
      // Big flat-walled buildings host the wide landscape ads — those need a
      // real surface so they don't look like they're floating. Other towers
      // get portraits / squares; other skyscrapers stay portrait/square too.
      const isBigFlat = BIG_FLAT_WALL_BUILDINGS.has(b.modelKey);
      const r = seededRandom();
      let pool: readonly (typeof ADS_HOLO_META)[number][];
      if (isBigFlat) {
        // ~75% landscape, ~25% square — keep things varied on the big walls.
        pool = r < 0.75 ? ADS_HOLO_LANDSCAPE : ADS_HOLO_SQUARE;
      } else if (isTower) {
        pool = r < 0.65 ? ADS_HOLO_PORTRAIT : ADS_HOLO_SQUARE;
      } else {
        // Non-flat skyscrapers — stay narrow so they read as attached.
        pool = r < 0.55 ? ADS_HOLO_PORTRAIT : ADS_HOLO_SQUARE;
      }
      const meta = pick(pool);

      // Plane sizing: scale to the building's vertical scale, with a base
      // height tuned per silhouette. Width is derived from the texture's
      // native aspect so the image isn't squashed.
      const baseHeight = isTower
        ? 70 + seededRandom() * 35 // 70–105 units tall
        : 55 + seededRandom() * 25; // 55–80 units tall
      const height = baseHeight * b.scaleY;
      const width = height * meta.aspect;

      // Pick one of 4 cardinal faces for the ad to sit on, then offset the
      // plane outward by enough to clear the wall. The exact wall distance
      // varies by building, so a conservative offset works for most.
      const faceIdx = Math.floor(seededRandom() * 4);
      const faceAngle = (faceIdx * Math.PI) / 2;
      const lateralOffset = isTower ? 36 : 32;

      // Vertical placement: upper-middle of the building. Towers are
      // typically ~150–250 units tall, skyscrapers ~120–180.
      const baseY = isTower ? 90 : 70;
      const yJitter = isTower ? seededRandom() * 50 : seededRandom() * 35;
      const y = (baseY + yJitter) * b.scaleY;

      const totalAngle = b.rotationY + faceAngle;
      const dx = Math.sin(totalAngle) * lateralOffset;
      const dz = Math.cos(totalAngle) * lateralOffset;

      const ad: WallAd = {
        matKey: meta.key,
        aspect: meta.aspect,
        x: b.x + dx,
        y,
        z: b.z + dz,
        width: width / 1.5,
        height: height / 1.5,
        // Plane faces +Z by default — rotate so its normal points away from
        // the building, matching the cardinal face we chose.
        rotationY: totalAngle,
      };

      // 40% of wall ads cycle texture among same-orientation candidates,
      // staying within the chosen pool so aspect / plane size remain valid.
      if (seededRandom() < 0.4) {
        const interval = 240 + Math.floor(seededRandom() * 600);
        let counter = Math.floor(seededRandom() * interval);
        ad.update = () => {
          counter++;
          if (counter > interval) {
            counter = 0;
            const next = pool[Math.floor(Math.random() * pool.length)];
            // Only swap textures within same aspect bucket; plane size stays.
            ad.matKey = next.key;
          }
        };
      }

      ads.push(ad);
    }
    return ads;
  }, [layout, settings.worldSeed]);

  // Generate ground uplights at a subset of building positions
  const groundLights: GroundLight[] = useMemo(() => {
    if (!layout) return [];
    const lights: GroundLight[] = [];
    let seed = settings.worldSeed ^ 0xbeef;
    const seededRandom = () => {
      seed = (seed * 16807 + 0) % 2147483647;
      return (seed - 1) / 2147483646;
    };
    for (const b of layout.buildings) {
      if (seededRandom() < 0.06) {
        const r = seededRandom();
        let hue: number;
        if (r < 0.3) {
          hue = 300 + r * 100; // magenta/pink
        } else if (r < 0.6) {
          hue = 180 + (r - 0.3) * 100; // cyan/teal
        } else {
          hue = 30 + (r - 0.6) * 80; // warm amber
        }
        lights.push({ x: b.x, z: b.z, hue });
      }
    }
    return lights;
  }, [layout, settings.worldSeed]);

  if (!layout) return null;

  return (
    <>
      <FiniteCityGround
        layout={layout}
        game={gameRef.current}
        visibility={visibility}
      />
      {visibility.buildings && (
        <InstancedBuildings buildings={buildings} game={gameRef.current} />
      )}
      <FiniteCitySmoke
        smokeStates={smokeStates}
        game={gameRef.current}
        visibility={visibility}
      />
      <FiniteCityWallAds
        wallAdStates={wallAdStates}
        game={gameRef.current}
        visibility={visibility}
      />
      <FiniteCityToppers
        topperStates={topperStates}
        game={gameRef.current}
        visibility={visibility}
      />
      <FiniteCitySpotlights
        spotlightStates={spotlightStates}
        game={gameRef.current}
        visibility={visibility}
      />
      {/* Set to true to enable ground uplights */}
      {false &&
        groundLights.map((gl, i) => (
          <group key={`gl-${i}`} position={[gl.x, 5, gl.z]}>
            <pointLight
              intensity={4000}
              distance={300}
              decay={1.5}
              color={`hsl(${gl.hue}, 100%, 55%)`}
            />
          </group>
        ))}
      <FiniteCityCollision layout={layout} game={gameRef.current} />
      <FiniteCityBoundary layout={layout} game={gameRef.current} />
    </>
  );
}

// ─── Smoke ───────────────────────────────────────────────────────────────────

function FiniteCitySmoke({
  smokeStates,
  game,
  visibility,
}: {
  smokeStates: UpdateableVisualState[];
  game: GameRuntime | null;
  visibility: { smoke: boolean };
}) {
  // Animate rstep for all smoke each frame
  useFrame(() => {
    for (const s of smokeStates) {
      if (s.rstep !== undefined) {
        s.rstep += 0.0025;
      }
    }
  });

  // Wait for assets to be fully loaded before rendering smoke
  // (CityBlockUpdateableVisuals doesn't re-run its useEffect when assets finish loading)
  if (!game?.assets?.loaded) return null;

  return (
    <>
      {smokeStates.map((s, i) => (
        <CityBlockUpdateableVisuals
          key={i}
          updateable={s}
          game={game}
          visibility={visibility as any}
        />
      ))}
    </>
  );
}

// ─── Wall Ads (holographic billboards on towers / skyscrapers) ───────────────

function FiniteCityWallAds({
  wallAdStates,
  game,
  visibility,
}: {
  wallAdStates: WallAd[];
  game: GameRuntime | null;
  visibility: { ads: boolean };
}) {
  // Tick texture-cycling counters each frame.
  useFrame(() => {
    for (const ad of wallAdStates) {
      ad.update?.();
    }
  });

  // Shared unit plane geometry — meshes use scale to set actual dimensions.
  const planeGeom = useMemo(() => new PlaneGeometry(1, 1), []);
  useEffect(() => () => planeGeom.dispose(), [planeGeom]);

  // Build one Mesh per wall ad so we can swap material refs imperatively
  // when an ad cycles its texture without rebuilding the scene graph.
  const meshes = useMemo(() => {
    if (!game?.assets?.loaded) return [];
    return wallAdStates.map((ad) => {
      const mat = game.assets!.getMaterial(ad.matKey) as Material | undefined;
      if (mat) mat.name = ad.matKey;
      const mesh = new Mesh(planeGeom, mat ?? new MeshBasicMaterial());
      mesh.position.set(ad.x, ad.y, ad.z);
      mesh.rotation.y = ad.rotationY;
      mesh.scale.set(ad.width, ad.height, 1);
      return mesh;
    });
  }, [wallAdStates, game?.assets?.loaded, planeGeom]);

  // Sync material when ad.matKey changes (texture cycling).
  useFrame(() => {
    if (!game?.assets?.loaded) return;
    for (let i = 0; i < wallAdStates.length; i++) {
      const ad = wallAdStates[i];
      const mesh = meshes[i];
      if (!mesh) continue;
      const currentName = (mesh.material as Material).name;
      if (currentName !== ad.matKey) {
        const next = game.assets!.getMaterial(ad.matKey) as
          | Material
          | undefined;
        if (next) {
          // Tag the material with its key for cheap comparison next tick.
          next.name = ad.matKey;
          mesh.material = next;
        }
      }
    }
  });

  if (!game?.assets?.loaded || !visibility.ads) return null;

  return (
    <>
      {meshes.map((m, i) => (
        <primitive key={i} object={m} />
      ))}
    </>
  );
}

// ─── Toppers ──────────────────────────────────────────────────────────────────

function FiniteCityToppers({
  topperStates,
  game,
  visibility,
}: {
  topperStates: UpdateableVisualState[];
  game: GameRuntime | null;
  visibility: { toppers: boolean };
}) {
  useFrame(() => {
    for (const t of topperStates) {
      t.update?.();
    }
  });

  if (!game?.assets?.loaded || !visibility.toppers) return null;

  return (
    <>
      {topperStates.map((t, i) => (
        <CityBlockUpdateableVisuals
          key={i}
          updateable={t}
          game={game}
          visibility={visibility as any}
        />
      ))}
    </>
  );
}

// ─── Spotlights / Holograms ──────────────────────────────────────────────────

function FiniteCitySpotlights({
  spotlightStates,
  game,
  visibility,
}: {
  spotlightStates: UpdateableVisualState[];
  game: GameRuntime | null;
  visibility: { spotlights: boolean };
}) {
  useFrame(() => {
    for (const s of spotlightStates) {
      s.update?.();
    }
  });

  if (!game?.assets?.loaded || !visibility.spotlights) return null;

  return (
    <>
      {spotlightStates.map((s, i) => (
        <CityBlockUpdateableVisuals
          key={i}
          updateable={s}
          game={game}
          visibility={visibility as any}
        />
      ))}
    </>
  );
}

// ─── Ground + Storefronts ─────────────────────────────────────────────────────

function FiniteCityGround({
  layout,
  game,
  visibility,
}: {
  layout: FiniteCityLayout;
  game: GameRuntime | null;
  visibility: { ground: boolean; storefronts: boolean };
}) {
  const groundMeshes = useMemo(() => {
    if (!game?.assets?.loaded) return [];
    if (!visibility.ground) return [];

    return layout.groundTiles.map((tile) => {
      const geometry = game.assets!.getModel("ground");
      const material = game.assets!.getMaterial("ground");
      const mesh = new Mesh(geometry, material);
      mesh.position.set(tile.x, 0, tile.z);
      mesh.rotation.x = -Math.PI / 2;
      return mesh;
    });
  }, [layout, game?.assets?.loaded, visibility.ground]);

  const storefrontMeshes = useMemo(() => {
    if (!game?.assets?.loaded) return [];
    if (!visibility.storefronts) return [];

    return layout.storefronts.map((sf) => {
      const geometry = game.assets!.getModel("storefronts");
      const material = game.assets!.getMaterial(sf.materialKey);
      const mesh = new Mesh(geometry, material);
      mesh.position.set(sf.x, 0, sf.z);
      return mesh;
    });
  }, [layout, game?.assets?.loaded, visibility.storefronts]);

  return (
    <group>
      {groundMeshes.map((mesh) => (
        <primitive key={mesh.uuid} object={mesh} receiveShadow />
      ))}
      {storefrontMeshes.map((mesh) => (
        <primitive key={mesh.uuid} object={mesh} />
      ))}
    </group>
  );
}

// ─── Collision Registration ───────────────────────────────────────────────────

function FiniteCityCollision({
  layout,
  game,
}: {
  layout: FiniteCityLayout;
  game: GameRuntime | null;
}) {
  const colliderMeshesRef = useRef<Mesh[]>([]);

  useEffect(() => {
    if (!game?.assets?.loaded || !game.collider) return;

    const meshes: Mesh[] = [];

    // Building collision meshes
    for (const b of layout.buildings) {
      const geometry = game.assets!.getModel(b.modelKey);
      if (!geometry) continue;
      const material = game.assets!.getMaterial(b.materialKey);
      const mesh = new Mesh(geometry, material);
      mesh.position.set(b.x, 0, b.z);
      mesh.scale.set(b.scaleX, b.scaleY, b.scaleZ);
      mesh.rotation.y = b.rotationY;
      mesh.updateMatrixWorld(true);
      game.collider.add(mesh);
      meshes.push(mesh);
    }

    // Storefront collision meshes
    for (const sf of layout.storefronts) {
      const geometry = game.assets!.getModel("storefronts");
      if (!geometry) continue;
      const material = game.assets!.getMaterial(sf.materialKey);
      const mesh = new Mesh(geometry, material);
      mesh.position.set(sf.x, 0, sf.z);
      mesh.updateMatrixWorld(true);
      game.collider.add(mesh);
      meshes.push(mesh);
    }

    colliderMeshesRef.current = meshes;

    return () => {
      for (const mesh of colliderMeshesRef.current) {
        game.collider.remove(mesh.uuid);
      }
      colliderMeshesRef.current = [];
    };
  }, [layout, game?.assets?.loaded, game?.collider]);

  return null;
}

// ─── Boundary Walls ───────────────────────────────────────────────────────────

function FiniteCityBoundary({
  layout,
  game,
}: {
  layout: FiniteCityLayout;
  game: GameRuntime | null;
}) {
  const wallMeshesRef = useRef<Mesh[]>([]);

  useEffect(() => {
    if (!game?.collider) return;

    const { minX, maxX, minZ, maxZ } = layout.bounds;
    const wallHeight = 1000;
    const xSpan = maxX - minX;
    const zSpan = maxZ - minZ;
    const centerX = (minX + maxX) / 2;
    const centerZ = (minZ + maxZ) / 2;

    const invisMat = new MeshBasicMaterial({
      visible: false,
      side: DoubleSide,
    });

    const walls: Mesh[] = [];

    // North wall (maxZ)
    const northGeo = new PlaneGeometry(xSpan, wallHeight);
    const northWall = new Mesh(northGeo, invisMat);
    northWall.position.set(centerX, wallHeight / 2, maxZ);
    northWall.updateMatrixWorld(true);
    walls.push(northWall);

    // South wall (minZ)
    const southGeo = new PlaneGeometry(xSpan, wallHeight);
    const southWall = new Mesh(southGeo, invisMat);
    southWall.position.set(centerX, wallHeight / 2, minZ);
    southWall.updateMatrixWorld(true);
    walls.push(southWall);

    // East wall (maxX)
    const eastGeo = new PlaneGeometry(zSpan, wallHeight);
    const eastWall = new Mesh(eastGeo, invisMat);
    eastWall.position.set(maxX, wallHeight / 2, centerZ);
    eastWall.rotation.y = Math.PI / 2;
    eastWall.updateMatrixWorld(true);
    walls.push(eastWall);

    // West wall (minX)
    const westGeo = new PlaneGeometry(zSpan, wallHeight);
    const westWall = new Mesh(westGeo, invisMat);
    westWall.position.set(minX, wallHeight / 2, centerZ);
    westWall.rotation.y = Math.PI / 2;
    westWall.updateMatrixWorld(true);
    walls.push(westWall);

    for (const wall of walls) {
      game.collider.add(wall);
    }
    wallMeshesRef.current = walls;

    return () => {
      for (const wall of wallMeshesRef.current) {
        game.collider.remove(wall.uuid);
      }
      wallMeshesRef.current = [];
    };
  }, [layout, game?.collider]);

  return null;
}
