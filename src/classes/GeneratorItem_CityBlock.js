import { Mesh } from "three";

import { GeneratorUtils } from "./GeneratorUtils.js";

class GeneratorItem_CityBlock {
  constructor(x, z, game) {
    this.x = x;
    this.z = z;
    this.game = game;

    this.utils = new GeneratorUtils(this.game);

    this.cityBlockSize = this.game.cityBlockSize;
    this.roadWidth = this.game.roadWidth;
    this.noise = this.game.cityBlockNoise;
    this.noiseFactor = this.game.cityBlockNoiseFactor;

    this.meshesCollid = [];
    this.updateables = [];
    this.visuals = [];

    // buildings

    let typeNoise = this.utils.fixNoise(
      this.noise.noise(this.x * this.noiseFactor, this.z * this.noiseFactor),
    );
    let subtypeNoise = this.utils.fixNoise(
      this.noise.noise(this.x * 5, this.z * 5),
    );

    // rare mega building
    if (typeNoise < 0.2) {
      if (
        this.x % ((this.cityBlockSize + this.roadWidth) * 6) == 0 &&
        this.z % ((this.cityBlockSize + this.roadWidth) * 6) == 0
      ) {
        let xOff = this.cityBlockSize / 2;
        let zOff = this.cityBlockSize / 2;

        // don't place too close to path of player car
        if (!(this.x + xOff < 128 && this.x + xOff > -128)) {
          let rotateNoise = this.utils.fixNoise(
            this.noise.noise((this.x + xOff) * 5, (this.z + zOff) * 5),
          );
          let rotate = this.utils.getBuildingRotation(rotateNoise);

          let scale = 0.75 + rotateNoise * 0.25;

          let type = null;
          if (subtypeNoise < 0.16) type = "mega_01";
          else if (subtypeNoise < 0.32) type = "mega_02";
          else if (subtypeNoise < 0.48) type = "mega_03";
          else if (subtypeNoise < 0.64) type = "mega_04";
          else if (subtypeNoise < 0.8) type = "mega_05";
          else type = "mega_06";

          const material = this.game.assets.getMaterial("mega_building_01");
          const colliderMesh = new Mesh(
            this.game.assets.getModel(type),
            material,
          );
          colliderMesh.position.set(this.x + xOff, 0, this.z + zOff);
          colliderMesh.scale.set(1, scale, 1);
          colliderMesh.rotateY((rotate * Math.PI) / 180);
          colliderMesh.updateMatrixWorld(true);
          this.meshesCollid.push(colliderMesh);
          this.visuals.push({
            modelKey: type,
            material: material,
            position: { x: this.x + xOff, y: 0, z: this.z + zOff },
            scale: { x: 1, y: scale, z: 1 },
            rotationY: (rotate * Math.PI) / 180,
          });
        }
      }
    }

    if (typeNoise < 0.1) {
      // nothing
    } else if (typeNoise < 0.8) {
      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {
          let xOff = i * (this.cityBlockSize / 2) + this.cityBlockSize / 4;
          let zOff = j * (this.cityBlockSize / 2) + this.cityBlockSize / 4;

          let rotateNoise = this.utils.fixNoise(
            this.noise.noise((this.x + xOff) * 5, (this.z + zOff) * 5),
          );
          let rotate = this.utils.getBuildingRotation(rotateNoise);

          let scale = 0.75 + rotateNoise * 0.45;

          let topper = false;
          let smoke = false;

          typeNoise = this.utils.fixNoise(
            this.noise.noise(
              (this.x + xOff) * this.noiseFactor,
              (this.z + zOff) * this.noiseFactor,
            ),
          ); // update to subdivided location
          subtypeNoise = this.utils.fixNoise(
            this.noise.noise((this.x + xOff) * 5, (this.z + zOff) * 5),
          );
          let type = null;
          let adsType = null;
          if (typeNoise < 0.267) {
            if (subtypeNoise < 0.33) type = "s_01_01";
            else if (subtypeNoise < 0.66) type = "s_01_02";
            else type = "s_01_03";
            adsType =
              Math.round(typeNoise * 100) % 2 == 0
                ? "ads_s_01_01"
                : "ads_s_01_02";
          } else if (typeNoise < 0.534) {
            if (subtypeNoise < 0.33) type = "s_02_01";
            else if (subtypeNoise < 0.66) type = "s_02_02";
            else type = "s_02_03";
            adsType =
              Math.round(typeNoise * 100) % 2 == 0
                ? "ads_s_02_01"
                : "ads_s_02_02";
          } else {
            if (subtypeNoise < 0.33) type = "s_03_01";
            else if (subtypeNoise < 0.66) type = "s_03_02";
            else type = "s_03_03";
            adsType =
              Math.round(typeNoise * 100) % 2 == 0
                ? "ads_s_03_01"
                : "ads_s_03_02";
            // topper
            let topperNoise = this.utils.fixNoise(
              this.noise.noise((this.x + xOff) * 6, (this.z + zOff) * 6),
            );
            topper = topperNoise > 0.998;
            // spotlight
            if (this.game.environment.spotLights) {
              if (Math.random() < 0.1 && subtypeNoise > 0.8 && !topper)
                this.updateables.push(
                  new Spotlight(
                    this.x + xOff,
                    160 * scale,
                    this.z + zOff,
                    this.game,
                  ),
                );
            }
          }

          // remove ads
          if (typeNoise > 0.33 && typeNoise < 0.66) adsType = null;

          let matNoise = this.utils.fixNoise(
            this.noise.noise((this.x + xOff) * -3, (this.z + zOff) * -3),
          );
          let mat = this.utils.getBuildingMat(matNoise);

          // topper
          if (topper && adsType != null)
            this.updateables.push(
              new Topper(this.x + xOff, 190 * scale, this.z + zOff, this.game),
            );

          // smoke
          if (Math.random() < 0.05)
            this.updateables.push(
              new Smoke(this.x + xOff, 190 * scale, this.z + zOff, this.game),
            );

          const colliderMesh = new Mesh(this.game.assets.getModel(type), mat);
          colliderMesh.position.set(this.x + xOff, 0, this.z + zOff);
          colliderMesh.scale.set(1, scale, 1);
          colliderMesh.rotateY((rotate * Math.PI) / 180);
          colliderMesh.updateMatrixWorld(true);
          this.meshesCollid.push(colliderMesh);
          this.visuals.push({
            modelKey: type,
            material: mat,
            position: { x: this.x + xOff, y: 0, z: this.z + zOff },
            scale: { x: 1, y: scale, z: 1 },
            rotationY: (rotate * Math.PI) / 180,
          });

          if (adsType != null) {
            let ad = new Advert(
              this.x + xOff,
              0,
              this.z + zOff,
              adsType,
              false,
              this.game,
            );
            ad.scale = { x: 1, y: scale, z: 1 };
            ad.rotationY = (-rotate * Math.PI) / 180;
            this.updateables.push(ad);
          }
        }
      }
    } else {
      let isTower = typeNoise > 0.975;

      var xOff = this.cityBlockSize / 2;
      var zOff = this.cityBlockSize / 2;

      let subtypeNoise = this.utils.fixNoise(
        this.noise.noise(this.x * 4, this.z * 4),
      );
      let type = null;

      if (isTower) {
        if (subtypeNoise < 0.33) type = "s_05_01";
        else if (subtypeNoise < 0.66) type = "s_05_02";
        else type = "s_05_03";
      } else {
        if (subtypeNoise < 0.33) type = "s_04_01";
        else if (subtypeNoise < 0.66) type = "s_04_02";
        else type = "s_04_03";
      }

      let matNoise = this.utils.fixNoise(
        this.noise.noise((this.x + xOff) * -3, (this.z + zOff) * -3),
      );
      let mat = this.utils.getBigBuildingMat(matNoise, subtypeNoise > 0.9);

      let rotateNoise = this.utils.fixNoise(
        this.noise.noise((this.x + xOff) * 4, (this.z + zOff) * 4),
      );
      let rotate = this.utils.getBuildingRotation(rotateNoise);

      // maybe have ads
      let adsType = null;
      let adsTypes;
      if (Math.round(rotateNoise * 100) % 2 == 0) {
        let adsNoise = this.utils.fixNoise(
          this.noise.noise((this.x + xOff) * 6, (this.z + zOff) * 6),
        );
        if (isTower) {
          adsTypes = [
            "ads_s_05_01",
            "ads_s_05_02",
            "ads_s_05_03",
            "ads_s_05_04",
          ];
        } else {
          adsTypes = [
            "ads_s_04_01",
            "ads_s_04_02",
            "ads_s_04_03",
            "ads_s_04_04",
          ];
        }
        adsType = adsTypes[Math.floor(adsNoise * adsTypes.length)];
      }

      let scale = 1 + rotateNoise * 0.5;

      const colliderMesh = new Mesh(this.game.assets.getModel(type), mat);
      colliderMesh.position.set(this.x + xOff, 0, this.z + zOff);
      colliderMesh.scale.set(1, scale, 1);
      colliderMesh.rotateY((rotate * Math.PI) / 180);
      colliderMesh.updateMatrixWorld(true);
      this.meshesCollid.push(colliderMesh);
      this.visuals.push({
        modelKey: type,
        material: mat,
        position: { x: this.x + xOff, y: 0, z: this.z + zOff },
        scale: { x: 1, y: scale, z: 1 },
        rotationY: (rotate * Math.PI) / 180,
      });

      if (adsType != null) {
        let ad = new Advert(
          this.x + xOff,
          0,
          this.z + zOff,
          adsType,
          isTower,
          this.game,
        );
        ad.scale = { x: 1, y: scale, z: 1 };
        ad.rotationY = (-rotate * Math.PI) / 180;
        this.updateables.push(ad);
      }
    }

