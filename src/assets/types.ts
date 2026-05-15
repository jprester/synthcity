import type {
  Texture,
  Material,
  BufferGeometry,
  Mapping,
  Wrapping,
  MagnificationTextureFilter,
  ColorSpace,
} from "three";
import { getEmbeddedEmissiveEntries } from "../config/buildingRegistry";

// ============================================================================
// Texture Types
// ============================================================================

export type TextureOptions = {
  colorSpace?: ColorSpace;
  mapping?: Mapping;
  magFilter?: MagnificationTextureFilter;
  wrapS?: Wrapping;
  wrapT?: Wrapping;
  repeatX?: number;
  repeatY?: number;
  anisotropy?: number;
};

export type TextureManifestEntry = {
  path: string;
  options?: TextureOptions;
};

export type TextureManifest = Record<string, TextureManifestEntry>;

// ============================================================================
// Model Types
// ============================================================================

export type ModelFormat = "obj" | "glb" | "gltf" | "geometry";

export type ModelOptions = {
  computeBVH?: boolean;
  rotateY?: number;
  rotateX?: number;
  rotateZ?: number;
  scale?: number;
  // For GLB: which mesh to extract (by name or index)
  meshName?: string;
  meshIndex?: number;
  // For GLB: preserve the embedded material instead of applying external textures
  // When true, the material from the GLB file will be stored as `__embedded_{modelKey}`
  useEmbeddedMaterial?: boolean;
};

export type ModelManifestEntry = {
  path: string;
  format?: ModelFormat; // Auto-detected from extension if not provided
  options?: ModelOptions;
};

// Special entry for procedural geometries
export type ProceduralGeometryEntry = {
  type: "plane" | "box" | "sphere";
  params: number[];
  format: "geometry";
};

export type ModelManifest = Record<
  string,
  ModelManifestEntry | ProceduralGeometryEntry
>;

// ============================================================================
// Material Types
// ============================================================================

export type MaterialType =
  | "phong"
  | "standard"
  | "physical"
  | "basic"
  | "lambert";

export type MaterialDefinition = {
  type: MaterialType;
  props: Record<string, unknown>;
  // References to textures by key
  textures?: {
    map?: string;
    normalMap?: string;
    emissiveMap?: string;
    roughnessMap?: string;
    specularMap?: string;
    aoMap?: string;
    bumpMap?: string;
    alphaMap?: string;
    envMap?: string;
    transmissionMap?: string;
  };
};

export type MaterialManifest = Record<string, MaterialDefinition>;

// Factory function type for dynamic material creation
export type MaterialFactory = (
  getTexture: (key: string) => Texture | undefined,
  context: MaterialContext,
) => Material;

export type MaterialContext = {
  windowLightsEnabled: boolean;
  environmentName: string;
  textureAnisotropy: number;
};

/**
 * Emissive intensity multipliers for different material categories
 * These are applied on top of base emissive intensities
 */
export type EmissiveMultipliers = {
  ads: number; // Ads, toppers, billboards
  buildings: number; // Window lights on buildings
  neons: number; // Storefronts, signs
  ambient: number; // Ground glow, misc ambient
  smoke: number; // Atmospheric smoke/steam effects
};

/**
 * Base emissive intensities for each material category
 * These are multiplied by the preset multipliers
 */
export const BASE_EMISSIVE_INTENSITIES: Record<
  string,
  { category: keyof EmissiveMultipliers; base: number }
> = {
  // Ads
  // Holographic ads — slightly brighter base so the see-through hologram
  // still reads clearly when its opacity is < 1.
  ads_holo_01: { category: "ads", base: 0.7 },
  ads_holo_02: { category: "ads", base: 0.7 },
  ads_holo_03: { category: "ads", base: 0.7 },
  ads_holo_04: { category: "ads", base: 0.7 },
  ads_holo_05: { category: "ads", base: 0.7 },
  ads_holo_06: { category: "ads", base: 0.7 },
  ads_holo_07: { category: "ads", base: 0.7 },
  ads_holo_08: { category: "ads", base: 0.7 },
  ads_holo_09: { category: "ads", base: 0.7 },
  ads_holo_10: { category: "ads", base: 0.7 },
  ads_holo_11: { category: "ads", base: 0.7 },
  ads_holo_12: { category: "ads", base: 0.7 },
  ads_holo_13: { category: "ads", base: 0.7 },
  ads_holo_14: { category: "ads", base: 0.7 },
  ads_holo_15: { category: "ads", base: 0.7 },
  ads_holo_16: { category: "ads", base: 0.7 },
  ads_holo_17: { category: "ads", base: 0.7 },
  // Buildings (base when windowLightsEnabled)
  building_01: { category: "buildings", base: 2.0 },
  building_02: { category: "buildings", base: 2.0 },
  building_03: { category: "buildings", base: 2.0 },
  building_04: { category: "buildings", base: 2.0 },
  building_05: { category: "buildings", base: 2.0 },
  building_06: { category: "buildings", base: 2.0 },
  building_07: { category: "buildings", base: 2.0 },
  building_08: { category: "buildings", base: 2.0 },
  building_09: { category: "buildings", base: 2.0 },
  building_10: { category: "buildings", base: 2.0 },
  mega_building_01: { category: "buildings", base: 2.0 },
  // Embedded GLB models — derived from building registry
  ...getEmbeddedEmissiveEntries(),
  // Neons (storefronts, signs)
  storefronts: { category: "neons", base: 0.5 },
  // Ambient
  ground: { category: "ambient", base: 0.2 },
  cars: { category: "ambient", base: 1.0 },
  spinner_interior: { category: "ambient", base: 0.5 },
  // Smoke
  smoke_01: { category: "smoke", base: 0.3 },
  smoke_02: { category: "smoke", base: 0.3 },
  smoke_03: { category: "smoke", base: 0.3 },
};

// ============================================================================
// Asset Manager Types
// ============================================================================

export type AssetLoadProgress = {
  url: string;
  loaded: number;
  total: number;
};

export type AssetManagerConfig = {
  basePath: string;
  textureAnisotropy?: number;
  onProgress?: (progress: AssetLoadProgress) => void;
  onComplete?: () => void;
  onError?: (url: string, error: Error) => void;
};

export type LoadedAssets = {
  textures: Map<string, Texture>;
  models: Map<string, BufferGeometry>;
  materials: Map<string, Material | Material[]>;
};
