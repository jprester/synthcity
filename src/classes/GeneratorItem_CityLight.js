import { cityLightHue } from '../generation/cityLight.js';

// Assigns a pooled PointLight to a district edge cell.
//
// context: { seed, noise, cityLights }
class GeneratorItem_CityLight {
  constructor(x, z, context) {
    this.x = x;
    this.z = z;

    this.cityLights = context.cityLights;
    this.lightIndex = null;

    const hue = cityLightHue({ seed: context.seed, noise: context.noise, x, z });
    if (hue === null) return;

    const i = this.cityLights.findIndex((l) => l.free);
    if (i == -1) return;
    this.cityLights[i].light.position.set(this.x, 100, this.z);
    this.cityLights[i].light.color.setHSL(hue, 1, 0.5);
    this.cityLights[i].free = false;
    this.lightIndex = i;
  }
  remove() {
    if (this.lightIndex !== null) {
      this.cityLights[this.lightIndex].free = true;
    }
  }
  update() {}
}

export { GeneratorItem_CityLight };
