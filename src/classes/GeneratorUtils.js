import { clamp, mapRange } from "../utils";
import { pickFromNoise, getRotationFromNoise } from "../utils";

class GeneratorUtils {
  constructor(game) {
    this.game = game;
  }

  getBuildingMat(noise) {
    const mats = [
      "building_01",
      "building_02",
      "building_03",
      "building_04",
      "building_05",
      "building_07",
    ];
    return this.game.assets.getMaterial(pickFromNoise(mats, noise));
  }

  getBigBuildingMat(noise, rare) {
    const mats = [
      "building_01",
      "building_02",
      "building_03",
      "building_04",
      "building_05",
    ];
    const matsRare = [
      "building_06",
      "building_08",
      "building_09",
      "building_10",
    ];
    const list = rare ? matsRare : mats;
    return this.game.assets.getMaterial(pickFromNoise(list, noise));
  }

  getBuildingRotation(noise) {
    return getRotationFromNoise(noise);
  }

  // greatly improves proc-noise distribution
  fixNoise(noise) {
    const inMin = 0.2;
    const inMax = 0.75;
    const outMin = 0;
    const outMax = 0.9999;
    const mapped = mapRange(noise, inMin, inMax, outMin, outMax);
    return clamp(mapped, outMin, outMax);
  }
}

export { GeneratorUtils };
