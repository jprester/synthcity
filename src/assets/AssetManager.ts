import {
  LoadingManager,
  TextureLoader,
  PlaneGeometry,
  BoxGeometry,
  SphereGeometry,
  Matrix4,
} from "three";
import type { Texture, Material, BufferGeometry, Group, Mesh } from "three";
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils.js";

import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import type {
  TextureManifest,
  TextureManifestEntry,
  ModelManifest,
  ModelManifestEntry,
  ProceduralGeometryEntry,
  MaterialContext,
  AssetLoadProgress,
  EmissiveMultipliers,
} from "./types";

import { BASE_EMISSIVE_INTENSITIES } from "./types";

import { createTextureManifest } from "./manifests/textures";
import { createModelManifest, detectModelFormat } from "./manifests/models";
import {
  createMaterialFactories,
  type MaterialFactoryMap,
} from "./manifests/materials";

export type AssetManagerConfig = {
  basePath?: string;
  cityBlockSize: number;
  roadWidth: number;
  environment: {
    name: string;
    windowLights: boolean;
  };
  textureAnisotropy?: number;
  terminal?: {
    writeAsset?: (url: string, loaded: number, total: number) => void;
  };
  onLoad?: () => void;
};

/**
 * Refactored AssetManager with manifest-based loading
 * Supports OBJ, GLB/GLTF formats and lazy material creation
 */
export class AssetManager {
  private basePath: string;
  private textureAnisotropy: number;
  private materialContext: MaterialContext;
  private terminal: AssetManagerConfig["terminal"];
  private onLoadCallback?: () => void;

  // Loaders
  private loadingManager: LoadingManager;
  private textureLoader: TextureLoader;
  private objLoader: OBJLoader;
  private gltfLoader: GLTFLoader;

  // Asset storage
  private textures: Map<string, Texture> = new Map();
  private models: Map<string, BufferGeometry> = new Map();
  private materials: Map<string, Material> = new Map();

  // Manifests
  private textureManifest: TextureManifest;
  private modelManifest: ModelManifest;
  private materialFactories: MaterialFactoryMap;

  // Loading state
  private isLoaded = false;

  constructor(config: AssetManagerConfig) {
    this.basePath = config.basePath ?? "";
    this.textureAnisotropy = config.textureAnisotropy ?? 8;
    this.terminal = config.terminal;
    this.onLoadCallback = config.onLoad;

    this.materialContext = {
      windowLightsEnabled: config.environment.windowLights,
      environmentName: config.environment.name,
      textureAnisotropy: this.textureAnisotropy,
    };

    // Create manifests
    this.textureManifest = createTextureManifest(this.textureAnisotropy);
    this.modelManifest = createModelManifest(
      config.cityBlockSize,
      config.roadWidth,
    );
    this.materialFactories = createMaterialFactories();

    // Initialize loading manager
    this.loadingManager = new LoadingManager();
    this.loadingManager.onProgress = (url, loaded, total) => {
      this.terminal?.writeAsset?.(url, loaded, total);
    };
    this.loadingManager.onLoad = () => {
      console.log("AssetManager: All assets loaded");
      this.isLoaded = true;
      this.initializeMaterials();
      this.onLoadCallback?.();
    };
    this.loadingManager.onError = (url) => {
      console.error(`AssetManager: Failed to load ${url}`);
    };

    // Initialize loaders
    this.textureLoader = new TextureLoader(this.loadingManager);
    this.objLoader = new OBJLoader(this.loadingManager);
    this.gltfLoader = new GLTFLoader(this.loadingManager);
  }

  /**
   * Set the base path for asset loading
   */
  setPath(path: string): void {
    this.basePath = path;
  }

  /**
   * Load all assets defined in manifests
   */
  load(): void {
    console.log("AssetManager: Loading assets");

    this.loadTextures();
    this.loadModels();
  }

  /**
   * Load a single model dynamically (for lazy loading)
   */
  async loadModel(
    key: string,
    entry: ModelManifestEntry,
  ): Promise<BufferGeometry | null> {
    if (this.models.has(key)) {
      return this.models.get(key) ?? null;
    }

    const format = entry.format ?? detectModelFormat(entry.path);
    const fullPath = this.basePath + entry.path;

    try {
      let geometry: BufferGeometry | null = null;

      if (format === "obj") {
        geometry = await this.loadOBJ(fullPath, entry.options);
      } else if (format === "glb" || format === "gltf") {
        geometry = await this.loadGLTF(fullPath, entry.options, key);
      }

      if (geometry) {
        this.models.set(key, geometry);
      }
      return geometry;
    } catch (error) {
      console.error(`AssetManager: Failed to load model ${key}:`, error);
      return null;
    }
  }