    // ground plane
    this.visuals.push({
      modelKey: "ground",
      material: this.game.assets.getMaterial("ground"),
      position: {
        x: this.x + this.cityBlockSize / 2,
        y: 0,
        z: this.z + this.cityBlockSize / 2,
      },
      rotationX: -Math.PI / 2,
    });

    // storefronts and tramways
    if (
      x % ((this.cityBlockSize + this.roadWidth) * 2) == 0 &&
      z % ((this.cityBlockSize + this.roadWidth) * 2) == 0
    ) {
      let mats = ["storefronts", "building_02", "building_03", "building_07"];
      let mat = mats[Math.floor(subtypeNoise * mats.length)];
      if (!mat) mat = "storefronts";
      const storefrontMaterial = this.game.assets.getMaterial(mat);
      const colliderMesh = new Mesh(
        this.game.assets.getModel("storefronts"),
        storefrontMaterial,
      );
      colliderMesh.position.set(
        this.x + this.cityBlockSize + this.roadWidth / 2,
        0,
        this.z + this.cityBlockSize + this.roadWidth / 2,
      );
      colliderMesh.updateMatrixWorld(true);
      this.meshesCollid.push(colliderMesh);
      this.visuals.push({
        modelKey: "storefronts",
        material: storefrontMaterial,
        position: {
          x: this.x + this.cityBlockSize + this.roadWidth / 2,
          y: 0,
          z: this.z + this.cityBlockSize + this.roadWidth / 2,
        },
      });
    }

