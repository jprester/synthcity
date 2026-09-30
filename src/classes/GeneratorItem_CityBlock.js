import { Mesh } from 'three';

import { GeneratorUtils } from './GeneratorUtils.js';
import { hashFloat, hashRandom } from '../hash.js';

class GeneratorItem_CityBlock {
  constructor(x, z) {
    this.x = x;
    this.z = z;

    this.utils = new GeneratorUtils();

    this.cityBlockSize = window.game.cityBlockSize;
    this.roadWidth = window.game.roadWidth;
    this.noise = window.game.cityBlockNoise;
    this.noiseFactor = window.game.cityBlockNoiseFactor;
    this.seed = window.game.settings.worldSeed;

    this.meshes = []; // no collision
    this.meshesCollid = [];
    this.updateables = [];

    // buildings
    //
    // Perlin noise only decides the district (typeNoise, low frequency). Every
    // per-lot choice (variant, rotation, height, material, extras) is an
    // independent hash of (seed, lot position, purpose).

    let typeNoise = this.utils.fixNoise(
      this.noise.noise(this.x * this.noiseFactor, this.z * this.noiseFactor),
    );

    // rare mega building
    if (typeNoise < 0.2) {
      if (
        this.x % ((this.cityBlockSize + this.roadWidth) * 6) == 0 &&
        this.z % ((this.cityBlockSize + this.roadWidth) * 6) == 0
      ) {
        let xOff = this.cityBlockSize / 2;
        let zOff = this.cityBlockSize / 2;
        let lotX = this.x + xOff;
        let lotZ = this.z + zOff;

        // don't place too close to path of player car
        if (!(lotX < 128 && lotX > -128)) {
          let rotate = this.utils.getBuildingRotation(hashFloat(this.seed, lotX, lotZ, 'mega-rotation'));
          let scale = 0.75 + hashFloat(this.seed, lotX, lotZ, 'mega-height') * 0.25;
          let types = ['mega_01', 'mega_02', 'mega_03', 'mega_04', 'mega_05', 'mega_06'];
          let type = types[Math.floor(hashFloat(this.seed, lotX, lotZ, 'mega-variant') * types.length)];

          let mesh = new Mesh(
            window.game.assets.getModel(type),
            window.game.assets.getMaterial('mega_building_01'),
          );
          mesh.position.set(lotX, 0, lotZ);
          mesh.scale.set(1, scale, 1);
          mesh.rotateY((rotate * Math.PI) / 180);
          this.meshesCollid.push(mesh);
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
          let lotX = this.x + xOff;
          let lotZ = this.z + zOff;

          let rotate = this.utils.getBuildingRotation(hashFloat(this.seed, lotX, lotZ, 'rotation'));
          let scale = 0.75 + hashFloat(this.seed, lotX, lotZ, 'height') * 0.45;
          let variant = Math.floor(hashFloat(this.seed, lotX, lotZ, 'variant') * 3) + 1; // 1..3
          let adsVariant = hashFloat(this.seed, lotX, lotZ, 'ads-variant') < 0.5 ? 1 : 2;

          let topper = false;

          typeNoise = this.utils.fixNoise(this.noise.noise(lotX * this.noiseFactor, lotZ * this.noiseFactor)); // update to subdivided location
          let group;
          if (typeNoise < 0.267) group = 1;
          else if (typeNoise < 0.534) group = 2;
          else group = 3;
          let type = 's_0' + group + '_0' + variant;
          let adsType = 'ads_s_0' + group + '_0' + adsVariant;

          if (group == 3) {
            // topper (the old noise threshold hit about 6% of these lots)
            topper = hashFloat(this.seed, lotX, lotZ, 'topper') < 0.06;
            // spotlight: sized for the s_03_03 roof
            if (window.game.environment.spotLights) {
              if (variant == 3 && hashFloat(this.seed, lotX, lotZ, 'spotlight') < 0.05 && !topper)
                this.updateables.push(
                  new Spotlight(lotX, 160 * scale, lotZ, hashRandom(this.seed, lotX, lotZ, 'spotlight-look')),
                );
            }
          }

          // remove ads
          if (typeNoise > 0.33 && typeNoise < 0.66) adsType = null;

          let mat = this.utils.getBuildingMat(hashFloat(this.seed, lotX, lotZ, 'material'));

          // topper
          if (topper && adsType != null)
            this.updateables.push(
              new Topper(lotX, 190 * scale, lotZ, hashRandom(this.seed, lotX, lotZ, 'topper-look')),
            );

          // smoke
          if (hashFloat(this.seed, lotX, lotZ, 'smoke') < 0.05)
            this.updateables.push(
              new Smoke(lotX, 190 * scale, lotZ, hashRandom(this.seed, lotX, lotZ, 'smoke-look')),
            );

          let mesh = new Mesh(window.game.assets.getModel(type), mat);
          mesh.position.set(lotX, 0, lotZ);
          mesh.scale.set(1, scale, 1);
          mesh.rotateY((rotate * Math.PI) / 180);
          this.meshesCollid.push(mesh);

          if (adsType != null) {
            let ad = new Advert(
              lotX,
              0,
              lotZ,
              window.game.assets.getModel(adsType),
              false,
              hashRandom(this.seed, lotX, lotZ, 'advert'),
              hashRandom(this.seed, lotX, lotZ, 'advert-switch'),
            );
            ad.mesh.scale.set(1, scale, 1);
            ad.mesh.rotateY((-rotate * Math.PI) / 180);
            this.updateables.push(ad);
          }
        }
      }
    } else {
      let isTower = typeNoise > 0.975;

      let lotX = this.x + this.cityBlockSize / 2;
      let lotZ = this.z + this.cityBlockSize / 2;

      let variant = Math.floor(hashFloat(this.seed, lotX, lotZ, 'variant') * 3) + 1; // 1..3
      let type = (isTower ? 's_05_0' : 's_04_0') + variant;

      let rare = hashFloat(this.seed, lotX, lotZ, 'rare-material') < 0.1;
      let mat = this.utils.getBigBuildingMat(hashFloat(this.seed, lotX, lotZ, 'material'), rare);

      let rotate = this.utils.getBuildingRotation(hashFloat(this.seed, lotX, lotZ, 'rotation'));
      let scale = 1 + hashFloat(this.seed, lotX, lotZ, 'height') * 0.5;

      // maybe have ads (the old parity test came out true for about 55%)
      let adsType = null;
      if (hashFloat(this.seed, lotX, lotZ, 'ads') < 0.55) {
        let adsTypes;
        if (isTower) {
          adsTypes = ['ads_s_05_01', 'ads_s_05_02', 'ads_s_05_03', 'ads_s_05_04'];
        } else {
          adsTypes = ['ads_s_04_01', 'ads_s_04_02', 'ads_s_04_03', 'ads_s_04_04'];
        }
        adsType = adsTypes[Math.floor(hashFloat(this.seed, lotX, lotZ, 'ads-variant') * adsTypes.length)];
      }

      let mesh = new Mesh(window.game.assets.getModel(type), mat);
      mesh.position.set(lotX, 0, lotZ);
      mesh.scale.set(1, scale, 1);
      mesh.rotateY((rotate * Math.PI) / 180);
      this.meshesCollid.push(mesh);

      if (adsType != null) {
        let ad = new Advert(
          lotX,
          0,
          lotZ,
          window.game.assets.getModel(adsType),
          isTower,
          hashRandom(this.seed, lotX, lotZ, 'advert'),
          hashRandom(this.seed, lotX, lotZ, 'advert-switch'),
        );
        ad.mesh.scale.set(1, scale, 1);
        ad.mesh.rotateY((-rotate * Math.PI) / 180);
        this.updateables.push(ad);
      }
    }

    // ground plane
    let groundMesh = new Mesh(
      window.game.assets.getModel('ground'),
      window.game.assets.getMaterial('ground'),
    );
    groundMesh.rotateX(-Math.PI / 2);
    groundMesh.position.set(this.x + this.cityBlockSize / 2, 0, this.z + this.cityBlockSize / 2);
    this.meshes.push(groundMesh);

    // storefronts and tramways
    if (
      x % ((this.cityBlockSize + this.roadWidth) * 2) == 0 &&
      z % ((this.cityBlockSize + this.roadWidth) * 2) == 0
    ) {
      let mats = ['storefronts', 'building_02', 'building_03', 'building_07'];
      let mat = mats[Math.floor(hashFloat(this.seed, this.x, this.z, 'storefront') * mats.length)];
      var mesh = new Mesh(window.game.assets.getModel('storefronts'), window.game.assets.getMaterial(mat));
      mesh.position.set(
        this.x + this.cityBlockSize + this.roadWidth / 2,
        0,
        this.z + this.cityBlockSize + this.roadWidth / 2,
      );
      this.meshesCollid.push(mesh);
    }

    // add meshes to scene
    for (let i = 0; i < this.meshes.length; i++) {
      window.game.scene.add(this.meshes[i]);
    }
    // add collision meshes to scene and collider
    for (let i = 0; i < this.meshesCollid.length; i++) {
      window.game.scene.add(this.meshesCollid[i]);
      window.game.collider.add(this.meshesCollid[i]);
    }
  }
  remove() {
    // remove meshes
    for (let i = 0; i < this.meshes.length; i++) {
      window.game.scene.remove(this.meshes[i]);
    }
    for (let i = 0; i < this.updateables.length; i++) {
      this.updateables[i].remove();
    }
    // remove collision meshes
    for (let i = 0; i < this.meshesCollid.length; i++) {
      window.game.collider.remove(this.meshesCollid[i].uuid);
      window.game.scene.remove(this.meshesCollid[i]);
    }
  }
  update() {
    for (let i = 0; i < this.updateables.length; i++) {
      this.updateables[i].update();
    }
  }
}

