import { describe, it, expect, vi } from 'vitest';
import { BoxGeometry, PerspectiveCamera, Vector3 } from 'three';
import { MeshBVH } from 'three-mesh-bvh';
import { windowBrightness, rooftopDetails } from '../src/generation/buildingDetails.ts';
import type { BuildingObject } from '../src/generation/cityBlock.ts';
import { hazeWeather, HAZE_CELL_SIZE } from '../src/generation/atmosphere.ts';
import { createDistrictNoise, CELL_SIZE } from '../src/generation/world.ts';
import { findRoofSurface, RooftopKit } from '../src/classes/RooftopKit.ts';
import { GeneratorItem_CityBlock } from '../src/classes/GeneratorItem_CityBlock.ts';
import { HeightFogPass } from '../src/rendering/HeightFogPass.ts';
import { Collider } from '../src/classes/Collider.ts';
import { makeWorld } from './helpers.ts';

describe('procedural visual details', () => {
  it('preserves mixed and creates mostly quiet facades with occasional bright ones', () => {
    const random = vi.spyOn(Math, 'random').mockImplementation(() => {
      throw new Error('world randomness');
    });
    try {
      const levels = Array.from({ length: 1000 }, (_, i) =>
        windowBrightness(9746, i * CELL_SIZE, 0, 'downtown'),
      );
      expect(levels.filter((v) => v < 0.8).length).toBeGreaterThan(850);
      expect(levels.filter((v) => v === 0.95).length).toBeGreaterThan(50);
      expect(windowBrightness(9746, 0, 0, 'mixed')).toBe(1);
      expect(windowBrightness('9746', 0, 0, 'downtown')).toBe(windowBrightness(9746, 0, 0, 'downtown'));
      expect(hazeWeather(9746, 0, 0, 'mixed')).toEqual([0, 0]);
      expect(hazeWeather(9746, 608, -608, 'downtown')).toEqual(hazeWeather('9746', 608, -608, 'downtown'));
    } finally {
      random.mockRestore();
    }
  });

  it('places rooftops on the actual upward surface and does not stretch equipment with building height', () => {
    const geometry = new BoxGeometry(60, 200, 60);
    const roof = findRoofSurface(geometry)!;
    expect(roof.y).toBe(100);
    expect(roof.radius).toBeGreaterThan(3);
    const building: BuildingObject = {
      kind: 'building',
      model: 'test',
      material: 'building_01',
      x: 0,
      z: 0,
      scaleY: 1,
      rotation: 90,
    };
    // Pick an eligible lot, keeping every choice reproducible.
    for (let x = 0; x < 100 && rooftopDetails(9746, building, 'downtown', roof).length === 0; x++)
      building.x = x * CELL_SIZE;
    const a = rooftopDetails(9746, building, 'downtown', roof);
    const b = rooftopDetails(9746, { ...building, scaleY: 2 }, 'downtown', roof);
    expect(a.length).toBe(3);
    for (let i = 0; i < a.length; i++) {
      expect(b[i].y - a[i].y).toBe(roof.y);
      expect(b[i].height).toBe(a[i].height);
      expect(Math.abs(a[i].x - building.x - roof.z)).toBeLessThan(roof.radius * 0.15);
    }
    expect(rooftopDetails(9746, building, 'mixed', roof)).toEqual([]);
    expect(rooftopDetails(9746, building, 'downtown', { ...roof, radius: 1 })).toEqual([]);
    geometry.dispose();
  });

  it('streams rooftop instances and their collision proxies together', () => {
    const world = makeWorld();
    const geometry = new BoxGeometry(60, 200, 60);
    geometry.boundsTree = new MeshBVH(geometry);
    world.assets.getModel = () => geometry;
    world.rooftops = new RooftopKit(world.seed);
    const collider = new Collider();
    collider.enabled = true;
    world.collider = collider;
    let instanceCount = 0;
    world.instances = {
      add: () => {
        instanceCount++;
        return {};
      },
      remove: () => {
        instanceCount--;
      },
    };
    const blocks = Array.from({ length: 20 }, (_, i) => new GeneratorItem_CityBlock(i * CELL_SIZE, 0, world));
    const rooftop = blocks.flatMap((block) => block.detailMeshes)[0];
    expect(rooftop).toBeDefined();
    expect(collider.meshes).toContain(rooftop);
    expect(collider.intersectsSphere(rooftop.position.clone(), 1)).toBe(true);
    for (const block of blocks) block.remove();
    expect(collider.meshes).toEqual([]);
    expect(collider.meshesInRange).toEqual([]);
    expect(instanceCount).toBe(0);
  });

  it('keeps weather anchored to world coordinates across cell crossings and teleports', () => {
    const camera = new PerspectiveCamera(80, 1, 1, 2800);
    const pass = new HeightFogPass(camera, 9746, createDistrictNoise(9746));
    pass.updateWeather();
    const before = pass.data.slice();
    camera.position.x = HAZE_CELL_SIZE;
    pass.updateWeather();
    for (let z = 0; z < 16; z++) {
      for (let x = 0; x < 15; x++) {
        expect(pass.data.slice((z * 16 + x) * 4, (z * 16 + x + 1) * 4)).toEqual(
          before.slice((z * 16 + x + 1) * 4, (z * 16 + x + 2) * 4),
        );
      }
    }
    camera.position.copy(new Vector3(50000, 300, -50000));
    pass.updateWeather();
    camera.position.set(0, 0, 0);
    pass.updateWeather();
    expect(pass.data).toEqual(before);
    pass.dispose();
  });
});