  // ===========================================================================
  // Texture Loading
  // ===========================================================================

  private loadTextures(): void {
    for (const [key, entry] of Object.entries(this.textureManifest)) {
      this.loadTexture(key, entry);
    }
  }

  private loadTexture(key: string, entry: TextureManifestEntry): void {
    const texture = this.textureLoader.load(this.basePath + entry.path);

    // Apply options
    if (entry.options) {
      const opts = entry.options;
      if (opts.colorSpace) texture.colorSpace = opts.colorSpace;
      if (opts.mapping) texture.mapping = opts.mapping;
      if (opts.magFilter) texture.magFilter = opts.magFilter;
      if (opts.wrapS) texture.wrapS = opts.wrapS;
      if (opts.wrapT) texture.wrapT = opts.wrapT;
      if (opts.repeatX || opts.repeatY) {
        texture.repeat.set(opts.repeatX ?? 1, opts.repeatY ?? 1);
      }
      if (opts.anisotropy) texture.anisotropy = opts.anisotropy;
    }

    this.textures.set(key, texture);
  }

  // ===========================================================================
  // Model Loading
  // ===========================================================================

  private loadModels(): void {
    for (const [key, entry] of Object.entries(this.modelManifest)) {
      if ("type" in entry && entry.format === "geometry") {
        // Procedural geometry
        this.loadProceduralGeometry(key, entry as ProceduralGeometryEntry);
      } else {
        // File-based model
        this.loadModelFromFile(key, entry as ModelManifestEntry);
      }
    }
  }

  private loadProceduralGeometry(
    key: string,
    entry: ProceduralGeometryEntry,
  ): void {
    let geometry: BufferGeometry;

    switch (entry.type) {
      case "plane":
        geometry = new PlaneGeometry(...entry.params);
        break;
      case "box":
        geometry = new BoxGeometry(...entry.params);
        break;
      case "sphere":
        geometry = new SphereGeometry(...entry.params);
        break;
      default:
        console.warn(`AssetManager: Unknown geometry type for ${key}`);
        return;
    }

    this.models.set(key, geometry);
  }

  private loadModelFromFile(key: string, entry: ModelManifestEntry): void {
    const format = entry.format ?? detectModelFormat(entry.path);
    const fullPath = this.basePath + entry.path;

    if (format === "obj") {
      this.objLoader.load(fullPath, (obj) => {
        const geometry = this.extractGeometryFromOBJ(obj, entry.options);
        if (geometry) {
          this.applyGeometryOptions(geometry, entry.options);
          this.models.set(key, geometry);
        }
      });
    } else if (format === "glb" || format === "gltf") {
      this.gltfLoader.load(fullPath, (gltf) => {
        const geometry = this.extractGeometryFromGLTF(gltf, entry.options, key);
        if (geometry) {
          this.applyGeometryOptions(geometry, entry.options);
          this.models.set(key, geometry);
        }
      });
    }
  }

  private extractGeometryFromOBJ(
    obj: Group,
    options?: ModelManifestEntry["options"],
  ): BufferGeometry | null {
    const meshIndex = options?.meshIndex ?? 0;
    const meshName = options?.meshName;

    let targetMesh: Mesh | null = null;

    if (meshName) {
      obj.traverse((child) => {
        if ((child as Mesh).isMesh && child.name === meshName) {
          targetMesh = child as Mesh;
        }
      });
    }

    if (!targetMesh && obj.children[meshIndex]) {
      targetMesh = obj.children[meshIndex] as Mesh;
    }

    return targetMesh?.geometry ?? null;
  }

  private extractGeometryFromGLTF(
    gltf: { scene: Group },
    options?: ModelManifestEntry["options"],
    modelKey?: string,
  ): BufferGeometry | null {
    const meshIndex = options?.meshIndex ?? 0;
    const meshName = options?.meshName;

    let targetMesh: Mesh | null = null;
    const meshes: Mesh[] = [];

    gltf.scene.traverse((child) => {
      if ((child as Mesh).isMesh) {
        meshes.push(child as Mesh);
        if (meshName && child.name === meshName) {
          targetMesh = child as Mesh;
        }
      }
    });

    if (!targetMesh && meshes[meshIndex]) {
      targetMesh = meshes[meshIndex];
    }

    if (!targetMesh) {
      return null;
    }

    // Apply world matrix to geometry to bake in node transforms (position, rotation, scale)
    // This is important for GLB models that have transforms on their nodes
    targetMesh.updateWorldMatrix(true, false);
    const worldMatrix = targetMesh.matrixWorld;

    // Get the geometry - handle multi-material meshes by checking if geometry has groups
    let finalGeometry: BufferGeometry;
    const sourceGeometry = targetMesh.geometry;

    if (sourceGeometry) {
      // Clone geometry so we don't modify the original
      finalGeometry = sourceGeometry.clone();
      // Apply the world matrix to bake in node transforms
      finalGeometry.applyMatrix4(worldMatrix);
    } else {
      return null;
    }

    // Store embedded material if requested
    if (options?.useEmbeddedMaterial && modelKey) {
      const embeddedMaterial = targetMesh.material;
      if (embeddedMaterial) {
        const materialKey = `__embedded_${modelKey}`;
        let materialToStore: Material;

        if (Array.isArray(embeddedMaterial)) {
          // If multiple materials, use the first one
          materialToStore = embeddedMaterial[0];
        } else {
          materialToStore = embeddedMaterial;
        }

        // Enhance embedded material to work better with scene lighting
        this.enhanceEmbeddedMaterial(materialToStore);
        this.materials.set(materialKey, materialToStore);
      }
    }

    return finalGeometry;
  }

