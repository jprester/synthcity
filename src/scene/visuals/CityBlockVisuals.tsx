import { useEffect, useRef, useState } from "react";
import { Mesh } from "three";
import type { Object3D, Material } from "three";
import type { VisibilitySettings } from "../../context/GameContext";

type VisualDescriptor = {
  modelKey: string;
  material: Material;
  position: { x: number; y: number; z: number };
  scale?: { x: number; y: number; z: number };
  rotationX?: number;
  rotationY?: number;
  rotationZ?: number;
};

type CityBlockVisualsProps = {
  item: any;
  game: any;
  skipMegaBuildings?: boolean;
  skipBuildings?: boolean;
  visibility: VisibilitySettings;
};

/**
 * Determine if a visual should be shown based on its modelKey and visibility settings
 */
function isVisualVisible(modelKey: string, visibility: VisibilitySettings): boolean {
  if (modelKey === "ground") return visibility.ground;
  if (modelKey === "storefronts") return visibility.storefronts;
  if (modelKey.startsWith("mega_")) return visibility.megaBuildings;
  // Regular buildings (s_XX_XX pattern or building_XX)
  return visibility.buildings;
}

export function CityBlockVisuals({
  item,
  game,
  skipMegaBuildings = false,
  skipBuildings = false,
  visibility,
}: CityBlockVisualsProps) {
  const [meshes, setMeshes] = useState<Object3D[]>([]);
  const meshesRef = useRef<Object3D[]>([]);

  useEffect(() => {
    if (!item?.visuals || !game?.assets) {
      return;
    }

    // Filter visuals based on skip flags and visibility settings
    const visualsToRender = (item.visuals as VisualDescriptor[]).filter((v) => {
      // Skip mega buildings if they're rendered via InstancedMesh
      if (skipMegaBuildings && v.modelKey?.startsWith("mega_")) {
        return false;
      }
      // Skip standard buildings (s_XX_XX) if they're rendered via InstancedMesh
      if (skipBuildings && v.modelKey?.startsWith("s_")) {
        return false;
      }
      // Apply visibility settings
      return isVisualVisible(v.modelKey, visibility);
    });

    const nextMeshes = visualsToRender.map((visual) => {
      const mesh = new Mesh(game.assets.getModel(visual.modelKey), visual.material);
      mesh.position.set(visual.position.x, visual.position.y, visual.position.z);
      if (visual.scale) {
        mesh.scale.set(visual.scale.x, visual.scale.y, visual.scale.z);
      }
      if (typeof visual.rotationX === "number") {
        mesh.rotation.x = visual.rotationX;
      }
      if (typeof visual.rotationY === "number") {
        mesh.rotation.y = visual.rotationY;
      }
      if (typeof visual.rotationZ === "number") {
        mesh.rotation.z = visual.rotationZ;
      }
      return mesh;
    });

    meshesRef.current = nextMeshes;
    setMeshes(nextMeshes);

    // Cleanup: Clear mesh references to allow garbage collection
    // Note: We don't dispose geometry/material as they're shared via AssetManager
    return () => {
      meshesRef.current = [];
    };
  }, [item, game, skipMegaBuildings, skipBuildings, visibility]);

  return (
    <group>
      {meshes.map((mesh) => (
        <primitive key={mesh.uuid} object={mesh} />
      ))}
    </group>
  );
}
