/**
 * World configuration constants
 * Core settings for the city grid and generation
 */

// Grid dimensions
export const CITY_BLOCK_SIZE = 128;
export const ROAD_WIDTH = 24;
export const CELL_SIZE = CITY_BLOCK_SIZE + ROAD_WIDTH; // 152

// World seeds
export const DEFAULT_WORLD_SEED = 9746;
export const CURATED_WORLD_SEEDS = [9746, 6362, 4217, 5794];

// Altitude limits
export const MIN_ALTITUDE = 15;
export const MAX_ALTITUDE = 800;
export const DEFAULT_PLAYER_HEIGHT = 250;

// Traffic altitudes (layers)
export const TRAFFIC_ALTITUDES = [20, 40, 60, 80];
export const TRAFFIC_ALT_OFFSETS = [0, 200, 400];

// Generation settings
export const NOISE_DETAIL = { lod: 8, falloff: 0.5 };
export const CITY_BLOCK_NOISE_FACTOR = 0.0017;

// Generator cell counts
export const CITY_BLOCK_CELL_COUNT = 40;
export const TRAFFIC_CELL_COUNT = 12;
export const CITY_LIGHT_CELL_COUNT = 8;
export const CITY_LIGHT_CELL_MULTIPLIER = 4; // cellSize = CELL_SIZE * this

// Pool sizes
export const CITY_LIGHT_POOL_SIZE = 10;
export const STREET_LIGHT_POOL_SIZE = 100;

// Collision
export const COLLISION_DISTANCE = 600;
export const COLLISION_MIN_ALTITUDE = 160;

/**
 * Get a random curated seed
 */
export function getRandomCuratedSeed(): number {
  return CURATED_WORLD_SEEDS[
    Math.floor(Math.random() * CURATED_WORLD_SEEDS.length)
  ];
}
