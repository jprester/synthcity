import { useEffect, useMemo, useRef } from "react";
import { Mesh, PlaneGeometry, MeshBasicMaterial, DoubleSide } from "three";
import { useFrame } from "@react-three/fiber";
import { useGameStore } from "../../context/GameContext";
import { generateLayout } from "../../config/cityLayouts";
import { createPerlin } from "../../utils";
import type { FiniteCityLayout } from "../../config/cityLayouts";
import {
  InstancedBuildings,
  type BuildingDescriptor,
} from "../visuals/InstancedBuildings";
import {
  InstancedMegaBuildings,
  type MegaBuildingDescriptor,
} from "../visuals/InstancedMegaBuildings";
import type { GameRuntime } from "../../types/game";

export function FiniteCitySystem() {
  const { gameRef, settings } = useGameStore();
  const { visibility } = settings;
  const initRef = useRef(false);

  const layout = useMemo(
    () => generateLayout(settings.worldSeed),
    [settings.worldSeed],
  );

  // Initialize noise on game (needed for asset system compatibility)
  useFrame(() => {
    const game = gameRef.current;
    if (!game || !game.isRunning || !game.initialized) return;
    if (initRef.current) return;

    if (!game.cityBlockNoise) {
      game.cityBlockNoise = createPerlin(game.settings.worldSeed);
      game.cityBlockNoise.noiseDetail(8, 0.5);
      game.cityBlockNoiseFactor = 0.0017;
    }
    game.generatorsInitialized = true;
    initRef.current = true;
  });

  const buildings: BuildingDescriptor[] = useMemo(
    () =>
      layout.buildings.map((b) => ({
        modelKey: b.modelKey,
        materialKey: b.materialKey,
        position: { x: b.x, y: 0, z: b.z },
        scale: { x: b.scaleX, y: b.scaleY, z: b.scaleZ },
        rotationY: b.rotationY,
        blockKey: "finite",
      })),
    [layout],
  );

  const megaBuildings: MegaBuildingDescriptor[] = useMemo(
    () =>
      layout.megaBuildings.map((b) => ({
        modelKey: b.modelKey,
        position: { x: b.x, y: 0, z: b.z },
        scale: { x: b.scaleX, y: b.scaleY, z: b.scaleZ },
        rotationY: b.rotationY,
        blockKey: "finite",
      })),
    [layout],
  );

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
      {visibility.megaBuildings && (
        <InstancedMegaBuildings
          megaBuildings={megaBuildings}
          game={gameRef.current}
        />
      )}
      <FiniteCityCollision
        layout={layout}
        game={gameRef.current}
      />
      <FiniteCityBoundary
        layout={layout}
        game={gameRef.current}
      />
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
        <primitive key={mesh.uuid} object={mesh} />
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

    // Mega building collision meshes
    for (const b of layout.megaBuildings) {
      const geometry = game.assets!.getModel(b.modelKey);
      if (!geometry) continue;
      const material = game.assets!.getMaterial("mega_building_01");
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
