import { cityLightHue } from '../generation/cityLight.ts';
import type { GeneratorItem } from './Generator.ts';
import type { CityLight, WorldContext } from './WorldContext.ts';

// Assigns a pooled PointLight to a district edge cell.
class GeneratorItem_CityLight implements GeneratorItem {
  x: number;
  z: number;
  cityLights: CityLight[];
  lightIndex: number | null;

  constructor(x: number, z: number, context: WorldContext) {
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
  remove(): void {
    if (this.lightIndex !== null) {
      this.cityLights[this.lightIndex].free = true;
    }
  }
  update(): void {}
}

export { GeneratorItem_CityLight };
