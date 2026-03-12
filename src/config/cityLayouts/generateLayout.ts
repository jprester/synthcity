import {
  createPerlin,
  clamp,
  mapRange,
  pickFromNoise,
  getRotationFromNoise,
} from "../../utils";
import {
  SKYSCRAPER_THRESHOLDS,
  NEW_TOWER_SERIES,
  selectVariantFromNoise,
} from "../buildingRegistry";
import { CITY_BLOCK_SIZE, ROAD_WIDTH } from "../world";
import { getZoneBias } from "./zones";
import type {
  FiniteCityLayout,
  FiniteBuildingPlacement,
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

const NOISEFACTOR = 0.0017;
const CELL_SIZE = CITY_BLOCK_SIZE + ROAD_WIDTH;

/**
 * Generate a finite city layout using concentric zones.
 * Downtown towers at the center, suburbs on the edges, with smooth transitions.
 *
 * @param seed - World seed for deterministic generation
 * @param gridSize - Number of blocks per axis (default 17 = 289 blocks)
 */
export function generateLayout(
  seed: number = 9746,
  gridSize: number = 17,
): FiniteCityLayout {
  const noise = createPerlin(seed);
  noise.noiseDetail(8, 0.5);

  const buildings: FiniteBuildingPlacement[] = [];
  const groundTiles: { x: number; z: number }[] = [];
  const storefronts: FiniteStorefrontPlacement[] = [];

  const halfGrid = Math.floor(gridSize / 2);

  // ── Tower pre-pass ──────────────────────────────────────────────────────
  // Collect all blocks that would be towers, sort by noise, assign each of
  // the 9 unique tower variants to the best candidates. Extra tower blocks
  // beyond the variant count are downgraded to skyscrapers in the main loop.
  const towerVariantKeys = NEW_TOWER_SERIES.variants.map((v) => v.key);
  const towerCandidates: { gi: number; gj: number; typeNoise: number }[] = [];

  for (let gi = 0; gi < gridSize; gi++) {
    for (let gj = 0; gj < gridSize; gj++) {
      const blockX = (gi - halfGrid) * CELL_SIZE;
      const blockZ = (gj - halfGrid) * CELL_SIZE;
      const typeNoise = fixNoise(
        noise.noise(blockX * NOISEFACTOR, blockZ * NOISEFACTOR),
      );
      const zoneBias = getZoneBias(gi, gj, gridSize);
      const emptyEnd = zoneBias.emptyProbability;
      const towerEnd = emptyEnd + zoneBias.towerProbability;
      if (typeNoise >= emptyEnd && typeNoise < towerEnd) {
        towerCandidates.push({ gi, gj, typeNoise });
      }
    }
  }

  // Sort best-first (highest noise = most "downtown"), assign unique variants
  towerCandidates.sort((a, b) => b.typeNoise - a.typeNoise);
  const towerAssignments = new Map<string, string>(); // "gi,gj" → tower key
  const towerOverflow = new Set<string>(); // blocks that exceed variant count
  for (let i = 0; i < towerCandidates.length; i++) {
    const { gi, gj } = towerCandidates[i];
    const blockKey = `${gi},${gj}`;
    if (i < towerVariantKeys.length) {
      towerAssignments.set(blockKey, towerVariantKeys[i]);
    } else {
      towerOverflow.add(blockKey);
    }
  }
  // ────────────────────────────────────────────────────────────────────────

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

      // Concentric zone bias for this block
      const zoneBias = getZoneBias(gi, gj, gridSize);

      // Cumulative probability thresholds
      const emptyEnd = zoneBias.emptyProbability;
      const towerEnd = emptyEnd + zoneBias.towerProbability;
      const skyscraperEnd = towerEnd + zoneBias.skyscraperProbability;
      // Remaining probability = small buildings

      const blockKey = `${gi},${gj}`;

      if (typeNoise < emptyEnd) {
        // Empty block — skip
      } else if (typeNoise < towerEnd && towerAssignments.has(blockKey)) {
        // Tower — unique variant assigned by pre-pass
        const wx = blockX + CITY_BLOCK_SIZE / 2;
        const wz = blockZ + CITY_BLOCK_SIZE / 2;
        const type = towerAssignments.get(blockKey)!;

        const rotateNoise = fixNoise(noise.noise(wx * 4, wz * 4));
        const rotate = getRotationFromNoise(rotateNoise);

        buildings.push({
          modelKey: type,
          materialKey: `__embedded_${type}`,
          x: wx,
          z: wz,
          scaleX: 1,
          scaleY: 1,
          scaleZ: 1,
          rotationY: (rotate * Math.PI) / 180,
        });
      } else if (typeNoise < skyscraperEnd || towerOverflow.has(blockKey)) {
        // Skyscraper — single per block, embedded material, slight height variation
        const wx = blockX + CITY_BLOCK_SIZE / 2;
        const wz = blockZ + CITY_BLOCK_SIZE / 2;
        subtypeNoise = fixNoise(noise.noise(blockX * 4, blockZ * 4));
        const type = selectVariantFromNoise(SKYSCRAPER_THRESHOLDS, subtypeNoise);

        const rotateNoise = fixNoise(noise.noise(wx * 4, wz * 4));
        const rotate = getRotationFromNoise(rotateNoise);
        const scaleY = 0.9 + rotateNoise * 0.3;

        buildings.push({
          modelKey: type,
          materialKey: `__embedded_${type}`,
          x: wx,
          z: wz,
          scaleX: 1,
          scaleY,
          scaleZ: 1,
          rotationY: (rotate * Math.PI) / 180,
        });
      } else {
        // Small buildings — 2×2 grid per block
        // Use smallWeights to bias subtype selection (residential/commercial/industrial)
        const { residential, commercial } = zoneBias.smallWeights;
        // cumulative: [0, residential) = s_01, [residential, residential+commercial) = s_02, rest = s_03

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

            // Select subtype based on zone-weighted probabilities
            let type: string;
            if (typeNoise < residential) {
              // Residential
              if (subtypeNoise < 0.33) type = "s_01_01";
              else if (subtypeNoise < 0.66) type = "s_01_02";
              else type = "s_01_03";
            } else if (typeNoise < residential + commercial) {
              // Commercial
              if (subtypeNoise < 0.33) type = "s_02_01";
              else if (subtypeNoise < 0.66) type = "s_02_02";
              else type = "s_02_03";
            } else {
              // Industrial
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
      z: -(halfGrid * CELL_SIZE) + ROAD_WIDTH / 2,
      rotationY: Math.PI,
    },
    buildings,
    groundTiles,
    storefronts,
  };
}
