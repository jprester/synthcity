import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom, FXAA, ToneMapping } from '@react-three/postprocessing';
import { ToneMappingMode } from 'postprocessing';
import { Fog, NoToneMapping, SRGBColorSpace, PointLight } from 'three';
import { useEffect, useState, useRef } from 'react';
import { Game } from '../index.js';
import { useGameStore } from '../game/GameContext.jsx';
import { GeneratorItem_CityBlock } from '../classes/GeneratorItem_CityBlock.js';
import { GeneratorItem_CityLight } from '../classes/GeneratorItem_CityLight.js';
import { GeneratorItem_Traffic } from '../classes/GeneratorItem_Traffic.js';

function GameBridge() {
  const { gl, scene, camera, set } = useThree();
  const { settings, gameRef, terminalRef } = useGameStore();
  const [environment, setEnvironment] = useState(null);

  useEffect(() => {
    if (gameRef.current) {
      return;
    }

    const game = new Game({
      renderer: gl,
      scene,
      camera,
      canvas: gl.domElement,
      setupEnvironment: false,
      settings,
      terminal: terminalRef.current
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
    if (!environment || !gameRef.current) {
      return;
    }

    const game = gameRef.current;
    scene.fog = new Fog(environment.fog.color, environment.fog.start, environment.fog.end);

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
          <ambientLight intensity={environment.ambient.intensity} color={environment.ambient.color} />
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
          intensity={environment?.name === 'day' ? 0.35 : 7.0}
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
  const [cityBlockItems, setCityBlockItems] = useState([]);
  const [trafficItems, setTrafficItems] = useState([]);
  const [cityLights, setCityLights] = useState([]);
  const cityBlockVersionRef = useRef(0);
  const trafficVersionRef = useRef(0);
  const trafficStateRef = useRef({
    gridX: 0,
    gridZ: 0,
    items: new Map()
  });
  const cityLightStateRef = useRef({
    gridX: 0,
    gridZ: 0,
    items: new Map()
  });
  const cityBlockStateRef = useRef({
    gridX: 0,
    gridZ: 0,
    items: new Map()
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

    if (state.gridX !== gridX || state.gridZ !== gridZ || state.items.size === 0) {
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
            const item = new GeneratorItem_CityBlock(worldX, worldZ, game);
            item.__genId = `${key}`;
            state.items.set(key, item);
          }
        }
      }

      for (const [key, item] of state.items.entries()) {
        if (!nextKeys.has(key)) {
          if (typeof item.remove === 'function') {
            item.remove();
          }
          state.items.delete(key);
        }
      }

      cityBlockVersionRef.current += 1;
      setCityBlockItems(Array.from(state.items.values()));
    }

    for (const item of state.items.values()) {
      if (typeof item.update === 'function') {
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

    if (state.gridX !== gridX || state.gridZ !== gridZ || state.items.size === 0) {
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
            const item = new GeneratorItem_Traffic(worldX, worldZ, game);
            item.__genId = `${key}`;
            state.items.set(key, item);
          }
        }
      }

      for (const [key, item] of state.items.entries()) {
        if (!nextKeys.has(key)) {
          if (typeof item.remove === 'function') {
            item.remove();
          }
          state.items.delete(key);
        }
      }

      trafficVersionRef.current += 1;
      setTrafficItems(Array.from(state.items.values()));
    }

    for (const item of state.items.values()) {
      if (typeof item.update === 'function') {
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

    if (state.gridX !== gridX || state.gridZ !== gridZ || state.items.size === 0) {
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
            const item = new GeneratorItem_CityLight(worldX, worldZ, game);
            item.__genId = `${key}`;
            state.items.set(key, item);
          }
        }
      }

      for (const [key, item] of state.items.entries()) {
        if (!nextKeys.has(key)) {
          if (typeof item.remove === 'function') {
            item.remove();
          }
          state.items.delete(key);
        }
      }
    }

    for (const item of state.items.values()) {
      if (typeof item.update === 'function') {
        item.update();
      }
    }
  }

  return (
    <>
      <group>
        {cityBlockItems.map((item) => (
          <group key={item.__genId}>
            {(item.meshes || []).map((mesh, index) => (
              <primitive key={`m-${index}`} object={mesh} />
            ))}
            {(item.meshesCollid || []).map((mesh, index) => (
              <primitive key={`c-${index}`} object={mesh} />
            ))}
            {(item.updateables || [])
              .filter((updateable) => updateable?.isVisual && updateable.mesh)
              .map((updateable) => (
                <primitive key={`u-${updateable.mesh.uuid}`} object={updateable.mesh} />
              ))}
          </group>
        ))}
      </group>
      <group>
        {trafficItems.map((item) => (
          <group key={item.__genId}>
            {(item.cars || []).map((car, index) =>
              car.mesh ? <primitive key={`t-${index}`} object={car.mesh} /> : null
            )}
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
  const { gameRef } = useGameStore();

  useFrame((state, delta) => {
    const game = gameRef.current;
    if (!game || !game.isRunning) {
      return;
    }

    game.updatePlayer(delta);

    if (!game.collider.enabled) {
      game.collider.enabled = true;
    }
  }, 1);

  return null;
}

export default function R3FExperience() {
  return (
    <Canvas style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
      <GameBridge />
      <GeneratorSystem />
      <PlayerSystem />
    </Canvas>
  );
}
