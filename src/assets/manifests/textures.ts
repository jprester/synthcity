import {
  EquirectangularReflectionMapping,
  LinearFilter,
  SRGBColorSpace,
  RepeatWrapping,
} from "three";
import type { TextureManifest } from "../types";

/**
 * Texture manifest - defines all textures to be loaded
 * Format: { [key]: { path, options? } }
 */
export function createTextureManifest(anisotropy: number): TextureManifest {
  const manifest: TextureManifest = {
    // Sky textures
    sky_night: {
      path: "textures/sky_night.jpg",
      options: {
        colorSpace: SRGBColorSpace,
        mapping: EquirectangularReflectionMapping,
        magFilter: LinearFilter,
      },
    },
    sky_day: {
      path: "textures/sky_day.jpg",
      options: {
        colorSpace: SRGBColorSpace,
        mapping: EquirectangularReflectionMapping,
        magFilter: LinearFilter,
      },
    },

    // Environment maps
    env_night: {
      path: "textures/environment_night.jpg",
      options: {
        mapping: EquirectangularReflectionMapping,
        magFilter: LinearFilter,
      },
    },
    env_night_windshield: {
      path: "textures/environment_night_windshield.jpg",
      options: {
        mapping: EquirectangularReflectionMapping,
        magFilter: LinearFilter,
      },
    },

    // Ground
    ground: { path: "textures/ground.jpg" },
    ground_em: { path: "textures/ground_em.jpg" },

    // Spinner (player car)
    spinner_interior: {
      path: "textures/0QuazDeckardCarLowpoly_interior_BaseColor.png",
    },
    spinner_interior_norm: {
      path: "textures/0QuazDeckardCarLowpoly_interior_Normal.png",
    },
    spinner_interior_em: {
      path: "textures/0QuazDeckardCarLowpoly_interior_Emissive.png",
    },
    spinner_interior_ao: {
      path: "textures/0QuazDeckardCarLowpoly_interior_AmbientOcclusion.png",
    },
    spinner_exterior: {
      path: "textures/0QuazDeckardCarLowpoly_car_BaseColor.png",
    },
    spinner_windows_norm: {
      path: "textures/rain_normal_1024.jpg",
      options: {
        wrapS: RepeatWrapping,
        wrapT: RepeatWrapping,
        repeatX: 2.5,
        repeatY: 2.5,
      },
    },
    spinner_windows_rough: {
      path: "textures/smudges2_1024.jpg",
      options: {
        wrapS: RepeatWrapping,
        wrapT: RepeatWrapping,
        repeatX: 2.5,
        repeatY: 2.5,
      },
    },
    spinner_windows_trans: {
      path: "textures/smudges_inverted_1024.jpg",
      options: {
        wrapS: RepeatWrapping,
        wrapT: RepeatWrapping,
        repeatX: 2.5,
        repeatY: 2.5,
      },
    },

    // Traffic cars
    cars: { path: "textures/cars.jpg" },
    cars_em: { path: "textures/cars_em.jpg" },

    // Storefronts
    storefronts: {
      path: "textures/storefronts_01.jpg",
      options: {
        wrapS: RepeatWrapping,
        wrapT: RepeatWrapping,
        anisotropy,
      },
    },
    storefronts_em: {
      path: "textures/storefronts_01_em.jpg",
      options: {
        wrapS: RepeatWrapping,
        wrapT: RepeatWrapping,
        anisotropy,
      },
    },

    // Mega building
    mega_building_01: {
      path: "textures/mega_building_01.jpg",
      options: {
        wrapS: RepeatWrapping,
        wrapT: RepeatWrapping,
        anisotropy,
      },
    },
    mega_building_01_em: {
      path: "textures/mega_building_01_em.jpg",
      options: {
        wrapS: RepeatWrapping,
        wrapT: RepeatWrapping,
        anisotropy,
      },
    },
  };

  // Building textures (10 variants)
  for (let i = 1; i <= 10; i++) {
    const id = i.toString().padStart(2, "0");
    manifest[`building_${id}`] = {
      path: `textures/building_${id}.jpg`,
      options: { wrapS: RepeatWrapping, wrapT: RepeatWrapping, anisotropy },
    };
    manifest[`building_${id}_em`] = {
      path: `textures/building_${id}_em.jpg`,
      options: { wrapS: RepeatWrapping, wrapT: RepeatWrapping, anisotropy },
    };
    manifest[`building_${id}_rough`] = {
      path: `textures/building_${id}_spec.jpg`,
      options: { wrapS: RepeatWrapping, wrapT: RepeatWrapping, anisotropy },
    };
  }

  // Small ads (5 variants)
  for (let i = 1; i <= 5; i++) {
    const id = i.toString().padStart(2, "0");
    manifest[`ads_${id}`] = { path: `textures/ads_${id}.jpg` };
  }

  // Large ads (5 variants)
  for (let i = 1; i <= 5; i++) {
    const id = i.toString().padStart(2, "0");
    manifest[`ads_large_${id}`] = { path: `textures/ads_large_${id}.jpg` };
  }

  // Smoke (3 variants)
  for (let i = 1; i <= 3; i++) {
    const id = i.toString().padStart(2, "0");
    manifest[`smoke_${id}`] = { path: `textures/smoke_${id}.jpg` };
  }

  // Spotlights (4 variants)
  for (let i = 1; i <= 4; i++) {
    const id = i.toString().padStart(2, "0");
    manifest[`spotlight_${id}`] = { path: `textures/spotlight_${id}.jpg` };
  }

  return manifest;
}
