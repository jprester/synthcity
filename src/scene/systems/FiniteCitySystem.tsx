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
  { key: "ads_holo_11", aspect: 1 }, // square — image-1812
  { key: "ads_holo_12", aspect: 320 / 1280 }, // tall portrait (1:4) — neon sign banner
  { key: "ads_holo_13", aspect: 853 / 1280 }, // portrait — Geisha poster
  { key: "ads_holo_14", aspect: 1280 / 853 }, // landscape (~3:2) — 0_1
  { key: "ads_holo_15", aspect: 1280 / 717 }, // landscape (16:9) — rajupaq R&B
  { key: "ads_holo_16", aspect: 1280 / 853 }, // landscape (~3:2) — holographic letters
  { key: "ads_holo_17", aspect: 1280 / 717 }, // landscape (16:9) — energy drink
] as const;

// Aspect buckets — used by the small-building procedural placement below.
// Tower / skyscraper ads are pinned manually so don't go through buckets.
const ADS_HOLO_PORTRAIT = ADS_HOLO_META.filter(
  (a) => a.aspect > 0.45 && a.aspect <= 0.95,
);
const ADS_HOLO_SQUARE = ADS_HOLO_META.filter(
  (a) => a.aspect > 0.95 && a.aspect < 1.2,
);

// Buildings with big, flat side walls — reference for manual-entry sizing.
// Wide landscape ads sit well here; narrower or rounded towers may need
// reduced height / offset. Not used at runtime, kept as authoring notes:
//   tower_01 cyberpunk-hightower-big-with-logo  | tower_05 rectangular-big
//   tower_06 lz-tower-4                         | tower_08 sci-fi-corporate
//   tower_10 sci-fi-brutalist-with-ads          | tower_11 new-massive
//   skyscraper_05 Frankfurt_Skyper              | skyscraper_07 ny-office
//   skyscraper_08 lz-skyscraper-2               | skyscraper_11 quality-thick

// ── Manual wall-ad placement ────────────────────────────────────────────────
//
// Explicit list of holographic billboards mounted on specific tower /
// skyscraper buildings. The city template is finite and each big building
// is unique, so procedural placement isn't worth the lack of control.
//
// Target a building by its grid coords (gi = col, gj = row) from the
// CITY_TEMPLATE in generateLayout.ts. On layout init we print a
// console.table of every tower / skyscraper with its (gi, gj) so you can
// copy entries from there.
//
// Add an ad = drop a new entry. Default values produce a reasonable
// ~70-unit-tall billboard on the north face; override any field to tune.
//
// Wall-relative coordinate system: imagine standing outside the building,
// looking at the ad. Then:
//   • offsetOut  → toward/away from wall (depth)
//   • offsetSide → left/right along the wall (the ad's local X)
//   • y          → world Y (the ad's local Y, since the building is upright)
//   • tilt       → pitch the ad forward/back around its horizontal axis
//   • rotationOffset → spin the ad around the world's vertical Y axis
type WallAdManualEntry = {
  /** Grid column from CITY_TEMPLATE */
  gi: number;
  /** Grid row from CITY_TEMPLATE */
  gj: number;
  /** Material key — usually `ads_holo_NN` */
  matKey: string;
  /** Cardinal face of the building (0=N, 1=E, 2=S, 3=W), pre-rotation */
  face?: 0 | 1 | 2 | 3;
  /** Distance out from the wall — depth axis. */
  offsetOut?: number;
  /** Slide along the wall surface — positive = right when you face the ad. */
  offsetSide?: number;
  /** Absolute Y position of the plane center (units). Vertical axis. */
  y?: number;
  /** Plane height (units). Width auto-derived from the texture's aspect. */
  height?: number;
  /** Optional explicit width override; otherwise height × texture aspect. */
  width?: number;
  /** Pitch in radians — positive tilts the top of the ad toward the viewer. */
  tilt?: number;
  /** Extra rotation around Y in radians (e.g. to angle the billboard). */
  rotationOffset?: number;

  // ── Material overrides ─────────────────────────────────────────────────
  // When any of these is set, the ad gets its own cloned material so the
  // tweak doesn't leak to other ads using the same matKey. Cloning costs
  // a small amount of memory per overridden ad — negligible for ~20 entries.
  //
  /** Multiplier on the base emissive intensity (1 = default, 2 = double). */
  emissiveIntensity?: number;
  /** Override the emissive tint. Accepts a hex number (0x44ccff) or a CSS
   *  string ("#44ccff", "hsl(...)"). Default is the faint cyan 0xddf6ff. */
  emissiveColor?: number | string;
  /** Override the material opacity. Default is 0.82. */
  opacity?: number;
};