    // register collision meshes
    for (var i = 0; i < this.meshesCollid.length; i++) {
      this.game.collider.add(this.meshesCollid[i]);
    }
  }
  remove() {
    for (var i = 0; i < this.updateables.length; i++) {
      this.updateables[i].remove();
    }
    // remove collision meshes
    for (var i = 0; i < this.meshesCollid.length; i++) {
      this.game.collider.remove(this.meshesCollid[i].uuid);
    }
  }
  update() {
    for (var i = 0; i < this.updateables.length; i++) {
      this.updateables[i].update();
    }
  }
}

// building decorations

class Advert {
  constructor(x, y, z, geo, is_tower, game) {
    this.game = game;
    this.isVisual = true;
    this.kind = "advert";
    this.modelKey = geo;
    this.position = { x, y, z };
    this.scale = { x: 1, y: 1, z: 1 };
    this.rotationY = 0;

    if (is_tower) {
      this.adsMats = [
        "ads_large_01",
        "ads_large_02",
        "ads_large_03",
        "ads_large_04",
        "ads_large_05",
      ];
    } else {
      this.adsMats = [
        "ads_01",
        "ads_02",
        "ads_03",
        "ads_04",
        "ads_05",
        "ads_06",
        "ads_07",
        "ads_08",
      ];
    }
    this.currentMatKey =
      this.adsMats[Math.floor(Math.random() * this.adsMats.length)];

    this.interval = 200 + Math.random() * 800;
    this.counter = Math.random() * this.interval;
    this.switches = Math.random() < 0.5;
  }
  remove() {}
  update() {
    if (this.switches) {
      this.counter++;
      if (this.counter > this.interval) {
        this.counter = 0;
        this.currentMatKey =
          this.adsMats[Math.floor(Math.random() * this.adsMats.length)];
      }
    }
  }
}

