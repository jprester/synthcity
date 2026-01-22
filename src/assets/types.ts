import type {
  Texture,
  Material,
  BufferGeometry,
  Mapping,
  Wrapping,
  MagnificationTextureFilter,
  ColorSpace,
} from "three";

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
  materials: Map<string, Material>;
};
