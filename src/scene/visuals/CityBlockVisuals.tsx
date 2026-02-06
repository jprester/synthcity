import { useEffect, useRef, useState } from "react";
import { Mesh } from "three";
import type { VisibilitySettings } from "../../types/settings";
import type {
  CityBlockItemState,
  CityBlockVisualDescriptor,
  GameRuntime,
} from "../../types/game";

type CityBlockVisualsProps = {
  item: CityBlockItemState;
  game: GameRuntime | null;
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
  const [meshes, setMeshes] = useState<Mesh[]>([]);
  const meshesRef = useRef<Mesh[]>([]);

  useEffect(() => {
    if (!item?.visuals || !game?.assets) {
      return;
    }

    // Filter visuals based on skip flags and visibility settings
    const visualsToRender = (item.visuals as CityBlockVisualDescriptor[]).filter((v) => {
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
      const material =
        visual.material ??
        (visual.materialKey
          ? game.assets.getMaterial(visual.materialKey)
          : undefined);
      const mesh = new Mesh(game.assets.getModel(visual.modelKey), material);
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