const WALL_ADS_MANUAL: WallAdManualEntry[] = [
  // Northern tower row (gj=4) — two towers flanking the upper skyline
  {
    gi: 5,
    gj: 5,
    y: 645,
    matKey: "ads_holo_17",
    face: 1,
    height: 42,
    offsetOut: 74,
    emissiveIntensity: 0.92,
  }, // landscape: cyberpunk energy drink
  {
    gi: 5,
    gj: 5,
    y: 645,
    matKey: "ads_holo_17",
    face: 2,
    height: 42,
    offsetOut: 74,
    emissiveIntensity: 0.92,
  }, // landscape: cyberpunk energy drink
  {
    gi: 5,
    gj: 5,
    y: 645,
    matKey: "ads_holo_17",
    face: 3,
    height: 42,
    offsetOut: 74,
    emissiveIntensity: 0.92,
  }, // landscape: cyberpunk energy drink
  {
    gi: 5,
    gj: 5,
    y: 645,
    matKey: "ads_holo_17",
    face: 0,
    height: 42,
    offsetOut: 74,
    emissiveIntensity: 0.92,
  }, // landscape: cyberpunk energy drink
  {
    gi: 10,
    gj: 5,
    matKey: "ads_holo_01",
    face: 1,
    height: 80,
    offsetSide: -70,
    offsetOut: 25,
    y: 100,
    emissiveIntensity: 0.6,
  }, // portrait: ninja

  // Cyberdine tower (gi=7, gj=4) — prime real estate in the upper skyline, visible from spawn
  {
    gi: 7,
    gj: 4,
    matKey: "ads_holo_16",
    face: 3,
    height: 125,
    offsetOut: 80,
    y: 220,
  }, // landscape: holographic letters
  { gi: 13, gj: 5, matKey: "ads_holo_12", face: 2, height: 70 }, // Middle left commercial area - tall banner: neon Japanese

  // Skyscraper row in the mid-upper section — narrower high-rise buildings good for portrait ads. Ad is slightly inside the building as a stylistic choice to make them feel more embedded and less like floating billboards.
  {
    gi: 11,
    gj: 4,
    matKey: "ads_holo_04",
    face: 2,
    height: 155,
    offsetOut: 52,
    offsetSide: 10,
    y: 240,
    emissiveIntensity: 4,
  }, // portrait: calligraphy
  { gi: 11, gj: 7, matKey: "ads_holo_11", face: 3, height: 80, y: 180 }, // square: dragon logo

  // Center towers (gj=7) — left/right of dead center
  {
    gi: 4,
    gj: 7,
    matKey: "ads_holo_05",
    face: 0,
    height: 65,
    offsetOut: 26,
    y: 160,
  }, // landscape: cdbj

  {
    gi: 12,
    gj: 7,
    matKey: "ads_holo_07",
    face: 3,
    height: 85,
    y: 150,
    emissiveIntensity: 0.8,
  }, // square: cyberpunk girl

  // Lower buildings in the dead center (gj=8) — good for visibility from the street-level view
  { gi: 9, gj: 9, matKey: "ads_holo_08", face: 2, height: 100, y: 200 }, // landscape: retrowave
  { gi: 12, gj: 6, matKey: "ads_holo_03", face: 0, height: 200, y: 300 }, // portrait: pixel koi

  // Southern skyscrapers (gj=10) and tower row (gj=11)
  { gi: 4, gj: 12, matKey: "ads_holo_15", face: 1, height: 105, y: 200 }, // landscape: R&B
  {
    gi: 11,
    gj: 12,
    matKey: "ads_holo_09",
    face: 2,
    height: 140,
    y: 150,
    offsetOut: 76,
  }, // square: ramen
  {
    gi: 5,
    gj: 11,
    matKey: "ads_holo_14",
    face: 3,
    height: 125,
    y: 180,
    offsetOut: 27,
  }, // landscape: 0_1
  {
    gi: 13,
    gj: 5,
    matKey: "ads_holo_13",
    face: 1,
    height: 130,
    y: 60,
    offsetOut: 37,
    emissiveIntensity: 1.1,
  }, // portrait: Geisha

  // Bottom tower row (gj=12)
  {
    gi: 7,
    gj: 12,
    matKey: "ads_holo_06",
    face: 1,
    height: 75,
    y: 100,
    offsetOut: 50,
  }, // landscape: teal gradient
  {
    gi: 7,
    gj: 6,
    matKey: "ads_holo_02",
    face: 1,
    height: 80,
    y: 240,
    offsetOut: 0,
  }, // square: Sengoku icon
];

