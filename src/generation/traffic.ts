// Pure generation of the flying cars spawned by one traffic cell. Motion is
// simulated by GeneratorItem_Traffic; this only returns the starting state.

import { hashRandom } from '../hash.ts';
import type { Random, Seed } from '../hash.ts';
import { ROAD_WIDTH, pick } from './world.ts';

const CAR_MODELS = ['car_01', 'car_02', 'car_03', 'car_04', 'car_05', 'car_06', 'car_07', 'car_08'];
const SPEED = 1.2;

export interface CarSpawn {
  dir: 0 | 1 | 2 | 3; // 0 east, 1 west, 2 north, 3 south
  model: string;
  spawnX: number;
  spawnZ: number;
  x: number; // starting position along the lane
  z: number;
  meshZOffset: number; // initial mesh offset along z (until the first update)
  rotation: number | null; // radians, applied with rotateY; null for none
  vx: number; // velocity per 60 Hz frame
  vz: number;
  alt: number; // lane altitude
  altOffset: number; // altitude band on top of the lane
  speedFactor: number;
  reverseDistance: number; // distance from the player at which the car turns around
}

export function generateTrafficCell({ seed, x, z }: { seed: Seed; x: number; z: number }): CarSpawn[] {
  // one stream per cell: car counts per lane, then each car's parameters
  const random = hashRandom(seed, x, z, 'traffic');
  const cars: CarSpawn[] = [];
  for (let dir = 0 as CarSpawn['dir']; dir < 3; dir++) {
    // the count is re-rolled every iteration, as in the original (0.89 cars on average)
    for (let k = 0; k < Math.floor(random() * 3); k++) {
      cars.push(car(dir, x - ROAD_WIDTH / 2, z - ROAD_WIDTH / 2, random));
    }
  }
  return cars;
}

function car(dir: CarSpawn['dir'], spawnX: number, spawnZ: number, random: Random): CarSpawn {
  const c: CarSpawn = {
    dir, // 0 east, 1 west, 2 north, 3 south
    model: pick(CAR_MODELS, random()),
    spawnX,
    spawnZ,
    x: spawnX,
    z: spawnZ,
    meshZOffset: 0,
    rotation: null,
    vx: 0,
    vz: 0,
    alt: 0,
    altOffset: 0,
    speedFactor: 1,
    reverseDistance: 0,
  };

  if (dir == 0) {
    c.vx = SPEED;
    c.alt = 20;
    c.rotation = Math.PI / 2;
    c.x -= Math.floor(random() * 20) * 4;
  }
  if (dir == 1) {
    c.vx = -SPEED;
    c.alt = 60;
    c.rotation = -Math.PI / 2;
    c.x -= Math.floor(random() * 20) * 4;
  }
  if (dir == 2) {
    c.vz = -SPEED;
    c.alt = 40;
    c.rotation = Math.PI;
    c.meshZOffset = -random() * 2;
    c.z -= Math.floor(random() * 20) * 4;
  }
  if (dir == 3) {
    c.vz = SPEED;
    c.alt = 80;
    c.meshZOffset = -random() * 2;
    c.z -= Math.floor(random() * 20) * 4;
  }

  // adjust alt
  if (random() < 0.5) c.altOffset = 200;
  if (random() < 0.2) {
    c.altOffset = 400;
    c.speedFactor = 2;
  }

  // distance from the player at which the car turns around
  c.reverseDistance = 1000 + random() * 500;
  return c;
}
