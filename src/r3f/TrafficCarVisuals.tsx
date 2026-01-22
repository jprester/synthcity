import { useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import type { Object3D } from "three";

type TrafficCarVisualsProps = {
  car: any;
  game: any;
};

export function TrafficCarVisuals({ car, game }: TrafficCarVisualsProps) {
  const [mesh, setMesh] = useState<Object3D | null>(null);

  useEffect(() => {
    if (!car || !game?.assets) {
      return;
    }
    const carMesh = new Mesh(
      game.assets.getModel(car.modelKey),
      game.assets.getMaterial("cars"),
    );
    setMesh(carMesh);
  }, [car, game]);

  useFrame(() => {
    if (!car?.pose || !mesh) {
      return;
    }
    mesh.position.copy(car.pose.position);
    mesh.rotation.copy(car.pose.rotation);
  }, 1);

  return mesh ? <primitive object={mesh} /> : null;
}
