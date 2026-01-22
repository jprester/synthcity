import { useEffect, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { AudioSystem } from "./AudioSystem";
import { GameBridge } from "./GameBridge";
import { GeneratorSystem } from "./GeneratorSystem";
import { PlayerSystem } from "./PlayerSystem";
import { PointerLockSystem } from "./PointerLockSystem";
import { useGameStore } from "../../context/GameContext";

/**
 * Frame rate limiter using demand-based rendering with timed invalidation
 * When frameRateLimit > 0, we use frameloop="demand" and manually trigger
 * renders at the target interval
 */
function FrameLimiter() {
  const { settings } = useGameStore();
  const { invalidate } = useThree();
  const rafId = useRef<number>(0);
  const lastTime = useRef<number>(0);

  useEffect(() => {
    if (settings.frameRateLimit === 0) {
      return;
    }

    const frameInterval = 1000 / settings.frameRateLimit;

    const tick = (time: number) => {
      const delta = time - lastTime.current;

      if (delta >= frameInterval) {
        lastTime.current = time - (delta % frameInterval);
        invalidate();
      }

      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);

    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [settings.frameRateLimit, invalidate]);

  return null;
}

function SceneContent() {
  return (
    <>
      <FrameLimiter />
      <GameBridge />
      <GeneratorSystem />
      <PlayerSystem />
      <AudioSystem />
      <PointerLockSystem />
    </>
  );
}

export default function SynthCityScene() {
  const { settings } = useGameStore();

  return (
    <Canvas
      style={{ position: "fixed", inset: 0, zIndex: 0 }}
      frameloop={settings.frameRateLimit > 0 ? "demand" : "always"}
    >
      <SceneContent />
    </Canvas>
  );
}
