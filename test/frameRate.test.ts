// Motion must not depend on the display refresh rate. Simulate the same
// wall-clock time at different rates and compare where things end up.
import { describe, it, expect, beforeAll } from 'vitest';
import { BufferGeometry, MeshBasicMaterial, Vector3 } from 'three';
import type { Audio } from 'three';
import { frameScale, decay, ease, paceFrame } from '../src/classes/frameRate.ts';
import { PlayerCar } from '../src/classes/PlayerCar.ts';
import { Player } from '../src/classes/Player.ts';
import { GeneratorItem_Traffic } from '../src/classes/GeneratorItem_Traffic.ts';
import { Perlin } from '../src/lib/perlin.js';
import { makeWorld, fakeController } from './helpers.ts';

beforeAll(() => {
  // the players size their cameras from the window
  (globalThis as { window?: unknown }).window ??= { innerWidth: 1920, innerHeight: 1080 };
});

const scene = { add() {}, remove() {} };

const assets = {
  getModel: () => new BufferGeometry(),
  getMaterial: () => new MeshBasicMaterial(),
};

// run update(k) for `seconds` at `hz`
function simulate(update: (k: number) => void, hz: number, seconds: number): void {
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
  it('holds an aerial start above the tallest buildings without negative ambient volume', () => {
    const player = new Player({ scene, controller: fakeController(), x: 0, z: 0 });
    const volumes: number[] = [];
    player.soundCityAmbient = { setVolume: (v: number) => volumes.push(v) } as unknown as Audio;
    player.body.position.y = 1400;
    simulate((k) => player.update(k), 60, 2);
    expect(player.camera.position.y).toBe(1400);
    expect(volumes.every((v) => v === 0)).toBe(true);
  });

  function flyCar(hz: number) {
    const car = new PlayerCar({
      scene,
      controller: fakeController({ key_up: true }),
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
    simulate((k: number) => car.update(k), hz, 5);
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
    const fly = (hz: number) => {
      const player = new Player({
        scene,
        controller: fakeController({ key_up: true, key_r: true }),
        x: 0,
        z: 0,
      });
      simulate((k: number) => player.update(k), hz, 3);
      return player.body.position.clone();
    };
    const at60 = fly(60);
    const travelled = at60.length();
    expect(fly(144).distanceTo(at60)).toBeLessThan(travelled * 0.02);
  });

  it('traffic moves at the same speed at 60 and 144 Hz', () => {
    const drive = (hz: number) => {
      const world = makeWorld();
      world.player.body.position.set(0, 0, 0);
      const cell = new GeneratorItem_Traffic(152 * 2, 152 * 3, world);
      simulate((k: number) => cell.update(k), hz, 5);
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

describe('crash and respawn', () => {
  it.each([60, 144])('respawns 2 s after a crash at %i Hz and reports both to the UI', (hz) => {
    let hit = true;
    const events: boolean[] = [];
    const car = new PlayerCar({
      scene,
      controller: fakeController(),
      assets,
      collider: { intersectsSphere: () => hit },
      windshieldShader: 'simple',
      x: 500,
      z: 500,
      respawnX: -12,
      onCrash: (crashed) => events.push(crashed),
    });
    const k = frameScale(1 / hz);
    car.update(k);
    hit = false;
    expect(car.crashed).toBe(true);
    expect(events).toEqual([true]);

    simulate((k: number) => car.update(k), hz, 1.9);
    expect(car.crashed).toBe(true);
    simulate((k: number) => car.update(k), hz, 0.2);
    expect(car.crashed).toBe(false);
    expect(events).toEqual([true, false]);
    expect(car.body.position.x).toBeCloseTo(-12, 0);
  });
});

describe('paceFrame', () => {
  // display frames at hz for one second; how many render under the cap
  function rendered(hz: number, maxFps: number, jitter = 0) {
    let clock: number | null = null;
    let count = 0;
    for (let i = 0; i < hz; i++) {
      const now = 1000 + (i * 1000) / hz + (i % 2 ? jitter : -jitter);
      const pace = paceFrame(now, clock, maxFps);
      clock = pace.clock;
      if (pace.render) count++;
    }
    return count;
  }

  it('renders every frame of a display at or below the cap', () => {
    expect(rendered(60, 60)).toBe(60);
    expect(rendered(60, 60, 0.4)).toBe(60);
    expect(rendered(30, 60)).toBe(30);
  });

  it('holds faster displays to the cap on average', () => {
    for (const hz of [90, 100, 120, 144, 165, 240]) {
      expect(Math.abs(rendered(hz, 60) - 60), `${hz} Hz`).toBeLessThanOrEqual(1);
      expect(Math.abs(rendered(hz, 60, 0.4) - 60), `${hz} Hz with jitter`).toBeLessThanOrEqual(1);
    }
    expect(rendered(120, 30)).toBe(30);
  });

  it('renders every frame without a cap', () => {
    expect(rendered(144, 0)).toBe(144);
  });
});
