import {
  createPerlin,
  clamp,
  mapRange,
  pickFromNoise,
  getRotationFromNoise,
} from "../../utils";
import {
  LARGE_THRESHOLDS,
  TOWER_THRESHOLDS,
  selectVariantFromNoise,
} from "../buildingRegistry";
import { CITY_BLOCK_SIZE, ROAD_WIDTH } from "../world";
import type {
  FiniteCityLayout,
  FiniteBuildingPlacement,
  FiniteMegaPlacement,
  FiniteStorefrontPlacement,
} from "./types";

function fixNoise(noise: number): number {
  return clamp(mapRange(noise, 0.2, 0.75, 0, 0.9999), 0, 0.9999);
}

function getBuildingMatKey(noise: number): string {
  const mats = [
    "building_01",
    "building_02",
    "building_03",
    "building_04",
    "building_05",
  ];
  return pickFromNoise(mats, noise);
}

function getBigBuildingMatKey(noise: number, rare: boolean): string {
  const mats = [
    "building_01",
    "building_02",
    "building_03",
    "building_04",
    "building_05",
  ];
  const matsRare = [
    "building_06",
    "building_08",
    "building_09",
    "building_10",
  ];
  return pickFromNoise(rare ? matsRare : mats, noise);
}

const NOISEFACTOR = 0.0017;
const CELL_SIZE = CITY_BLOCK_SIZE + ROAD_WIDTH;

/**
 * Generate a finite city layout using the same Perlin noise logic as the
 * procedural generator, but iterating a fixed rectangular grid.
 *
 * @param seed - World seed for deterministic generation
 * @param gridSize - Number of blocks per axis (default 15 = 225 blocks)
 */
