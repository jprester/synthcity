import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { startGame } from '../index.js';

function GameBridge() {
  const { gl, scene, camera, set } = useThree();
  const gameRef = useRef(null);

  useEffect(() => {
    const game = startGame({
      renderer: gl,
      scene,
      camera,
      canvas: gl.domElement,
      manageRendererSize: false
    });
    gameRef.current = game;
  }, [gl, scene, camera]);

  useFrame((state, delta) => {
    const game = gameRef.current;
    if (!game || !game.isRunning) {
      return;
    }

    game.update(delta);

    if (game.player?.camera && state.camera !== game.player.camera) {
      set({ camera: game.player.camera });
    }
  }, 1);

  return null;
}

export default function R3FExperience() {
  return (
    <Canvas style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
      <GameBridge />
    </Canvas>
  );
}