// building decorations

class Advert {
  // random: seeded stream for the initial state; switchRandom: for the switches
  constructor(x, y, z, geo, is_tower, random, switchRandom) {
    this.switchRandom = switchRandom;
    if (is_tower) {
      this.adsMats = ['ads_large_01', 'ads_large_02', 'ads_large_03', 'ads_large_04', 'ads_large_05'];
    } else {
      this.adsMats = ['ads_01', 'ads_02', 'ads_03', 'ads_04', 'ads_05'];
    }
    let mat = window.game.assets.getMaterial(this.adsMats[Math.floor(random() * this.adsMats.length)]);

    this.mesh = new Mesh(geo, mat);
    this.mesh.position.set(x, y, z);
    window.game.scene.add(this.mesh);

    this.interval = 200 + random() * 800;
    this.counter = random() * this.interval;
    this.switches = random() < 0.5;
  }
  remove() {
    window.game.scene.remove(this.mesh);
  }
  update() {
    if (this.switches) {
      this.counter++;
      if (this.counter > this.interval) {
        this.counter = 0;
        this.mesh.material = window.game.assets.getMaterial(
          this.adsMats[Math.floor(this.switchRandom() * this.adsMats.length)],
        );
      }
    }
  }
}

class Topper {
  constructor(x, y, z, random) {
    let topperGeos = [
      'topper_01',
      'topper_02',
      'topper_03',
      'topper_04',
      'topper_05',
      'topper_06',
      'topper_07',
      'topper_08',
      'topper_09',
      'topper_10',
      'topper_11',
      'topper_12',
    ];

    let mats = ['ads_large_01', 'ads_large_02', 'ads_large_03', 'ads_large_04', 'ads_large_05'];
    let mat = window.game.assets.getMaterial(mats[Math.floor(random() * mats.length)]);

    let geo = window.game.assets.getModel(topperGeos[Math.floor(random() * topperGeos.length)]);

    this.mesh = new Mesh(geo, mat);
    this.mesh.position.set(x, y, z);
    let s = 0.8 + random();
    this.mesh.scale.set(s, s, s);
    window.game.scene.add(this.mesh);

    this.rdir = random() <= 0.5 ? random() * 0.01 : -random() * 0.01;
  }
  remove() {
    window.game.scene.remove(this.mesh);
  }
  update() {
    this.mesh.rotation.y = this.mesh.rotation.y + this.rdir;
  }
}