export function generateLayout(
  seed: number = 9746,
  gridSize: number = 15,
): FiniteCityLayout {
  const noise = createPerlin(seed);
  noise.noiseDetail(8, 0.5);

  const buildings: FiniteBuildingPlacement[] = [];
  const megaBuildings: FiniteMegaPlacement[] = [];
  const groundTiles: { x: number; z: number }[] = [];
  const storefronts: FiniteStorefrontPlacement[] = [];

  // Center the grid around origin
  const halfGrid = Math.floor(gridSize / 2);

  for (let gi = 0; gi < gridSize; gi++) {
    for (let gj = 0; gj < gridSize; gj++) {
      const blockX = (gi - halfGrid) * CELL_SIZE;
      const blockZ = (gj - halfGrid) * CELL_SIZE;

      // Ground tile for every block
      groundTiles.push({
        x: blockX + CITY_BLOCK_SIZE / 2,
        z: blockZ + CITY_BLOCK_SIZE / 2,
      });

      let typeNoise = fixNoise(
        noise.noise(blockX * NOISEFACTOR, blockZ * NOISEFACTOR),
      );
      let subtypeNoise = fixNoise(noise.noise(blockX * 5, blockZ * 5));

      // Rare mega building
      if (typeNoise < 0.2) {
        if (
          blockX % (CELL_SIZE * 6) === 0 &&
          blockZ % (CELL_SIZE * 6) === 0
        ) {
          const xOff = CITY_BLOCK_SIZE / 2;
          const zOff = CITY_BLOCK_SIZE / 2;
          const wx = blockX + xOff;
          const wz = blockZ + zOff;

          // Don't place too close to player spawn path
          if (!(wx < 128 && wx > -128)) {
            const rotateNoise = fixNoise(noise.noise(wx * 5, wz * 5));
            const rotate = getRotationFromNoise(rotateNoise);
            const scale = 0.75 + rotateNoise * 0.25;

            let type: string;
            if (subtypeNoise < 0.16) type = "mega_01";
            else if (subtypeNoise < 0.32) type = "mega_02";
            else if (subtypeNoise < 0.48) type = "mega_03";
            else if (subtypeNoise < 0.64) type = "mega_04";
            else if (subtypeNoise < 0.8) type = "mega_05";
            else type = "mega_06";

            megaBuildings.push({
              modelKey: type,
              x: wx,
              z: wz,
              scaleX: 1,
              scaleY: scale,
              scaleZ: 1,
              rotationY: (rotate * Math.PI) / 180,
            });
          }
        }
      }

      if (typeNoise < 0.1) {
        // Empty block
      } else if (typeNoise < 0.8) {
        // Small buildings — 2x2 grid per block
        for (let i = 0; i < 2; i++) {
          for (let j = 0; j < 2; j++) {
            const xOff =
              i * (CITY_BLOCK_SIZE / 2) + CITY_BLOCK_SIZE / 4;
            const zOff =
              j * (CITY_BLOCK_SIZE / 2) + CITY_BLOCK_SIZE / 4;
            const wx = blockX + xOff;
            const wz = blockZ + zOff;

            const rotateNoise = fixNoise(noise.noise(wx * 5, wz * 5));
            const rotate = getRotationFromNoise(rotateNoise);
            const scale = 0.75 + rotateNoise * 0.45;

            // Update noise for subdivided location
            typeNoise = fixNoise(
              noise.noise(wx * NOISEFACTOR, wz * NOISEFACTOR),
            );
            subtypeNoise = fixNoise(noise.noise(wx * 5, wz * 5));

            let type: string;
            if (typeNoise < 0.267) {
              if (subtypeNoise < 0.33) type = "s_01_01";
              else if (subtypeNoise < 0.66) type = "s_01_02";
              else type = "s_01_03";
            } else if (typeNoise < 0.534) {
              if (subtypeNoise < 0.33) type = "s_02_01";
              else if (subtypeNoise < 0.66) type = "s_02_02";
              else type = "s_02_03";
            } else {
              if (subtypeNoise < 0.25) type = "s_03_01";
              else if (subtypeNoise < 0.5) type = "s_03_02";
              else if (subtypeNoise < 0.75) type = "s_03_03";
              else type = "s_03_04";
            }

            const matNoise = fixNoise(noise.noise(wx * -3, wz * -3));
            const matKey = getBuildingMatKey(matNoise);

            buildings.push({
              modelKey: type,
              materialKey: matKey,
              x: wx,
              z: wz,
              scaleX: 1,
              scaleY: scale,
              scaleZ: 1,
              rotationY: (rotate * Math.PI) / 180,
            });
          }
        }
      } else {
        // Large building or tower — single per block
        const isTower = typeNoise > 0.975;
        const xOff = CITY_BLOCK_SIZE / 2;
        const zOff = CITY_BLOCK_SIZE / 2;
        const wx = blockX + xOff;
        const wz = blockZ + zOff;

        subtypeNoise = fixNoise(noise.noise(blockX * 4, blockZ * 4));

        const type = isTower
          ? selectVariantFromNoise(TOWER_THRESHOLDS, subtypeNoise)
          : selectVariantFromNoise(LARGE_THRESHOLDS, subtypeNoise);

        const matNoise = fixNoise(noise.noise(wx * -3, wz * -3));
        const matKey = getBigBuildingMatKey(matNoise, subtypeNoise > 0.9);

        const rotateNoise = fixNoise(noise.noise(wx * 4, wz * 4));
        const rotate = getRotationFromNoise(rotateNoise);
        const scale = 1 + rotateNoise * 0.5;

        buildings.push({
          modelKey: type,
          materialKey: matKey,
          x: wx,
          z: wz,
          scaleX: 1,
          scaleY: scale,
          scaleZ: 1,
          rotationY: (rotate * Math.PI) / 180,
        });
      }

      // Storefronts — every 2nd block in each direction
      if (
        blockX % (CELL_SIZE * 2) === 0 &&
        blockZ % (CELL_SIZE * 2) === 0
      ) {
        const sfMats = [
          "storefronts",
          "building_02",
          "building_03",
          "building_07",
        ];
        const mat = pickFromNoise(sfMats, subtypeNoise) ?? "storefronts";
        storefronts.push({
          x: blockX + CITY_BLOCK_SIZE + ROAD_WIDTH / 2,
          z: blockZ + CITY_BLOCK_SIZE + ROAD_WIDTH / 2,
          materialKey: mat,
        });
      }
    }
  }

  const worldExtent = halfGrid * CELL_SIZE + CELL_SIZE;

  return {
    name: `Generated City (seed: ${seed}, ${gridSize}x${gridSize})`,
    bounds: {
      minX: -worldExtent,
      maxX: worldExtent,
      minZ: -worldExtent,
      maxZ: worldExtent,
    },
    spawn: {
      x: -ROAD_WIDTH / 2,
      z: 0,
      rotationY: 0,
    },
    buildings,
    megaBuildings,
    groundTiles,
    storefronts,
  };
}
