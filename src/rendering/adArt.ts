// Ad art: the two atlases (built by scripts/assets/build_ad_atlases.py) and how
// wall signs (src/generation/signs.ts) are drawn from them.
//
// Every sign is one instance of a unit quad in the InstancePool. Its art's
// rectangle in the atlas is per-instance data (INSTANCE_DATA); the sign
// material's shader maps the quad's UVs into that rectangle.

import type { Material } from 'three';
import { INSTANCE_DATA } from '../classes/InstancePool.ts';
import atlasData from '../assets/adAtlases.json';
import type { SignAtlas } from '../generation/signs.ts';

export interface AdArt {
  id: string;
  kind: string; // 'neon' | 'ad' | 'design'
  aspect: number; // width / height
  uv: [number, number, number, number]; // u0, v0, u1, v1 in the atlas
  brightness: number; // how bright it reads (see the build script)
  gain: number; // emission multiplier that evens out brightness across all art
}

export interface AdAtlas {
  file: string;
  size: number;
  entries: AdArt[];
}

export const AD_ATLASES = atlasData as unknown as Record<SignAtlas, AdAtlas>;

// material and quad model per atlas (AssetManager). Each atlas has its own quad
// geometry because the pool keeps per-instance data on the geometry.
export const AD_MATERIALS: Record<SignAtlas, string> = { neon: 'ads_neon', posters: 'ads_posters' };
export const SIGN_MODELS: Record<SignAtlas, string> = { neon: 'sign_neon', posters: 'sign_posters' };

// Makes a material with an emissive map sample each instance's art rectangle,
// scaled by the instance's brightness (the art's gain, InstancePool brightness).
export function useInstanceArt(material: Material): void {
  material.onBeforeCompile = (shader) => {
    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <emissivemap_fragment>',
      `#include <emissivemap_fragment>
      #ifdef USE_COLOR
        totalEmissiveRadiance *= vColor.r;
      #endif`,
    );
    shader.vertexShader = `attribute vec4 ${INSTANCE_DATA};\n` + shader.vertexShader;
    shader.vertexShader = shader.vertexShader.replace(
      '#include <uv_vertex>',
      `#include <uv_vertex>
      #ifdef USE_EMISSIVEMAP
        vEmissiveMapUv = ${INSTANCE_DATA}.xy + uv * (${INSTANCE_DATA}.zw - ${INSTANCE_DATA}.xy);
      #endif`,
    );
  };
  // share one program between the sign materials
  material.customProgramCacheKey = () => 'instance-art';
}
