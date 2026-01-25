import { clamp, mapRange } from "../utils";
import { pickFromNoise, getRotationFromNoise } from "../utils";

class GeneratorUtils {
  constructor(game) {
    this.game = game;
  }

  getBuildingMatKey(noise) {
    const mats = [
      "building_01",
      "building_02",
      "building_03",
      "building_04",
      "building_05",
    ];
    return pickFromNoise(mats, noise);
  }

  getBuildingMat(noise) {
    return this.game.assets.getMaterial(this.getBuildingMatKey(noise));
  }

  getBigBuildingMatKey(noise, rare) {
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
    return pickFromNoise(list, noise);
  }

  getBigBuildingMat(noise, rare) {
    return this.game.assets.getMaterial(this.getBigBuildingMatKey(noise, rare));
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