  /**
   * Enhance embedded GLB materials to work better with scene lighting
   * Adjusts PBR properties to make materials more visible in low-light scenes
   */
  private enhanceEmbeddedMaterial(material: Material): void {
    // Check if it's a PBR material (MeshStandardMaterial or MeshPhysicalMaterial)
    if ("roughness" in material && "metalness" in material) {
      const mat = material as any;

      // Increase roughness slightly for better diffuse light response
      // (very smooth materials can appear dark without strong reflections)
      if (mat.roughness !== undefined && mat.roughness < 0.4) {
        mat.roughness = Math.max(mat.roughness, 0.5);
      }

      // Add environment map if available and not already set
      if (!mat.envMap) {
        mat.envMap = this.textures.get("env_night");
        mat.envMapIntensity = 0.4;
      }

      // Normalize emissive for embedded materials so preset system can control them
      if (mat.emissiveMap && mat.emissiveIntensity !== undefined) {
        // Set consistent white emissive color - the map provides color variation
        mat.emissive = mat.emissive || 0xffffff;
        // Normalize base intensity to 1.0 - the preset system will multiply this
        // by the category multiplier from BASE_EMISSIVE_INTENSITIES
        mat.emissiveIntensity = 1.0;
      } else if ("emissiveIntensity" in mat) {
        // Even without a map, normalize the intensity for consistent preset control
        mat.emissiveIntensity = 1.0;
      }
    }

    // Force material to update
    material.needsUpdate = true;
  }

  private applyGeometryOptions(
    geometry: BufferGeometry,
    options?: ModelManifestEntry["options"],
  ): void {
    if (!options) return;

    if (options.rotateX) geometry.rotateX(options.rotateX);
    if (options.rotateY) geometry.rotateY(options.rotateY);
    if (options.rotateZ) geometry.rotateZ(options.rotateZ);
    if (options.scale)
      geometry.scale(options.scale, options.scale, options.scale);

    if (options.computeBVH) {
      // computeBoundsTree is added by three-mesh-bvh
      (geometry as any).computeBoundsTree?.();
    }
  }

  // Async versions for dynamic loading
  private loadOBJ(
    path: string,
    options?: ModelManifestEntry["options"],
  ): Promise<BufferGeometry | null> {
    return new Promise((resolve) => {
      const loader = new OBJLoader();
      loader.load(
        path,
        (obj) => {
          const geometry = this.extractGeometryFromOBJ(obj, options);
          if (geometry) {
            this.applyGeometryOptions(geometry, options);
          }
          resolve(geometry);
        },
        undefined,
        () => resolve(null),
      );
    });
  }

  private loadGLTF(
    path: string,
    options?: ModelManifestEntry["options"],
    modelKey?: string,
  ): Promise<BufferGeometry | null> {
    return new Promise((resolve) => {
      const loader = new GLTFLoader();
      loader.load(
        path,
        (gltf) => {
          const geometry = this.extractGeometryFromGLTF(
            gltf,
            options,
            modelKey,
          );
          if (geometry) {
            this.applyGeometryOptions(geometry, options);
          }
          resolve(geometry);
        },
        undefined,
        () => resolve(null),
      );
    });
  }

  // ===========================================================================
  // Material Creation
  // ===========================================================================

  private initializeMaterials(): void {
    // Materials are created after textures are loaded
    for (const [key, factory] of Object.entries(this.materialFactories)) {
      const material = factory(
        (texKey) => this.textures.get(texKey),
        this.materialContext,
      );
      this.materials.set(key, material);
    }
  }

  // ===========================================================================
  // Emissive Intensity Control
  // ===========================================================================

