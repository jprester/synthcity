/**
 * Visual effect presets for different aesthetic styles
 */

export type VisualPreset = {
  name: string;
  bloom: {
    intensity: number;
    luminanceThreshold: number;
    luminanceSmoothing: number;
    mipmapBlur?: boolean;
  };
  chromaticAberration: {
    enabled: boolean;
    offset: number;
  };
  vignette: {
    enabled: boolean;
    darkness: number;
    offset: number;
  };
  colorGrading: {
    enabled: boolean;
    saturation: number;
    contrast: number;
    brightness: number;
  };
  scanlines: {
    enabled: boolean;
    density: number;
    opacity: number;
  };
  noise: {
    enabled: boolean;
    opacity: number;
  };
};

/**
 * Default/Original preset - matches current settings
 */
export const PRESET_DEFAULT: VisualPreset = {
  name: "Default",
  bloom: {
    intensity: 7.0,
    luminanceThreshold: 0.0,
    luminanceSmoothing: 0.0,
  },
  chromaticAberration: {
    enabled: false,
    offset: 0.002,
  },
  vignette: {
    enabled: false,
    darkness: 0.5,
    offset: 0.5,
  },
  colorGrading: {
    enabled: false,
    saturation: 1.0,
    contrast: 1.0,
    brightness: 0.0,
  },
  scanlines: {
    enabled: false,
    density: 1.5,
    opacity: 0.1,
  },
  noise: {
    enabled: false,
    opacity: 0.02,
  },
};

/**
 * Intense Neon - boosted bloom and saturation for vibrant neons
 */
export const PRESET_INTENSE_NEON: VisualPreset = {
  name: "Intense Neon",
  bloom: {
    intensity: 12.0,
    luminanceThreshold: 0.1,
    luminanceSmoothing: 0.3,
    mipmapBlur: true,
  },
  chromaticAberration: {
    enabled: true,
    offset: 0.003,
  },
  vignette: {
    enabled: true,
    darkness: 0.4,
    offset: 0.5,
  },
  colorGrading: {
    enabled: true,
    saturation: 1.3,
    contrast: 1.1,
    brightness: 0.05,
  },
  scanlines: {
    enabled: false,
    density: 1.5,
    opacity: 0.1,
  },
  noise: {
    enabled: false,
    opacity: 0.02,
  },
};

/**
 * Blade Runner - cinematic with film grain and vignette
 */
export const PRESET_BLADE_RUNNER: VisualPreset = {
  name: "Blade Runner",
  bloom: {
    intensity: 10.0,
    luminanceThreshold: 0.15,
    luminanceSmoothing: 0.5,
    mipmapBlur: true,
  },
  chromaticAberration: {
    enabled: true,
    offset: 0.002,
  },
  vignette: {
    enabled: true,
    darkness: 0.6,
    offset: 0.4,
  },
  colorGrading: {
    enabled: true,
    saturation: 1.15,
    contrast: 1.15,
    brightness: -0.05,
  },
  scanlines: {
    enabled: false,
    density: 1.5,
    opacity: 0.05,
  },
  noise: {
    enabled: true,
    opacity: 0.03,
  },
};

/**
 * Retro CRT - scanlines and noise for vintage look
 */
export const PRESET_RETRO_CRT: VisualPreset = {
  name: "Retro CRT",
  bloom: {
    intensity: 8.0,
    luminanceThreshold: 0.0,
    luminanceSmoothing: 0.2,
  },
  chromaticAberration: {
    enabled: true,
    offset: 0.004,
  },
  vignette: {
    enabled: true,
    darkness: 0.7,
    offset: 0.3,
  },
  colorGrading: {
    enabled: true,
    saturation: 1.2,
    contrast: 1.2,
    brightness: 0.0,
  },
  scanlines: {
    enabled: true,
    density: 2.0,
    opacity: 0.15,
  },
  noise: {
    enabled: true,
    opacity: 0.04,
  },
};

/**
 * Hypercolor - extreme saturation and bloom
 */
export const PRESET_HYPERCOLOR: VisualPreset = {
  name: "Hypercolor",
  bloom: {
    intensity: 15.0,
    luminanceThreshold: 0.05,
    luminanceSmoothing: 0.2,
    mipmapBlur: true,
  },
  chromaticAberration: {
    enabled: true,
    offset: 0.005,
  },
  vignette: {
    enabled: true,
    darkness: 0.3,
    offset: 0.6,
  },
  colorGrading: {
    enabled: true,
    saturation: 1.5,
    contrast: 1.2,
    brightness: 0.1,
  },
  scanlines: {
    enabled: false,
    density: 1.5,
    opacity: 0.1,
  },
  noise: {
    enabled: false,
    opacity: 0.02,
  },
};

/**
 * All available presets - keys match the preset.name for easy lookup
 */
export const VISUAL_PRESETS: Record<string, VisualPreset> = {
  "Default": PRESET_DEFAULT,
  "Intense Neon": PRESET_INTENSE_NEON,
  "Blade Runner": PRESET_BLADE_RUNNER,
  "Retro CRT": PRESET_RETRO_CRT,
  "Hypercolor": PRESET_HYPERCOLOR,
};

export const PRESET_NAMES = Object.keys(VISUAL_PRESETS);

/**
 * Get a preset by name with fallback to default
 */
export function getPreset(name: string): VisualPreset {
  return VISUAL_PRESETS[name] ?? PRESET_DEFAULT;
}
