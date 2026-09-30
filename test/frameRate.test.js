// Motion must not depend on the display refresh rate. Simulate the same
// wall-clock time at different rates and compare where things end up.
import { describe, it, expect, beforeAll } from 'vitest';
import { BufferGeometry, MeshBasicMaterial, Vector3 } from 'three';
import { frameScale, decay, ease } from '../src/classes/frameRate.js';
import { PlayerCar } from '../src/classes/PlayerCar.js';
import { Player } from '../src/classes/Player.js';
import { GeneratorItem_Traffic } from '../src/classes/GeneratorItem_Traffic.js';
import { Perlin } from '../src/lib/perlin.js';
import { makeWorld } from './helpers.js';

beforeAll(() => {
  globalThis.window ??= { innerWidth: 1920, innerHeight: 1080 };
});

const idleController = () => ({
  mouse_move_x: 0,
  mouse_move_y: 0,
  get_mouse_wheel: () => 0,
});

const assets = {
  getModel: () => new BufferGeometry(),
  getMaterial: () => new MeshBasicMaterial(),
};

// run update(k) for `seconds` at `hz`
function simulate(update, hz, seconds) {
  const k = frameScale(1 / hz);
  for (let i = 0; i < Math.round(seconds * hz); i++) update(k);
}

describe('frameScale', () => {
  it('is exactly 1 at 60 Hz, including float noise and the first frame', () => {
    expect(frameScale(1 / 60)).toBe(1);
    expect(frameScale((1000 / 60 + 1e-10) / 1000)).toBe(1);
    expect(frameScale(null)).toBe(1);
  });

  it('scales with frame time and caps long frames', () => {
    expect(frameScale(1 / 144)).toBeCloseTo(60 / 144, 12);
    expect(frameScale(1)).toBe(4);
  });

  it('reduces to the per-frame maths at k = 1', () => {
    expect(decay(0.965, 1)).toBe(0.965);
    expect(ease(0.1, 1)).toBe(0.1);
    expect(ease(0.15, 1)).toBe(0.15);
  });

  it('composes: two half frames equal one frame', () => {
    expect(decay(0.965, 0.5) ** 2).toBeCloseTo(0.965, 12);
    const half = ease(0.1, 0.5);
    expect(1 - (1 - half) ** 2).toBeCloseTo(0.1, 12);
  });
});

describe('frame-rate independence', () => {
  function flyCar(hz) {
    const car = new PlayerCar({
      scene: { add() {} },
      renderer: null,
      controller: { ...idleController(), key_shift: false, key_up: true },
      assets,
      collider: { intersectsSphere: () => false },
      windshieldShader: 'simple',
      x: -12,
      z: 0,
      respawnX: -12,
    });
    car.noise_shake = new Perlin(1);
    car.noise_shake.noiseDetail(8, 0.5);
    car.car_dir_to = 1; // make it steer
    simulate((k) => car.update(k), hz, 5);
    return { position: car.body.position.clone(), dir: car.car_dir };
  }

  it('the car ends up in the same place at 30, 60 and 144 Hz', () => {
    const at60 = flyCar(60);
    const travelled = at60.position.distanceTo(new Vector3(-12, 250, 0));
    expect(travelled).toBeGreaterThan(100);
    for (const hz of [30, 144]) {
      const other = flyCar(hz);
      // within 2% of the distance travelled
      expect(other.position.distanceTo(at60.position)).toBeLessThan(travelled * 0.02);
      expect(other.dir).toBeCloseTo(at60.dir, 1);
    }
  });

  it('freeroam flight ends up in the same place at 60 and 144 Hz', () => {
    const fly = (hz) => {
      const player = new Player({
        scene: {},
        renderer: null,
        controller: { ...idleController(), key_up: true, key_r: true },
        x: 0,
        z: 0,
      });
      simulate((k) => player.update(k), hz, 3);
      return player.body.position.clone();
    };
    const at60 = fly(60);
    const travelled = at60.length();
    expect(fly(144).distanceTo(at60)).toBeLessThan(travelled * 0.02);
  });

  it('traffic moves at the same speed at 60 and 144 Hz', () => {
    const drive = (hz) => {
      const world = makeWorld();
      world.player.body.position.set(0, 0, 0);
      const cell = new GeneratorItem_Traffic(152 * 2, 152 * 3, world);
      simulate((k) => cell.update(k), hz, 5);
      return cell.cars.map((c) => [c.x, c.z]);
    };
    const at60 = drive(60);
    const at144 = drive(144);
    expect(at60.length).toBeGreaterThan(0);
    at60.forEach(([x, z], i) => {
      expect(at144[i][0]).toBeCloseTo(x, 6);
      expect(at144[i][1]).toBeCloseTo(z, 6);
    });
  });
});
