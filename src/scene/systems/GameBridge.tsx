import { useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom, FXAA, ToneMapping } from "@react-three/postprocessing";
import { ToneMappingMode } from "postprocessing";
import { Fog, NoToneMapping, SRGBColorSpace } from "three";
import { Game } from "../../index.js";
import { useGameStore } from "../../context/GameContext";
import { usePlayerController } from "../../controllers/usePlayerController";

export function GameBridge() {
  const { gl, scene, camera, set, size } = useThree();
  const { settings, gameRef, terminalRef, setLaunchReady, setShowCrash } =
    useGameStore();
  const controller = usePlayerController();
  const [environment, setEnvironment] = useState<any | null>(null);

  useEffect(() => {
    if (gameRef.current) {
      return;
    }

    const game = new Game({
      camera,
      canvas: gl.domElement,
      settings,
      terminal: terminalRef.current,
      controller,
      onAssetsLoaded: () => setLaunchReady(true),
      onCrashChange: (value) => setShowCrash(Boolean(value)),
    });
    gameRef.current = game;
    setEnvironment(game.environment);

    gl.toneMapping = NoToneMapping;
    gl.toneMappingExposure = 1.0;
    gl.outputColorSpace = SRGBColorSpace;
  }, [gl, scene, camera, settings, gameRef, terminalRef]);

  useEffect(() => {
    if (gameRef.current) {
      gameRef.current.setSettings(settings);
    }
  }, [settings, gameRef]);

  useEffect(() => {
    const game = gameRef.current;
    if (!game || !game.player?.camera) {
      return;
    }
    game.player.camera.aspect = size.width / size.height;
    game.player.camera.updateProjectionMatrix();
  }, [size, gameRef]);

  useEffect(() => {
    if (!environment || !gameRef.current) {
      return;
    }

    const game = gameRef.current;
    scene.fog = new Fog(
      environment.fog.color,
      environment.fog.start,
      environment.fog.end,
    );

    const intervalId = setInterval(() => {
      if (game.assets) {
        scene.background = game.assets.getTexture(environment.sky);
        clearInterval(intervalId);
      }
    }, 100);

    return () => {
      clearInterval(intervalId);
    };
  }, [environment, scene]);

  useFrame(() => {
    const game = gameRef.current;
    if (!game || !game.isRunning) {
      return;
    }

    if (game.player?.camera && camera !== game.player.camera) {
      set({ camera: game.player.camera });
    }
  }, 1);

  return (
    <>
      {environment && (
        <>
          <ambientLight
            intensity={environment.ambient.intensity}
            color={environment.ambient.color}
          />
          <directionalLight
            castShadow={false}
            intensity={environment.sun.intensity}
            color={environment.sun.color}
            position={[environment.sun.x, environment.sun.y, environment.sun.z]}
          />
        </>
      )}
      <EffectComposer>
        <FXAA />
        <Bloom
          intensity={environment?.name === "day" ? 0.35 : 7.0}
          luminanceThreshold={0.0}
          luminanceSmoothing={0.0}
        />
        <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
      </EffectComposer>
    </>
  );
}