// Defaults applied when an entry leaves a field unset.
const WALL_AD_DEFAULTS = {
  face: 2 as 0 | 1 | 2 | 3, // south face — usually visible from spawn
  offsetOut: 36,
  y: 100,
  height: 70,
};

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
  /** X rotation (pitch) applied after Y rotation — use YXZ Euler order */
  rotationX: number;
  /** Per-ad material overrides — when any are set, the renderer clones
   *  the shared material so this ad can diverge from the others. */
  emissiveIntensityMul?: number;
  emissiveColor?: number | string;
  opacity?: number;
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

  // One-time log of every tower/skyscraper with its (gi, gj) cell coords,
  // so you can author WALL_ADS_MANUAL entries by reading off the table.
  useEffect(() => {
    if (!layout) return;
    const rows = layout.buildings
      .filter(
        (b) =>
          b.modelKey.startsWith("tower_") ||
          b.modelKey.startsWith("skyscraper_"),
      )
      .map((b) => ({
        gi: b.gi ?? -1,
        gj: b.gj ?? -1,
        modelKey: b.modelKey,
        x: Math.round(b.x),
        z: Math.round(b.z),
      }));
    if (rows.length > 0) {
      // eslint-disable-next-line no-console
      console.table(rows);
    }
  }, [layout]);

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

  // Wall ads come from two systems:
  //   • Manual list (WALL_ADS_MANUAL) — explicit per-building ads for the
  //     unique towers / skyscrapers. Each entry pins a specific texture to a
  //     specific (gi, gj) cell with tunable face / offset / size.
  //   • Procedural — only the small buildings (s_01/s_02/s_03) get this,
  //     as small storefront/apartment signage at low density.
  const wallAdStates = useMemo(() => {
    if (!layout) return [];
    const ads: WallAd[] = [];

    // ── Manual placements on tower / skyscraper buildings ────────────────
    const aspectByKey: Map<string, number> = new Map(
      ADS_HOLO_META.map((m) => [m.key, m.aspect]),
    );
    const buildingByCell = new Map<
      string,
      FiniteCityLayout["buildings"][number]
    >();
    for (const b of layout.buildings) {
      if (b.gi === undefined || b.gj === undefined) continue;
      // Each (gi, gj) tower / skyscraper cell maps to exactly one building.
      // Small buildings share cells (2×2 sub-grid), so we only key on the
      // first one we encounter — manual entries should target tower cells.
      const k = `${b.gi},${b.gj}`;
      if (!buildingByCell.has(k)) buildingByCell.set(k, b);
    }

    for (const entry of WALL_ADS_MANUAL) {
      const b = buildingByCell.get(`${entry.gi},${entry.gj}`);
      if (!b) {
        console.warn(
          `[WALL_ADS_MANUAL] No building at (gi=${entry.gi}, gj=${entry.gj})`,
        );
        continue;
      }
      const aspect = aspectByKey.get(entry.matKey);
      if (aspect === undefined) {
        console.warn(`[WALL_ADS_MANUAL] Unknown matKey: ${entry.matKey}`);
        continue;
      }

      const face = entry.face ?? WALL_AD_DEFAULTS.face;
      const offsetOut = entry.offsetOut ?? WALL_AD_DEFAULTS.offsetOut;
      const offsetSide = entry.offsetSide ?? 0;
      const y = entry.y ?? WALL_AD_DEFAULTS.y;
      const height = entry.height ?? WALL_AD_DEFAULTS.height;
      const width = entry.width ?? height * aspect;

      // Face index → angle around Y. The plane faces +Z by default; we
      // rotate it so its normal points outward from the chosen building face,
      // then add the building's own rotation and any per-entry tweak.
      const faceAngle = (face * Math.PI) / 2;
      const totalAngle = b.rotationY + faceAngle + (entry.rotationOffset ?? 0);

      // Out vector points away from the wall; tangent points along the wall
      // (perpendicular to "out", in the horizontal plane). Positive
      // offsetSide slides the ad to the viewer's right when facing the wall.
      const outX = Math.sin(totalAngle);
      const outZ = Math.cos(totalAngle);
      const tangentX = Math.cos(totalAngle);
      const tangentZ = -Math.sin(totalAngle);

      ads.push({
        matKey: entry.matKey,
        aspect,
        x: b.x + outX * offsetOut + tangentX * offsetSide,
        y,
        z: b.z + outZ * offsetOut + tangentZ * offsetSide,
        width,
        height,
        rotationY: totalAngle,
        rotationX: entry.tilt ?? 0,
        emissiveIntensityMul: entry.emissiveIntensity,
        emissiveColor: entry.emissiveColor,
        opacity: entry.opacity,
      });
    }

    // ── Procedural ads on small buildings (s_01/s_02/s_03) ───────────────
    let seed = settings.worldSeed ^ 0xb1ad;
    const seededRandom = () => {
      seed = (seed * 16807 + 0) % 2147483647;
      return (seed - 1) / 2147483646;
    };
    const pick = <T,>(arr: readonly T[]): T =>
      arr[Math.floor(seededRandom() * arr.length)];

    type SmallTier = {
      spawn: number;
      sizeBase: number;
      sizeJitter: number;
      offset: number;
      baseY: number;
      yJitter: number;
      pickPool: (r: number) => readonly (typeof ADS_HOLO_META)[number][];
    };
    const SMALL_TIERS: Record<string, SmallTier> = {
      smallResidential: {
        spawn: 0.18,
        sizeBase: 10,
        sizeJitter: 6,
        offset: 12,
        baseY: 18,
        yJitter: 14,
        pickPool: (r) => (r < 0.45 ? ADS_HOLO_PORTRAIT : ADS_HOLO_SQUARE),
      },
      smallCommercial: {
        spawn: 0.32,
        sizeBase: 12,
        sizeJitter: 7,
        offset: 12,
        baseY: 16,
        yJitter: 14,
        pickPool: (r) => (r < 0.5 ? ADS_HOLO_PORTRAIT : ADS_HOLO_SQUARE),
      },
      smallIndustrial: {
        spawn: 0.12,
        sizeBase: 12,
        sizeJitter: 8,
        offset: 13,
        baseY: 20,
        yJitter: 18,
        pickPool: (r) => (r < 0.4 ? ADS_HOLO_PORTRAIT : ADS_HOLO_SQUARE),
      },
    };
    const classifySmall = (modelKey: string): SmallTier | null => {
      if (modelKey.startsWith("s_01_")) return SMALL_TIERS.smallResidential;
      if (modelKey.startsWith("s_02_")) return SMALL_TIERS.smallCommercial;
      if (modelKey.startsWith("s_03_")) return SMALL_TIERS.smallIndustrial;
      return null;
    };

    for (const b of layout.buildings) {
      const tier = classifySmall(b.modelKey);
      if (!tier) continue;
      if (seededRandom() > tier.spawn) continue;

      const pool = tier.pickPool(seededRandom());
      const meta = pick(pool);
      const baseHeight = tier.sizeBase + seededRandom() * tier.sizeJitter;
      const height = baseHeight * b.scaleY;
      const width = height * meta.aspect;

      const faceIdx = Math.floor(seededRandom() * 4);
      const faceAngle = (faceIdx * Math.PI) / 2;
      const y = (tier.baseY + seededRandom() * tier.yJitter) * b.scaleY;
      const totalAngle = b.rotationY + faceAngle;
      const dx = Math.sin(totalAngle) * tier.offset;
      const dz = Math.cos(totalAngle) * tier.offset;

      ads.push({
        matKey: meta.key,
        aspect: meta.aspect,
        x: b.x + dx,
        y,
        z: b.z + dz,
        width: width / 1.5,
        height: height / 1.5,
        rotationY: totalAngle,
        rotationX: 0,
      });
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
      const shared = game.assets!.getMaterial(ad.matKey) as
        | Material
        | undefined;
      if (shared) shared.name = ad.matKey;

      // If this ad has any material override, clone so we don't mutate the
      // shared material. Otherwise reuse the shared instance.
      const hasOverride =
        ad.emissiveIntensityMul !== undefined ||
        ad.emissiveColor !== undefined ||
        ad.opacity !== undefined;
      let mat: Material | undefined = shared;
      if (shared && hasOverride) {
        const cloned = shared.clone() as Material & {
          emissiveIntensity?: number;
          emissive?: { set: (c: number | string) => void };
        };
        if (
          ad.emissiveIntensityMul !== undefined &&
          typeof cloned.emissiveIntensity === "number"
        ) {
          cloned.emissiveIntensity *= ad.emissiveIntensityMul;
        }
        if (ad.emissiveColor !== undefined && cloned.emissive) {
          cloned.emissive.set(ad.emissiveColor);
        }
        if (ad.opacity !== undefined) {
          cloned.opacity = ad.opacity;
        }
        mat = cloned;
      }

      const mesh = new Mesh(planeGeom, mat ?? new MeshBasicMaterial());
      mesh.position.set(ad.x, ad.y, ad.z);
      // YXZ order so the X tilt happens around the ad's local horizontal
      // axis (after the Y face rotation), giving an intuitive pitch motion.
      mesh.rotation.order = "YXZ";
      mesh.rotation.set(ad.rotationX, ad.rotationY, 0);
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
