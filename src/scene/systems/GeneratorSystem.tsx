import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import type { PointLight } from "three";
import { useGameStore } from "../../context/GameContext";
import { GeneratorItem_CityBlock } from "../../classes/GeneratorItem_CityBlock.js";
import { GeneratorItem_CityLight } from "../../classes/GeneratorItem_CityLight.js";
import { GeneratorItem_Traffic } from "../../classes/GeneratorItem_Traffic.js";
import { CityBlockVisuals } from "../visuals/CityBlockVisuals";
import { CityBlockUpdateableVisuals } from "../visuals/CityBlockUpdateableVisuals";
import { TrafficCarVisuals } from "../visuals/TrafficCarVisuals";

declare const Perlin: new (seed?: number) => {
  noiseDetail: (lod: number, falloff: number) => void;
};

type GridState<T> = {
  gridX: number;
  gridZ: number;
  items: Map<string, T>;
};

type WithGenId<T> = T & { __genId?: string };

type CityLightDescriptor = {
  free: boolean;
  position: { x: number; y: number; z: number };
  color: { h: number; s: number; l: number };
};

export function GeneratorSystem() {
  const { gameRef } = useGameStore();
  const [cityBlockItems, setCityBlockItems] = useState<
    WithGenId<GeneratorItem_CityBlock>[]
  >([]);
  const [trafficItems, setTrafficItems] = useState<
    WithGenId<GeneratorItem_Traffic>[]
  >([]);
  const [cityLights, setCityLights] = useState<CityLightDescriptor[]>([]);
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

  function initializeGenerators(game: any) {
    game.cityBlockNoise = new Perlin(game.settings.worldSeed);
    game.cityBlockNoise.noiseDetail(8, 0.5);
    game.cityBlockNoiseFactor = 0.0017;

    game.cityLights = [];
    if (game.environment.cityLights) {
      for (let i = 0; i < 10; i++) {
        game.cityLights.push({
          free: true,
          position: { x: 0, y: 0, z: 0 },
          color: { h: 0, s: 1, l: 0.5 },
        });
      }
    }
    game.generatorsInitialized = true;

    setCityLights([...game.cityLights]);
  }

  function updateCityBlocks(game: any) {
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

      setCityBlockItems(Array.from(state.items.values()));
    }

    for (const item of state.items.values()) {
      if (typeof item.update === "function") {
        item.update();
      }
    }
  }

  function updateTraffic(game: any) {
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

      setTrafficItems(Array.from(state.items.values()));
    }

    for (const item of state.items.values()) {
      if (typeof item.update === "function") {
        item.update();
      }
    }
  }

  function updateCityLights(game: any) {
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

      setCityLights([...game.cityLights]);
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
              .filter((updateable) => updateable?.isVisual)
              .map((updateable, index) => (
                <CityBlockUpdateableVisuals
                  key={`u-${index}`}
                  updateable={updateable}
                  game={gameRef.current}
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
        {cityLights.map((light, index) =>
          light.free ? null : (
            <pointLight
              key={`cl-${index}`}
              intensity={100}
              distance={2000}
              decay={1}
              color={`hsl(${light.color.h * 360}, ${light.color.s * 100}%, ${light.color.l * 100}%)`}
              position={[light.position.x, light.position.y, light.position.z]}
            />
          ),
        )}
      </group>
    </>
  );
}
