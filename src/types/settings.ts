export type QualityLevel = "low" | "medium" | "high";

export type FrameRateLimit = 0 | 30 | 60 | 120; // 0 = unlimited

/**
 * Debug visibility toggles for different object types.
 */
export type VisibilitySettings = {
  buildings: boolean;
  megaBuildings: boolean;
  ads: boolean;
  smoke: boolean;
  spotlights: boolean;
  toppers: boolean;
  trafficCars: boolean;
  playerCar: boolean;
  ground: boolean;
  storefronts: boolean;
  cityLights: boolean;
};

export type CityMode = "procedural" | "finite";

export type GameSettings = {
  mode: string;
  cityMode: CityMode;
  worldSeed: number;
  music: boolean;
  soundFx: boolean;
  windshieldShader: string;
  renderScaling: number;
  visualPreset: string;
  qualityLevel: QualityLevel;
  frameRateLimit: FrameRateLimit;
  visibility: VisibilitySettings;
};

