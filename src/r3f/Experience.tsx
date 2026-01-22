import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  EffectComposer,
  Bloom,
  FXAA,
  ToneMapping,
} from "@react-three/postprocessing";
import { ToneMappingMode } from "postprocessing";
import {
  Fog,
  NoToneMapping,
  SRGBColorSpace,
  PointLight,
  Audio,
  AudioListener,
  AudioLoader,
} from "three";
import { useEffect, useState, useRef } from "react";
import { Game } from '../index.js';
import { useGameStore } from '../game/GameContext';
import { GeneratorItem_CityBlock } from '../classes/GeneratorItem_CityBlock.js';
import { GeneratorItem_CityLight } from '../classes/GeneratorItem_CityLight.js';
import { GeneratorItem_Traffic } from '../classes/GeneratorItem_Traffic.js';
import { Radio } from '../classes/Radio.js';
import { usePlayerController } from './usePlayerController';
import { PlayerCarVisuals } from "./PlayerCarVisuals";
import { TrafficCarVisuals } from "./TrafficCarVisuals";
import { CityBlockVisuals } from "./CityBlockVisuals";

declare const Perlin: new (seed?: number) => {
  noiseDetail: (lod: number, falloff: number) => void;
};

type GridState<T> = {
  gridX: number;
  gridZ: number;
  items: Map<string, T>;
};

type WithGenId<T> = T & { __genId?: string };

 