class Smoke {
  constructor(x, y, z, random) {
    let mats = ['smoke_01', 'smoke_02', 'smoke_03'];
    let mat = window.game.assets.getMaterial(mats[Math.floor(random() * mats.length)]);
    this.mesh = new Mesh(window.game.assets.getModel('smoke'), mat);
    this.mesh.position.set(x, y, z);
    var s = 1 + random() * 8;
    var sy = s * (1 + random() * 0.5);
    this.mesh.scale.set(s, sy, s);
    window.game.scene.add(this.mesh);
    this.rstep = random() * 7;
  }
  remove() {
    window.game.scene.remove(this.mesh);
  }
  update() {
    this.rstep += 0.0025;
    this.mesh.lookAt(window.game.player.camera.position);
    this.mesh.rotation.x += Math.cos(this.rstep) * 0.25;
  }
}

class Spotlight {
  constructor(x, y, z, random) {
    let mats = ['spotlight_01', 'spotlight_02', 'spotlight_03', 'spotlight_04'];
    let mat = window.game.assets.getMaterial(mats[Math.floor(random() * mats.length)]);
    this.mesh = new Mesh(window.game.assets.getModel('spotlight'), mat);
    this.mesh.position.set(x, y, z);
    var s = 10 + random() * 10;
    this.mesh.scale.set(s, s, s);
    window.game.scene.add(this.mesh);
    this.rstep = random() * 7;
  }
  remove() {
    window.game.scene.remove(this.mesh);
  }
  update() {
    this.rstep += 0.01;
    this.mesh.lookAt(window.game.player.camera.position);
    this.mesh.rotation.x += Math.cos(this.rstep) * 0.4;
  }
}

export { GeneratorItem_CityBlock };