  /**
   * Update emissive intensities on all materials based on preset multipliers
   * This allows dynamic control of glow effects for different visual presets
   */
  updateEmissiveIntensities(multipliers: EmissiveMultipliers): void {
    for (const [key, material] of this.materials) {
      const config = BASE_EMISSIVE_INTENSITIES[key];
      if (config && "emissiveIntensity" in material) {
        (material as any).emissiveIntensity =
          config.base * multipliers[config.category];
      }
    }
  }

  // ===========================================================================
  // Public Getters (backward compatible API)
  // ===========================================================================

  getTexture(key: string): Texture | undefined {
    return this.textures.get(key);
  }

  getModel(key: string): BufferGeometry | undefined {
    return this.models.get(key);
  }

  getMaterial(key: string): Material | undefined {
    return this.materials.get(key);
  }

  /**
   * Check if all assets are loaded
   */
  get loaded(): boolean {
    return this.isLoaded;
  }

  /**
   * Get all loaded texture keys
   */
  getTextureKeys(): string[] {
    return Array.from(this.textures.keys());
  }

  /**
   * Get all loaded model keys
   */
  getModelKeys(): string[] {
    return Array.from(this.models.keys());
  }

  /**
   * Get all loaded material keys
   */
  getMaterialKeys(): string[] {
    return Array.from(this.materials.keys());
  }

  // ===========================================================================
  // Dynamic Asset Management
  // ===========================================================================

  /**
   * Add a texture to the manifest and load it
   */
  addTexture(key: string, entry: TextureManifestEntry): void {
    this.textureManifest[key] = entry;
    this.loadTexture(key, entry);
  }

  /**
   * Add a model to the manifest (call loadModel to actually load it)
   */
  addModelToManifest(key: string, entry: ModelManifestEntry): void {
    this.modelManifest[key] = entry;
  }

  /**
   * Register a custom material factory
   */
  registerMaterialFactory(
    key: string,
    factory: (
      getTexture: (key: string) => Texture | undefined,
      ctx: MaterialContext,
    ) => Material,
  ): void {
    this.materialFactories[key] = factory;
    // Create immediately if textures are loaded
    if (this.isLoaded) {
      const material = factory(
        (texKey) => this.textures.get(texKey),
        this.materialContext,
      );
      this.materials.set(key, material);
    }
  }

  // ===========================================================================
  // Disposal
  // ===========================================================================

  /**
   * Dispose all loaded assets
   */
  dispose(): void {
    for (const texture of this.textures.values()) {
      texture.dispose();
    }
    for (const geometry of this.models.values()) {
      geometry.dispose();
    }
    for (const material of this.materials.values()) {
      material.dispose();
    }

    this.textures.clear();
    this.models.clear();
    this.materials.clear();
  }
}

// =============================================================================
// Backward Compatibility Layer
// =============================================================================

type LegacyGame = {
  cityBlockSize: number;
  roadWidth: number;
  environment: {
    name: string;
    windowLights: boolean;
  };
  onLoad: () => void;
};

type LegacyTerminal = {
  writeAsset?: (url: string, loaded: number, total: number) => void;
};

/**
 * Factory function for backward compatibility with old API
 * Usage: const assets = createAssetManager(game, terminal);
 *
 * This maintains compatibility with the existing Game class while
 * using the new manifest-based AssetManager internally.
 */
export function createAssetManager(
  game: LegacyGame,
  terminal?: LegacyTerminal,
): AssetManager {
  return new AssetManager({
    cityBlockSize: game.cityBlockSize,
    roadWidth: game.roadWidth,
    environment: game.environment,
    terminal,
    onLoad: () => game.onLoad(),
  });
}

/**
 * Legacy-compatible class that wraps the new AssetManager
 * Drop-in replacement for the old AssetManager class
 */
export class LegacyAssetManager {
  private manager: AssetManager;
  private basePath = "";

  constructor(game: LegacyGame, terminal?: LegacyTerminal) {
    this.manager = createAssetManager(game, terminal);
  }

  setPath(path: string): void {
    this.basePath = path;
    this.manager.setPath(path);
  }

  load(): void {
    this.manager.load();
  }

  getTexture(key: string) {
    return this.manager.getTexture(key);
  }

  getModel(key: string) {
    return this.manager.getModel(key);
  }

  getMaterial(key: string) {
    return this.manager.getMaterial(key);
  }

  updateEmissiveIntensities(multipliers: EmissiveMultipliers): void {
    this.manager.updateEmissiveIntensities(multipliers);
  }

  // Expose loaded state for race condition prevention
  get loaded(): boolean {
    return this.manager.loaded;
  }

  // Expose the underlying manager for advanced usage
  get internal(): AssetManager {
    return this.manager;
  }
}