function GameBridge() {
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

function GeneratorSystem() {
  const { gameRef } = useGameStore();
  const [cityBlockItems, setCityBlockItems] = useState<
    WithGenId<GeneratorItem_CityBlock>[]
  >([]);
  const [trafficItems, setTrafficItems] = useState<
    WithGenId<GeneratorItem_Traffic>[]
  >([]);
  const [cityLights, setCityLights] = useState<PointLight[]>([]);
  const cityBlockVersionRef = useRef<number>(0);
  const trafficVersionRef = useRef<number>(0);
  const trafficStateRef = useRef<GridState<WithGenId<GeneratorItem_Traffic>>>({
    gridX: 0,
    gridZ: 0,
    items: new Map(),
  });
  const cityLightStateRef = useRef<
    GridState<WithGenId<GeneratorItem_CityLight>>
  >({
    gridX: 0,
    gridZ: 0,
    items: new Map(),
  });
  const cityBlockStateRef = useRef<
    GridState<WithGenId<GeneratorItem_CityBlock>>
  >({
    gridX: 0,
    gridZ: 0,
    items: new Map(),
  });

  useFrame(() => {
    const game = gameRef.current;
    if (!game || !game.isRunning) {
      return;
    }
    if (!game.initialized) {
      return;
    }

    if (!game.generatorsInitialized) {
      initializeGenerators(game);
    }

    if (!game.generatorsInitialized) {
      return;
    }

    updateCityBlocks(game);
    updateTraffic(game);
    updateCityLights(game);
  }, 2);

  function initializeGenerators(game) {
    game.cityBlockNoise = new Perlin(game.settings.worldSeed);
    game.cityBlockNoise.noiseDetail(8, 0.5);
    game.cityBlockNoiseFactor = 0.0017;

    game.cityLights = [];
    game.cityLightMeshes = [];
    if (game.environment.cityLights) {
      for (let i = 0; i < 10; i++) {
        const light = new PointLight(0x000000, 100, 2000);
        light.decay = 1;
        game.cityLights.push({ light, free: true });
        game.cityLightMeshes.push(light);
      }
    }
    game.generatorsInitialized = true;

    setCityLights([...game.cityLightMeshes]);
  }

  function updateCityBlocks(game) {
    const cellSize = game.cityBlockSize + game.roadWidth;
    const cellCount = 40;
    const rad = Math.ceil(cellCount / 2);
    const camera = game.player.camera;
    const gridX = Math.floor(camera.position.x / cellSize);
    const gridZ = Math.floor(camera.position.z / cellSize);
    const state = cityBlockStateRef.current;

    if (
      state.gridX !== gridX ||
      state.gridZ !== gridZ ||
      state.items.size === 0
    ) {
      state.gridX = gridX;
      state.gridZ = gridZ;

      const nextKeys = new Set();
      const half = Math.floor((cellCount * cellSize) / 2);
      for (let i = 0; i < cellCount; i++) {
        for (let j = 0; j < cellCount; j++) {
          const dx = j - rad;
          const dz = i - rad;
          if (Math.sqrt(dx * dx + dz * dz) > rad) {
            continue;
          }
          const worldX = gridX * cellSize + j * cellSize - half;
          const worldZ = gridZ * cellSize + i * cellSize - half;
          const key = `${worldX}:${worldZ}`;
          nextKeys.add(key);
          if (!state.items.has(key)) {
            const item = new GeneratorItem_CityBlock(
              worldX,
              worldZ,
              game,
            ) as WithGenId<GeneratorItem_CityBlock>;
            item.__genId = `${key}`;
            state.items.set(key, item);
          }
        }
      }

      for (const [key, item] of state.items.entries()) {
        if (!nextKeys.has(key)) {
          if (typeof item.remove === "function") {
            item.remove();
          }
          state.items.delete(key);
        }
      }

      cityBlockVersionRef.current += 1;
      setCityBlockItems(Array.from(state.items.values()));
    }

    for (const item of state.items.values()) {
      if (typeof item.update === "function") {
        item.update();
      }
    }
  }

  function updateTraffic(game) {
    const cellSize = game.cityBlockSize + game.roadWidth;
    const cellCount = 12;
    const rad = Math.ceil(cellCount / 2);
    const camera = game.player.camera;
    const gridX = Math.floor(camera.position.x / cellSize);
    const gridZ = Math.floor(camera.position.z / cellSize);
    const state = trafficStateRef.current;

    if (
      state.gridX !== gridX ||
      state.gridZ !== gridZ ||
      state.items.size === 0
    ) {
      state.gridX = gridX;
      state.gridZ = gridZ;

      const nextKeys = new Set();
      const half = Math.floor((cellCount * cellSize) / 2);
      for (let i = 0; i < cellCount; i++) {
        for (let j = 0; j < cellCount; j++) {
          const dx = j - rad;
          const dz = i - rad;
          if (Math.sqrt(dx * dx + dz * dz) > rad) {
            continue;
          }
          const worldX = gridX * cellSize + j * cellSize - half;
          const worldZ = gridZ * cellSize + i * cellSize - half;
          const key = `${worldX}:${worldZ}`;
          nextKeys.add(key);
          if (!state.items.has(key)) {
            const item = new GeneratorItem_Traffic(
              worldX,
              worldZ,
              game,
            ) as WithGenId<GeneratorItem_Traffic>;
            item.__genId = `${key}`;
            state.items.set(key, item);
          }
        }
      }

      for (const [key, item] of state.items.entries()) {
        if (!nextKeys.has(key)) {
          if (typeof item.remove === "function") {
            item.remove();
          }
          state.items.delete(key);
        }
      }

      trafficVersionRef.current += 1;
      setTrafficItems(Array.from(state.items.values()));
    }

    for (const item of state.items.values()) {
      if (typeof item.update === "function") {
        item.update();
      }
    }
  }

  function updateCityLights(game) {
    const cellSize = (game.cityBlockSize + game.roadWidth) * 4;
    const cellCount = 8;
    const rad = Math.ceil(cellCount / 2);
    const camera = game.player.camera;
    const gridX = Math.floor(camera.position.x / cellSize);
    const gridZ = Math.floor(camera.position.z / cellSize);
    const state = cityLightStateRef.current;

    if (
      state.gridX !== gridX ||
      state.gridZ !== gridZ ||
      state.items.size === 0
    ) {
      state.gridX = gridX;
      state.gridZ = gridZ;

      const nextKeys = new Set();
      const half = Math.floor((cellCount * cellSize) / 2);
      for (let i = 0; i < cellCount; i++) {
        for (let j = 0; j < cellCount; j++) {
          const dx = j - rad;
          const dz = i - rad;
          if (Math.sqrt(dx * dx + dz * dz) > rad) {
            continue;
          }
          const worldX = gridX * cellSize + j * cellSize - half;
          const worldZ = gridZ * cellSize + i * cellSize - half;
          const key = `${worldX}:${worldZ}`;
          nextKeys.add(key);
          if (!state.items.has(key)) {
            const item = new GeneratorItem_CityLight(
              worldX,
              worldZ,
              game,
            ) as WithGenId<GeneratorItem_CityLight>;
            item.__genId = `${key}`;
            state.items.set(key, item);
          }
        }
      }

      for (const [key, item] of state.items.entries()) {
        if (!nextKeys.has(key)) {
          if (typeof item.remove === "function") {
            item.remove();
          }
          state.items.delete(key);
        }
      }
    }

    for (const item of state.items.values()) {
      if (typeof item.update === "function") {
        item.update();
      }
    }
  }

  return (
    <>
      <group>
        {cityBlockItems.map((item) => (
          <group key={item.__genId}>
            <CityBlockVisuals item={item} game={gameRef.current} />
            {(item.updateables || [])
              .filter((updateable) => updateable?.isVisual && updateable.mesh)
              .map((updateable) => (
                <primitive
                  key={`u-${updateable.mesh.uuid}`}
                  object={updateable.mesh}
                />
              ))}
          </group>
        ))}
      </group>
      <group>
        {trafficItems.map((item) => (
          <group key={item.__genId}>
            {(item.cars || []).map((car, index) => (
              <TrafficCarVisuals
                key={`t-${index}`}
                car={car}
                game={gameRef.current}
              />
            ))}
          </group>
        ))}
      </group>
      <group>
        {cityLights.map((light) => (
          <primitive key={light.uuid} object={light} />
        ))}
      </group>
    </>
  );
}

function PlayerSystem() {
  const { gameRef, settings } = useGameStore();
  const playerRef = useRef<any>(null);
  const [player, setPlayer] = useState<any>(null);

  useFrame((state, delta) => {
    const game = gameRef.current;
    if (!game || !game.isRunning) {
      return;
    }

    if (game.player && game.player !== playerRef.current) {
      playerRef.current = game.player;
      setPlayer(game.player);
    }

    game.updatePlayer(delta);

    if (!game.collider.enabled) {
      game.collider.enabled = true;
    }
  }, 1);

  const game = gameRef.current;
  const shouldRenderCar = Boolean(player?.carPose && game?.assets);

  return shouldRenderCar ? (
    <PlayerCarVisuals
      player={player}
      game={game}
      windshieldShader={settings.windshieldShader}
    />
  ) : null;
}

function AudioSystem() {
  const { gameRef } = useGameStore();
  const initializedRef = useRef(false);

  useFrame((state, delta) => {
    const game = gameRef.current;
    if (!game || !game.isRunning) {
      return;
    }

    if (!initializedRef.current && game.initialized) {
      initializeAudio(game);
      initializedRef.current = true;
    }

    if (game.canvasOpacity < 1 && game.canvas) {
      game.canvasOpacity += delta * 0.15;
      game.canvas.style.opacity = game.canvasOpacity;
      game.masterVolume += delta * 0.15;
    }

    if (game.playerController.key_plus) {
      game.userMasterVolume = Math.min(game.userMasterVolume + 0.02, 1);
    }
    if (game.playerController.key_minus) {
      game.userMasterVolume = Math.max(game.userMasterVolume - 0.02, 0);
    }

    if (game.audioListener) {
      game.audioListener.setMasterVolume(
        game.masterVolume * game.userMasterVolume,
      );
    }

    if (game.radio) {
      game.radio.update();
    }
  }, 1);

  return null;
}

function initializeAudio(game) {
  if (game.audioListener) {
    return;
  }

  const audioListener = new AudioListener();
  game.audioListener = audioListener;
  game.player.camera.add(audioListener);

  const audioLoader = new AudioLoader();
  game.audioLoader = audioLoader;

  if (game.settings.music == 1) {
    game.radio = new Radio({
      audioListener: audioListener,
      controller: game.playerController,
    });
  }

  if (game.settings.soundFx == 1) {
    const soundTrafficAmbient = new Audio(audioListener);
    audioLoader.load("assets/sounds/traffic_ambient.wav", function (buffer) {
      soundTrafficAmbient.setBuffer(buffer);
      soundTrafficAmbient.setLoop(true);
      soundTrafficAmbient.setVolume(1);
      soundTrafficAmbient.play();
    });

    if (game.settings.mode == "drive") {
      const soundCarAmbient = new Audio(audioListener);
      audioLoader.load("assets/sounds/car_ambient.wav", function (buffer) {
        soundCarAmbient.setBuffer(buffer);
        soundCarAmbient.setLoop(true);
        soundCarAmbient.setVolume(1);
        soundCarAmbient.play();
      });
      const soundCarWind = new Audio(audioListener);
      audioLoader.load("assets/sounds/car_wind.wav", function (buffer) {
        soundCarWind.setBuffer(buffer);
        soundCarWind.setLoop(true);
        soundCarWind.setVolume(0);
        soundCarWind.play();
        game.player.soundWind = soundCarWind;
      });
      const soundCarStress = new Audio(audioListener);
      audioLoader.load("assets/sounds/car_stress.wav", function (buffer) {
        soundCarStress.setBuffer(buffer);
        soundCarStress.setLoop(true);
        soundCarStress.setVolume(0);
        soundCarStress.play();
        game.player.soundStress = soundCarStress;
      });
      const soundCarChimeUp = new Audio(audioListener);
      audioLoader.load("assets/sounds/chime_up.wav", function (buffer) {
        soundCarChimeUp.setBuffer(buffer);
        soundCarChimeUp.setLoop(false);
        soundCarChimeUp.setVolume(1);
        game.player.soundChimeUp = soundCarChimeUp;
      });
      const soundCarChimeDown = new Audio(audioListener);
      audioLoader.load("assets/sounds/chime_down.wav", function (buffer) {
        soundCarChimeDown.setBuffer(buffer);
        soundCarChimeDown.setLoop(false);
        soundCarChimeDown.setVolume(1);
        game.player.soundChimeDown = soundCarChimeDown;
      });
      const soundCarCrash = new Audio(audioListener);
      audioLoader.load("assets/sounds/crash.wav", function (buffer) {
        soundCarCrash.setBuffer(buffer);
        soundCarCrash.setLoop(false);
        soundCarCrash.setVolume(1);
        game.player.soundCrash = soundCarCrash;
      });
    } else {
      const soundCityAmbient = new Audio(audioListener);
      audioLoader.load("assets/sounds/city_ambient.wav", function (buffer) {
        soundCityAmbient.setBuffer(buffer);
        soundCityAmbient.setLoop(true);
        soundCityAmbient.setVolume(0);
        soundCityAmbient.play();
        game.player.soundCityAmbient = soundCityAmbient;
      });
      const soundWind = new Audio(audioListener);
      audioLoader.load("assets/sounds/car_wind.wav", function (buffer) {
        soundWind.setBuffer(buffer);
        soundWind.setLoop(true);
        soundWind.setVolume(0);
        soundWind.play();
        game.player.soundWind = soundWind;
      });
    }
  }
}

function PointerLockSystem() {
  const { gameRef, setShowBlocker } = useGameStore();

  useEffect(() => {
    function handlePointerLockChange() {
      const game = gameRef.current;
      if (!game || !game.playerController) {
        return;
      }

      const target = game.pointerLockElement || game.canvas || document.body;
      if (document.pointerLockElement === target) {
        game.playerController.enabled = true;
        setShowBlocker(false);
      } else {
        game.playerController.enabled = false;
        if (game.uiOnUnfocus) {
          setShowBlocker(true);
        }
      }
    }

    document.addEventListener("pointerlockchange", handlePointerLockChange);
    return () => {
      document.removeEventListener(
        "pointerlockchange",
        handlePointerLockChange,
      );
    };
  }, [gameRef, setShowBlocker]);

  return null;
}

export default function R3FExperience() {
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
