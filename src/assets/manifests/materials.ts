import {
  MeshPhongMaterial,
  MeshStandardMaterial,
  MeshPhysicalMaterial,
  Color,
  AdditiveBlending,
  DoubleSide,
} from "three";
import type { Texture, Material } from "three";
import type { MaterialContext } from "../types";

type GetTexture = (key: string) => Texture | undefined;

/**
 * Material definitions using factory functions
 * This allows textures to be resolved at creation time
 */
export type MaterialFactoryMap = Record<
  string,
  (getTexture: GetTexture, ctx: MaterialContext) => Material
>;

/**
 * Creates all material factory functions
 * Materials are created lazily when first requested
 */
export function createMaterialFactories(): MaterialFactoryMap {
  const factories: MaterialFactoryMap = {};

  // Ground
  factories["ground"] = (getTexture, ctx) =>
    new MeshPhongMaterial({
      map: getTexture("ground"),
      emissive: 0x0090ff,
      emissiveMap: getTexture("ground_em"),
      emissiveIntensity: ctx.environmentName === "night" ? 0.2 : 0, // Legacy: overwritten by preset
      shininess: 0,
    });

  // Spinner (player car)
  factories["spinner_interior"] = (getTexture) =>
    new MeshStandardMaterial({
      map: getTexture("spinner_interior"),
      normalMap: getTexture("spinner_interior_norm"),
      aoMap: getTexture("spinner_interior_ao"),
      aoMapIntensity: 1,
      roughness: 0.6,
      metalness: 0,
      emissive: 0xffffff,
      emissiveMap: getTexture("spinner_interior_em"),
      emissiveIntensity: 0.1, // Legacy: overwritten by preset
    });

  factories["spinner_exterior"] = (getTexture) =>
    new MeshPhongMaterial({
      map: getTexture("spinner_exterior"),
      shininess: 0,
    });

  factories["spinner_windows_advanced"] = (getTexture) =>
    new MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: false,
      opacity: 1,
      roughness: 0.5,
      roughnessMap: getTexture("spinner_windows_rough"),
      metalness: 0,
      reflectivity: 1,
      transmission: 1,
      transmissionMap: getTexture("spinner_windows_trans"),
      thickness: 0.01,
      normalMap: getTexture("spinner_windows_norm"),
    });

  factories["spinner_windows_simple"] = (getTexture) =>
    new MeshStandardMaterial({
      color: 0x808080,
      transparent: true,
      opacity: 0.1,
      envMap: getTexture("env_night_windshield"),
      roughness: 0,
      metalness: 1,
      normalMap: getTexture("spinner_windows_norm"),
      blending: AdditiveBlending,
    });

  // Traffic cars
  factories["cars"] = (getTexture) =>
    new MeshPhongMaterial({
      map: getTexture("cars"),
      emissive: 0xffffff,
      emissiveMap: getTexture("cars_em"),
      emissiveIntensity: 1.0, // Legacy: overwritten by preset
      side: DoubleSide,
    });

  // Storefronts
  factories["storefronts"] = (getTexture, ctx) =>
    new MeshPhongMaterial({
      map: getTexture("storefronts"),
      emissive: 0xffffff,
      emissiveMap: getTexture("storefronts_em"),
      emissiveIntensity: ctx.windowLightsEnabled ? 1.5 : 0, // Legacy: overwritten by preset
      shininess: 0,
    });

  // Mega building - boosted emissive for enhanced glow
  factories["mega_building_01"] = (getTexture, ctx) =>
    new MeshPhongMaterial({
      map: getTexture("mega_building_01"),
      specular: 0x777777,
      shininess: 1,
      emissive: 0xffffff,
      emissiveMap: getTexture("mega_building_01_em"),
      emissiveIntensity: ctx.windowLightsEnabled ? 2.0 : 0, // Legacy: overwritten by preset
      bumpMap: getTexture("mega_building_01"),
      bumpScale: 10,
    });

  // Building materials (10 variants with random emissive colors)
  for (let i = 1; i <= 10; i++) {
    const id = i.toString().padStart(2, "0");
    const key = `building_${id}`;
    factories[key] = (getTexture, ctx) =>
      new MeshPhongMaterial({
        map: getTexture(key),
        specular: 0xffffff,
        specularMap: getTexture(`${key}_rough`),
        envMap: getTexture("env_night"),
        emissive: new Color(`hsl(${Math.random() * 360}, 100%, 95%)`),
        emissiveMap: getTexture(`${key}_em`),
        emissiveIntensity: ctx.windowLightsEnabled ? 2.0 : 0, // Legacy: overwritten by preset
        bumpMap: getTexture(key),
        bumpScale: 5,
      });
  }

  // Small ads (5 variants) - bright emissive for neon glow
  for (let i = 1; i <= 5; i++) {
    const id = i.toString().padStart(2, "0");
    factories[`ads_${id}`] = (getTexture) =>
      new MeshPhongMaterial({
        emissive: 0xffffff,
        emissiveMap: getTexture(`ads_${id}`),
        emissiveIntensity: 0.25, // Legacy: overwritten by BASE_EMISSIVE_INTENSITIES × preset multiplier
        blending: AdditiveBlending,
        fog: false,
        side: DoubleSide,
      });
  }

  // Large ads (5 variants) - bright emissive for neon glow
  for (let i = 1; i <= 5; i++) {
    const id = i.toString().padStart(2, "0");
    factories[`ads_large_${id}`] = (getTexture) =>
      new MeshPhongMaterial({
        emissive: 0xffffff,
        emissiveMap: getTexture(`ads_large_${id}`),
        emissiveIntensity: 0.25, // Legacy: overwritten by BASE_EMISSIVE_INTENSITIES × preset multiplier
        blending: AdditiveBlending,
        fog: false,
        side: DoubleSide,
      });
  }

  // Smoke (3 variants)
  for (let i = 1; i <= 3; i++) {
    const id = i.toString().padStart(2, "0");
    factories[`smoke_${id}`] = (getTexture) =>
      new MeshPhongMaterial({
        alphaMap: getTexture(`smoke_${id}`),
        color: 0xffffff,
        shininess: 0,
        specular: 0x000000,
        blending: AdditiveBlending,
        depthWrite: false,
        transparent: false,
      });
  }

  // Spotlights (4 variants)
  for (let i = 1; i <= 4; i++) {
    const id = i.toString().padStart(2, "0");
    factories[`spotlight_${id}`] = (getTexture) =>
      new MeshPhongMaterial({
        alphaMap: getTexture(`spotlight_${id}`),
        color: 0xffffff,
        shininess: 0,
        specular: 0x000000,
        blending: AdditiveBlending,
        depthWrite: false,
        transparent: false,
      });
  }

  return factories;
}
