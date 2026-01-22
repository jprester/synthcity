import { useMemo } from "react";
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Vignette,
  Noise,
  ToneMapping,
  BrightnessContrast,
  HueSaturation,
  SMAA,
} from "@react-three/postprocessing";
import { ToneMappingMode, BlendFunction } from "postprocessing";
import { Vector2 } from "three";
import type { VisualPreset } from "./VisualPresets";
import { PRESET_DEFAULT } from "./VisualPresets";

type EnhancedEffectsProps = {
  preset?: VisualPreset;
  enabled?: boolean;
  isDay?: boolean;
};

/**
 * Enhanced post-processing effects with preset support
 */
export function EnhancedEffects({
  preset = PRESET_DEFAULT,
  enabled = true,
  isDay = false,
}: EnhancedEffectsProps) {
  // Adjust bloom intensity for day/night
  const bloomIntensity = isDay
    ? Math.max(0.35, preset.bloom.intensity * 0.05)
    : preset.bloom.intensity;

  // Create chromatic aberration offset vector
  const chromaticOffset = useMemo(
    () =>
      new Vector2(
        preset.chromaticAberration.offset,
        preset.chromaticAberration.offset,
      ),
    [preset.chromaticAberration.offset],
  );

  if (!enabled) {
    return null;
  }

  return (
    <EffectComposer multisampling={0}>
      {/* SMAA - antialiasing (better quality than FXAA) */}
      <SMAA />

      {/* Bloom - glow effect on bright areas */}
      <Bloom
        intensity={bloomIntensity}
        luminanceThreshold={preset.bloom.luminanceThreshold}
        luminanceSmoothing={preset.bloom.luminanceSmoothing}
        mipmapBlur={preset.bloom.mipmapBlur ?? false}
      />

      {/* Chromatic Aberration - color fringing at edges */}
      {preset.chromaticAberration.enabled && (
        <ChromaticAberration
          offset={chromaticOffset}
          radialModulation={true}
          modulationOffset={0.5}
        />
      )}

      {/* Color Grading - saturation, contrast, brightness */}
      {preset.colorGrading.enabled && (
        <>
          <HueSaturation
            blendFunction={BlendFunction.NORMAL}
            saturation={preset.colorGrading.saturation - 1.0}
          />
          <BrightnessContrast
            brightness={preset.colorGrading.brightness}
            contrast={preset.colorGrading.contrast - 1.0}
          />
        </>
      )}

      {/* Vignette - darkened edges */}
      {preset.vignette.enabled && (
        <Vignette
          darkness={preset.vignette.darkness}
          offset={preset.vignette.offset}
        />
      )}

      {/* Film Noise/Grain */}
      {preset.noise.enabled && (
        <Noise
          opacity={preset.noise.opacity}
          blendFunction={BlendFunction.OVERLAY}
        />
      )}

      {/* Tone Mapping - HDR to SDR conversion */}
      <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
    </EffectComposer>
  );
}
