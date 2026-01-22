import { useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, PointLight } from "three";
import type { Object3D } from "three";

type PlayerVisuals = {
  car: Object3D | null;
  windows: Object3D | null;
  light: PointLight | null;
};

type PlayerCarVisualsProps = {
  player: any;
  game: any;
  windshieldShader: string;
};

export function PlayerCarVisuals({
  player,
  game,
  windshieldShader,
}: PlayerCarVisualsProps) {
  const [objects, setObjects] = useState<PlayerVisuals>({
    car: null,
    windows: null,
    light: null,
  });

  useEffect(() => {
    if (!game || !game.assets || !player) {
      return;
    }

    const carPrimitive = new Mesh(game.assets.getModel("spinner"), [
      game.assets.getMaterial("spinner_interior"),
      game.assets.getMaterial("spinner_exterior"),
    ]);
    const windowsMaterial =
      windshieldShader == "advanced"
        ? game.assets.getMaterial("spinner_windows_advanced")
        : game.assets.getMaterial("spinner_windows_simple");
    const windowsObject = new Mesh(
      game.assets.getModel("spinner_windows"),
      windowsMaterial,
    );
    const lightObject = new PointLight(0x00d2ed, 0.25, 3);
    lightObject.decay = 1;

    setObjects({
      car: carPrimitive,
      windows: windowsObject,
      light: lightObject,
    });
  }, [game, player, windshieldShader]);

  useFrame(() => {
    if (!player || !player.carPose) {
      return;
    }
    const pose = player.carPose;
    if (objects.car) {
      objects.car.position.copy(pose.position);
      objects.car.rotation.copy(pose.rotation);
    }
    if (objects.windows) {
      objects.windows.position.copy(pose.position);
      objects.windows.rotation.copy(pose.rotation);
    }
    if (objects.light) {
      objects.light.position.copy(pose.position);
    }
  }, 1);

  return (
    <group>
      {objects.car ? <primitive object={objects.car} /> : null}
      {objects.windows ? <primitive object={objects.windows} /> : null}
      {objects.light ? <primitive object={objects.light} /> : null}
    </group>
  );
}
