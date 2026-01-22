import { useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Mesh } from "three";

type UpdateableVisualProps = {
  updateable: any;
  game: any;
};

export function CityBlockUpdateableVisuals({
  updateable,
  game,
}: UpdateableVisualProps) {
  const [mesh, setMesh] = useState<Mesh | null>(null);
  const materialKeyRef = useRef<string | null>(null);
  const { camera } = useThree();

  useEffect(() => {
    if (!updateable?.modelKey || !game?.assets) {
      return;
    }

    const materialKey =
      updateable.kind === "advert"
        ? updateable.currentMatKey
        : updateable.matKey;
    const material = materialKey
      ? game.assets.getMaterial(materialKey)
      : null;
    const object = new Mesh(
      game.assets.getModel(updateable.modelKey),
      material || undefined,
    );

    if (updateable.position) {
      object.position.set(
        updateable.position.x,
        updateable.position.y,
        updateable.position.z,
      );
    }
    if (updateable.scale) {
      object.scale.set(updateable.scale.x, updateable.scale.y, updateable.scale.z);
    }
    if (typeof updateable.rotationY === "number") {
      object.rotation.y = updateable.rotationY;
    }

    materialKeyRef.current = materialKey || null;
    setMesh(object);
  }, [updateable, game]);

  useFrame(() => {
    if (!mesh || !updateable) {
      return;
    }

    if (updateable.position) {
      mesh.position.set(
        updateable.position.x,
        updateable.position.y,
        updateable.position.z,
      );
    }
    if (updateable.scale) {
      mesh.scale.set(updateable.scale.x, updateable.scale.y, updateable.scale.z);
    }

    if (updateable.kind === "topper") {
      mesh.rotation.y = updateable.rotationY ?? mesh.rotation.y;
    } else if (typeof updateable.rotationY === "number") {
      mesh.rotation.y = updateable.rotationY;
    }

    if (updateable.kind === "advert") {
      const desiredKey = updateable.currentMatKey;
      if (desiredKey && desiredKey !== materialKeyRef.current) {
        mesh.material = game.assets.getMaterial(desiredKey);
        materialKeyRef.current = desiredKey;
      }
    }

    if (updateable.kind === "smoke") {
      mesh.lookAt(camera.position);
      mesh.rotation.x += Math.cos(updateable.rstep || 0) * 0.25;
    }

    if (updateable.kind === "spotlight") {
      mesh.lookAt(camera.position);
      mesh.rotation.x += Math.cos(updateable.rstep || 0) * 0.4;
    }
  }, 1);

  return mesh ? <primitive object={mesh} /> : null;
}
