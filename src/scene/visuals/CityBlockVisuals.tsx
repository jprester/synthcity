import { useEffect, useRef, useState } from "react";
import { Mesh } from "three";
import type { Object3D, Material } from "three";

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
};

export function CityBlockVisuals({
  item,
  game,
  skipMegaBuildings = false,
}: CityBlockVisualsProps) {
  const [meshes, setMeshes] = useState<Object3D[]>([]);
  const meshesRef = useRef<Object3D[]>([]);

  useEffect(() => {
    if (!item?.visuals || !game?.assets) {
      return;
    }

    // Filter out mega buildings if they're rendered via InstancedMesh
    const visualsToRender = skipMegaBuildings
      ? (item.visuals as VisualDescriptor[]).filter(
          (v) => !v.modelKey?.startsWith("mega_"),
        )
      : (item.visuals as VisualDescriptor[]);

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
  }, [item, game, skipMegaBuildings]);

  return (
    <group>
      {meshes.map((mesh) => (
        <primitive key={mesh.uuid} object={mesh} />
      ))}
    </group>
  );
}
