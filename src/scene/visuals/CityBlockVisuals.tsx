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
};

export function CityBlockVisuals({ item, game }: CityBlockVisualsProps) {
  const [meshes, setMeshes] = useState<Object3D[]>([]);
  const meshesRef = useRef<Object3D[]>([]);

  useEffect(() => {
    if (!item?.visuals || !game?.assets) {
      return;
    }

    const nextMeshes = (item.visuals as VisualDescriptor[]).map((visual) => {
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
  }, [item, game]);

  return (
    <group>
      {meshes.map((mesh) => (
        <primitive key={mesh.uuid} object={mesh} />
      ))}
    </group>
  );
}
