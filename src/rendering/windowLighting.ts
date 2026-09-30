import type { MeshPhongMaterial } from 'three';

// The pool packs a facade's brightness into three.js's native instanceColor
// buffer. Only emission uses it: the dark wall's diffuse colour stays intact.
export function installWindowLighting(material: MeshPhongMaterial): void {
  material.onBeforeCompile = (shader) => {
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nvarying float vWindowBrightness;')
      .replace(
        '#include <begin_vertex>',
        `#include <begin_vertex>
        vWindowBrightness = 1.0;
        #ifdef USE_INSTANCING_COLOR
          vWindowBrightness = instanceColor.r;
        #endif`,
      );
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', '#include <common>\nvarying float vWindowBrightness;')
      .replace('#include <color_fragment>', '')
      .replace(
        '#include <emissivemap_fragment>',
        '#include <emissivemap_fragment>\ntotalEmissiveRadiance *= vWindowBrightness;',
      );
  };
  material.customProgramCacheKey = () => 'window-brightness-v1';
  material.needsUpdate = true;
}
