import { Canvas } from "@react-three/fiber";
import { AudioSystem } from "./AudioSystem";
import { GameBridge } from "./GameBridge";
import { GeneratorSystem } from "./GeneratorSystem";
import { PlayerSystem } from "./PlayerSystem";
import { PointerLockSystem } from "./PointerLockSystem";

export default function SynthCityScene() {
  return (
    <Canvas style={{ position: "fixed", inset: 0, zIndex: 0 }}>
      <GameBridge />
      <GeneratorSystem />
      <PlayerSystem />
      <AudioSystem />
      <PointerLockSystem />
    </Canvas>
  );
}
