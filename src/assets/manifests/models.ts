import type { ModelManifest } from "../types";

/**
 * Model manifest - defines all 3D models to be loaded
 * Supports: .obj, .glb, .gltf, and procedural geometries
 *
 * Format auto-detected from file extension, or specify explicitly:
 * { path: 'model.glb', format: 'glb', options: { computeBVH: true } }
 */
export function createModelManifest(
  cityBlockSize: number,
  roadWidth: number,
): ModelManifest {
  const manifest: ModelManifest = {
    // Player car (spinner)
    spinner: {
      path: "models/spinner.obj",
      options: { rotateY: -Math.PI / 2 },
    },
    spinner_windows: {
      path: "models/spinner_windows.obj",
      options: { rotateY: -Math.PI / 2 },
    },

    // Ground plane (procedural)
    ground: {
      type: "plane",
      params: [cityBlockSize + roadWidth, cityBlockSize + roadWidth],
      format: "geometry",
    },

    // Smoke plane (procedural)
    smoke: {
      type: "plane",
      params: [64, 64],
      format: "geometry",
    },

    // Storefronts
    storefronts: {
      path: "models/storefronts.obj",
      options: { computeBVH: true },
    },

    // Spotlight
    spotlight: {
      path: "models/spotlight.obj",
    },
  };

  // Standard buildings (s_01 through s_05, 3 variants each)
  const buildingSeries = ["01", "02", "03", "04", "05"];
  for (const series of buildingSeries) {
    for (let variant = 1; variant <= 3; variant++) {
      const id = variant.toString().padStart(2, "0");
      const key = `s_${series}_${id}`;
      manifest[key] = {
        path: `models/${key}.obj`,
        options: { computeBVH: true },
      };
    }
  }

  // Override s_04_03 with new GLB model that has embedded textures
  manifest["s_04_03"] = {
    path: "models/sci-fi-building-9_1.glb",
    format: "glb",
    options: { computeBVH: true, useEmbeddedMaterial: true, scale: 1.3 },
  };

  // Override s_05_01 with new GLB model that has embedded textures
  manifest["s_05_01"] = {
    path: "models/sci-fi-building-6_1.glb",
    format: "glb",
    options: { computeBVH: true, useEmbeddedMaterial: true, scale: 1.3 },
  };

  // Mega buildings (6 variants)
  for (let i = 1; i <= 6; i++) {
    const id = i.toString().padStart(2, "0");
    manifest[`mega_${id}`] = {
      path: `models/mega_${id}.obj`,
      options: { computeBVH: true },
    };
  }

  // Advertisement models
  const adModels = [
    "ads_s_01_01",
    "ads_s_01_02",
    "ads_s_02_01",
    "ads_s_02_02",
    "ads_s_03_01",
    "ads_s_03_02",
    "ads_s_04_01",
    "ads_s_04_02",
    "ads_s_04_03",
    "ads_s_04_04",
    "ads_s_05_01",
    "ads_s_05_02",
    "ads_s_05_03",
    "ads_s_05_04",
  ];
  for (const key of adModels) {
    manifest[key] = { path: `models/${key}.obj` };
  }

  // Toppers (12 variants)
  for (let i = 1; i <= 12; i++) {
    const id = i.toString().padStart(2, "0");
    manifest[`topper_${id}`] = { path: `models/topper_${id}.obj` };
  }

  // Traffic cars (8 variants)
  for (let i = 1; i <= 8; i++) {
    const id = i.toString().padStart(2, "0");
    manifest[`car_${id}`] = { path: `models/car_${id}.obj` };
  }

  return manifest;
}

/**
 * Helper to add a GLB model to an existing manifest
 * Use this for adding new models in GLB format
 */
export function addGLBModel(
  manifest: ModelManifest,
  key: string,
  path: string,
  options?: {
    computeBVH?: boolean;
    meshName?: string;
    meshIndex?: number;
    scale?: number;
  },
): void {
  manifest[key] = {
    path,
    format: "glb",
    options,
  };
}

/**
 * Helper to detect format from file extension
 */
export function detectModelFormat(path: string): "obj" | "glb" | "gltf" {
  const ext = path.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "glb":
      return "glb";
    case "gltf":
      return "gltf";
    case "obj":
    default:
      return "obj";
  }
}
