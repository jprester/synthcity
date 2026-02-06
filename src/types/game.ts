import type {
  Audio as ThreeAudio,
  AudioListener,
  AudioLoader,
  BufferGeometry,
  Material,
  Object3D,
  PerspectiveCamera,
  Texture,
} from "three";
import type { EmissiveMultipliers } from "../assets/types";
import type { PlayerController } from "../controllers/usePlayerController";
import type { EnvironmentConfig } from "../config/environments";
import type { TerminalApi } from "../ui/initTerminal";

export type Vector3Like = {
  x: number;
  y: number;
  z: number;
};

export type RotationLike = {
  x?: number;
  y?: number;
  z?: number;
};

export type SceneVisibilitySettings = {
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

export type RuntimeSettings = {
  mode: string;
  worldSeed: number;
  music: boolean | number;
  soundFx: boolean | number;
  windshieldShader: string;
  renderScaling: number;
  visualPreset?: string;
  qualityLevel?: string;
  frameRateLimit?: number;
  visibility?: SceneVisibilitySettings;
};

export type RuntimeAssets = {
  getTexture: (key: string) => Texture | undefined;
  getModel: (key: string) => BufferGeometry | undefined;
  getMaterial: (key: string) => Material | undefined;
  updateEmissiveIntensities?: (multipliers: EmissiveMultipliers) => void;
  setTerminal?: (terminal: TerminalApi | null) => void;
  loaded: boolean;
};

export type RuntimePlayer = {
  camera: PerspectiveCamera;
  body: Object3D;
  carPose?: Object3D;
  soundWind?: ThreeAudio;
  soundStress?: ThreeAudio;
  soundChimeUp?: ThreeAudio;
  soundChimeDown?: ThreeAudio;
  soundCrash?: ThreeAudio;
  soundCityAmbient?: ThreeAudio;
};

export type RuntimeCollider = {
  enabled: boolean;
};

export type RuntimeRadio = {
  update: () => void;
};

export type CityLightDescriptor = {
  free: boolean;
  position: Vector3Like;
  color: { h: number; s: number; l: number };
};

export type CityBlockVisualDescriptor = {
  modelKey: string;
  material?: Material;
  materialKey?: string;
  position: Vector3Like;
  scale?: Vector3Like;
  rotationX?: number;
  rotationY?: number;
  rotationZ?: number;
};

export type UpdateableKind = "advert" | "smoke" | "spotlight" | "topper";

export type UpdateableVisualState = {
  isVisual: boolean;
  kind: UpdateableKind;
  modelKey: string;
  matKey?: string;
  currentMatKey?: string;
  position?: Vector3Like;
  scale?: Vector3Like;
  rotationY?: number;
  rstep?: number;
  update?: () => void;
  remove?: () => void;
};

export type TrafficCarState = {
  modelKey: string;
  pose: Object3D;
  update?: () => void;
  remove?: () => void;
};

export type WithGenId<T> = T & { __genId?: string };

export type CityBlockItemState = {
  visuals?: CityBlockVisualDescriptor[];
  updateables?: UpdateableVisualState[];
  update?: () => void;
  remove?: () => void;
};

export type TrafficItemState = {
  cars?: TrafficCarState[];
  update?: () => void;
  remove?: () => void;
};

export type CityLightItemState = {
  update?: () => void;
  remove?: () => void;
};

type NoiseRuntime = {
  noise: (x: number, y: number, z?: number) => number;
  noiseDetail: (lod: number, falloff: number) => void;
};

export type GameRuntime = {
  initialized: boolean;
  isRunning: boolean;
  generatorsInitialized?: boolean;
  settings: RuntimeSettings;
  environment: EnvironmentConfig;
  assets?: RuntimeAssets;
  player: RuntimePlayer;
  playerController: PlayerController;
  collider: RuntimeCollider;
  cityBlockSize: number;
  roadWidth: number;
  cityBlockNoise?: NoiseRuntime;
  cityBlockNoiseFactor?: number;
  cityLights?: CityLightDescriptor[];
  canvas?: HTMLElement | null;
  pointerLockElement?: Element | null;
  uiOnUnfocus?: boolean;
  __pendingPointerLock?: boolean;
  canvasOpacity: number;
  masterVolume: number;
  userMasterVolume: number;
  audioListener?: AudioListener;
  audioLoader?: AudioLoader;
  radio?: RuntimeRadio | null;
  onEnterClick: () => void;
  updatePlayer: (delta: number) => void;
  setSettings: (settings: Partial<RuntimeSettings>) => void;
  setTerminal?: (terminal: TerminalApi | null) => void;
  load?: () => void;
};
