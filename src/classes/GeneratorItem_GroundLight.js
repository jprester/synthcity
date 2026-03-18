import { GeneratorUtils } from "./GeneratorUtils.js";

class GeneratorItem_GroundLight {
  constructor(x, z, game) {
    this.x = x;
    this.z = z;
    this.game = game;

    this.utils = new GeneratorUtils(this.game);

    this.groundLights = this.game.groundLights;
    this.noise = this.game.cityBlockNoise;
    this.noiseFactor = this.game.cityBlockNoiseFactor;

    this.lightIndex = null;

    let typeNoise = this.utils.fixNoise(
      this.noise.noise(this.x * this.noiseFactor * 2, this.z * this.noiseFactor * 2),
    );

    // Only place ground lights at rare locations (roughly 1 in 5 cells)
    if (typeNoise > 0.6 && typeNoise < 0.8) {
      for (var i = 0; i < this.groundLights.length; i++) {
        if (this.groundLights[i].free) {
          // Use a different noise sample for color
          let colorNoise = this.utils.fixNoise(
            this.noise.noise(this.x * 3, this.z * 3),
          );

          // Cyberpunk palette: magentas, cyans, warm ambers
          let hue;
          if (colorNoise < 0.3) {
            hue = 0.83 + colorNoise * 0.1; // magenta/pink (300-330 deg)
          } else if (colorNoise < 0.6) {
            hue = 0.5 + (colorNoise - 0.3) * 0.15; // cyan/teal (180-210 deg)
          } else {
            hue = 0.08 + (colorNoise - 0.6) * 0.1; // warm amber (30-65 deg)
          }

          this.groundLights[i].position = { x: this.x, y: 5, z: this.z };
          this.groundLights[i].color = { h: hue, s: 1, l: 0.55 };
          this.groundLights[i].free = false;
          this.lightIndex = i;
          i = this.groundLights.length;
        }
      }
    }
  }
  remove() {
    if (this.lightIndex !== null) {
      this.groundLights[this.lightIndex].free = true;
    }
  }
  update() {}
}

export { GeneratorItem_GroundLight };