class Topper {
  constructor(x, y, z, game) {
    this.game = game;
    this.isVisual = true;
    this.kind = "topper";

    let topperGeos = [
      "topper_01",
      "topper_02",
      "topper_03",
      "topper_04",
      "topper_05",
      "topper_06",
      "topper_07",
      "topper_08",
      "topper_09",
      "topper_10",
      "topper_11",
      "topper_12",
    ];

    let mats = [
      "ads_large_01",
      "ads_large_02",
      "ads_large_03",
      "ads_large_04",
      "ads_large_05",
    ];
    let matKey = mats[Math.floor(Math.random() * mats.length)];

    let geoKey = topperGeos[Math.floor(Math.random() * topperGeos.length)];
    let s = 0.8 + Math.random();
    this.modelKey = geoKey;
    this.matKey = matKey;
    this.position = { x, y, z };
    this.scale = { x: s, y: s, z: s };
    this.rotationY = 0;

    this.rdir =
      Math.random() <= 0.5 ? Math.random() * 0.01 : -Math.random() * 0.01;
  }
  remove() {}
  update() {
    this.rotationY += this.rdir;
  }
}

class Smoke {
  constructor(x, y, z, game) {
    this.game = game;
    this.isVisual = true;
    this.kind = "smoke";
    let mats = ["smoke_01", "smoke_02", "smoke_03"];
    let matKey = mats[Math.floor(Math.random() * mats.length)];
    this.modelKey = "smoke";
    this.matKey = matKey;
    this.position = { x, y, z };
    var s = 1 + Math.random() * 8;
    var sy = s * (1 + Math.random() * 0.5);
    this.scale = { x: s, y: sy, z: s };
    this.rstep = Math.random() * 7;
  }
  remove() {}
  update() {
    this.rstep += 0.0025;
  }
}

class Spotlight {
  constructor(x, y, z, game) {
    this.game = game;
    this.isVisual = true;
    this.kind = "spotlight";
    let mats = ["spotlight_01", "spotlight_02", "spotlight_03", "spotlight_04"];
    let matKey = mats[Math.floor(Math.random() * mats.length)];
    this.modelKey = "spotlight";
    this.matKey = matKey;
    this.position = { x, y, z };
    var s = 10 + Math.random() * 10;
    this.scale = { x: s, y: s, z: s };
    this.rstep = Math.random() * 7;
  }
  remove() {}
  update() {
    this.rstep += 0.01;
  }
}

export { GeneratorItem_CityBlock };
