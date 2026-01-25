import { useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Fog, NoToneMapping, SRGBColorSpace } from "three";
import { Game } from "../../classes/Game.js";
import { useGameStore } from "../../context/GameContext";
import { usePlayerController } from "../../controllers/usePlayerController";
import { EnhancedEffects, getPreset } from "../effects";

export function GameBridge() {
  const { gl, scene, camera, set, size } = useThree();
  const {
    settings,
    gameRef,
    terminalRef,
    launchReady,
    setLaunchReady,
    setShowCrash,
  } = useGameStore();
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

  // Update emissive intensities when visual preset or quality level changes
  // Medium quality reduces bloom intensity by 0.7x, so we compensate by increasing
  // emissive intensity to maintain visual consistency across quality levels
  useEffect(() => {
    const game = gameRef.current;
    if (!game?.assets?.updateEmissiveIntensities) {
      return;
    }
    const preset = getPreset(settings.visualPreset);
    // Compensate for reduced bloom on medium quality (bloom is 0.7x, so emissive ~1.4x)
    const qualityEmissiveMultiplier =
      settings.qualityLevel === "medium" ? 1.4 : 1.0;
    const adjustedEmissive = {
      ads: preset.emissive.ads * qualityEmissiveMultiplier,
      buildings: preset.emissive.buildings * qualityEmissiveMultiplier,
      neons: preset.emissive.neons * qualityEmissiveMultiplier,
      ambient: preset.emissive.ambient * qualityEmissiveMultiplier,
      smoke: preset.emissive.smoke * qualityEmissiveMultiplier,
    };
    game.assets.updateEmissiveIntensities(adjustedEmissive);
  }, [settings.visualPreset, settings.qualityLevel, launchReady, gameRef]);

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
      <EnhancedEffects
        preset={getPreset(settings.visualPreset)}
        isDay={environment?.name === "day"}
        enabled={true}
        qualityLevel={settings.qualityLevel}
      />
    </>
  );
}
