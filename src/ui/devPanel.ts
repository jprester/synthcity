// Dev tweak panel (lil-gui) for checking effects and environment setups by
// hand. Loaded lazily by Game when enabled: on under `npm run dev`, forced with
// ?gui=1 or ?gui=0.
//
// Changes are live and temporary. Every control starts from the value the game
// set, so "reset" returns to the art direction; "copy values" puts the current
// values on the clipboard (and the console) to carry over into the code.

import GUI from 'lil-gui';
import {
  ACESFilmicToneMapping,
  CineonToneMapping,
  LinearToneMapping,
  NoToneMapping,
  ReinhardToneMapping,
} from 'three';
import type { Fog, Material, MeshPhongMaterial, PointLight } from 'three';
import type { AssetManager } from '../classes/AssetManager.ts';
import type { Game } from '../Game.ts';

const materialsMatching = <M extends Material = MeshPhongMaterial>(
  assets: AssetManager,
  pattern: RegExp,
): M[] =>
  Object.entries(assets.materials)
    .filter(([key]) => pattern.test(key))
    .map(([, material]) => material as M);

// a number property applied to a group of objects, read from the first
function groupProxy<T>(objects: T[], get: (o: T) => number, set: (o: T, v: number) => void) {
  const proxy = { value: objects.length ? get(objects[0]) : 0 };
  return {
    proxy,
    apply: (v: number) => objects.forEach((o) => set(o, v)),
  };
}

export function createDevPanel(game: Game): GUI {
  const gui = new GUI({ title: 'SynthCity dev' });
  const { renderer, scene, assets } = game;

  /*----- launch (reloads the page) -----*/

  const params = new URLSearchParams(window.location.search);
  const launch = {
    seed: String(game.settings.worldSeed),
    mode: game.settings.mode,
    env: game.environment.name,
    reload() {
      const q = new URLSearchParams(window.location.search);
      q.set('seed', launch.seed);
      q.set('mode', launch.mode);
      q.set('env', launch.env);
      q.set('skip', '1');
      window.location.search = q.toString();
    },
  };
  const launchFolder = gui.addFolder('Launch (reloads)');
  launchFolder.add(launch, 'seed');
  launchFolder.add(launch, 'mode', ['drive', 'freeroam']);
  launchFolder.add(launch, 'env', ['night', 'day']);
  launchFolder.add(launch, 'reload').name('reload with these');
  if (params.get('skip') == '1') launchFolder.close();

  /*----- simulation -----*/

  const sim = gui.addFolder('Simulation');
  sim.add(game, 'timeScale', 0, 4, 0.05).name('time scale (0 pauses)');
  const debug = { stats: !!game.stats };
  sim
    .add(debug, 'stats')
    .name('stats overlay')
    .onChange((on: boolean) => game.setStats(on));

  /*----- performance -----*/

  const perf = gui.addFolder('Performance');
  perf
    .add(game, 'maxPixelRatio', 0.5, 3, 0.05)
    .name('max pixel ratio')
    .onChange((v: number) => game.setMaxPixelRatio(v));
  perf.add(game, 'maxFps', { '30': 30, '60': 60, '120': 120, unlimited: 0 }).name('max fps');

  /*----- post-processing -----*/

  const post = gui.addFolder('Post-processing');
  post.add(game.bloomPass, 'strength', 0, 15, 0.05).name('bloom strength');
  post.add(game.bloomPass, 'threshold', 0, 1, 0.01).name('bloom threshold');
  post.add(game.bloomPass, 'radius', 0, 2, 0.01).name('bloom radius');
  post.add(game.bloomPass, 'enabled').name('bloom');
  post.add(game.fxaa, 'enabled').name('FXAA');
  // Tone mapping and exposure apply to the scene image only: the bloom pass
  // draws it to the screen with a MeshBasicMaterial (tone mapped, sRGB), then
  // adds the bloom on top untouched. Materials need recompiling on a change.
  post.add(renderer, 'toneMappingExposure', 0, 3, 0.01).name('exposure');
  post
    .add(renderer, 'toneMapping', {
      ACESFilmic: ACESFilmicToneMapping,
      Reinhard: ReinhardToneMapping,
      Cineon: CineonToneMapping,
      Linear: LinearToneMapping,
      None: NoToneMapping,
    })
    .name('tone mapping')
    .onChange(() =>
      scene.traverse((o) => {
        const material = (o as { material?: Material | Material[] }).material;
        for (const m of Array.isArray(material) ? material : material ? [material] : []) m.needsUpdate = true;
      }),
    );

  /*----- sky and fog -----*/

  const skyFolder = gui.addFolder('Sky and fog');
  const sky = { background: true };
  const skyTexture = scene.background;
  skyFolder
    .add(sky, 'background')
    .name('sky texture')
    .onChange((on: boolean) => (scene.background = on ? skyTexture : null));
  const fog = scene.fog as Fog;
  skyFolder.addColor(fog, 'color').name('fog colour');
  skyFolder.add(fog, 'near', -1000, 3000, 10).name('fog start');
  skyFolder.add(fog, 'far', 100, 6000, 10).name('fog end');
  if (game.heightFog) {
    skyFolder.add(game.heightFog, 'enabled').name('layered haze');
    skyFolder.add(game.heightFog, 'density', 0, 3, 0.05).name('haze density');
  }

  /*----- lights -----*/

  const lights = gui.addFolder('Lights');
  lights.addColor(game.sunLight, 'color').name('sun colour');
  lights.add(game.sunLight, 'intensity', 0, 5, 0.01).name('sun intensity');
  lights.addColor(game.ambientLight, 'color').name('ambient colour');
  lights.add(game.ambientLight, 'intensity', 0, 3, 0.01).name('ambient intensity');
  if (game.cityLights.length) {
    const pooled: PointLight[] = game.cityLights.map((l) => l.light);
    const intensity = groupProxy(
      pooled,
      (l) => l.intensity,
      (l, v) => void (l.intensity = v),
    );
    lights.add(intensity.proxy, 'value', 0, 500, 1).name('city lights').onChange(intensity.apply);
    const distance = groupProxy(
      pooled,
      (l) => l.distance,
      (l, v) => void (l.distance = v),
    );
    lights.add(distance.proxy, 'value', 100, 6000, 10).name('city light reach').onChange(distance.apply);
  }

  /*----- emissive materials -----*/

  const glow = gui.addFolder('Glow');
  const emissive = (label: string, pattern: RegExp, max: number) => {
    const group = groupProxy(
      materialsMatching(assets, pattern),
      (m) => m.emissiveIntensity,
      (m, v) => void (m.emissiveIntensity = v),
    );
    glow.add(group.proxy, 'value', 0, max, 0.01).name(label).onChange(group.apply);
  };
  emissive('windows', /^(building_\d+|mega_building_01)$/, 5);
  emissive('storefronts', /^storefronts$/, 5);
  emissive('ads', /^ads_(neon|posters|screens|videos)$/, 1);
  emissive('holograms', /^(ads_large|hologram_large)_\d+$/, 1);
  emissive('ground', /^ground$/, 2);
  emissive('traffic', /^cars$/, 3);
  const brightness = (label: string, pattern: RegExp) => {
    const group = groupProxy(
      materialsMatching(assets, pattern),
      (m) => m.color.r,
      (m, v) => void m.color.setScalar(v),
    );
    glow.add(group.proxy, 'value', 0, 3, 0.01).name(label).onChange(group.apply);
  };
  brightness('smoke', /^smoke_\d+$/);
  brightness('spotlights', /^spotlight_\d+$/);

  /*----- actions -----*/

  gui.add({ reset: () => gui.reset() }, 'reset').name('reset to defaults');
  gui
    .add(
      {
        copy() {
          const values = JSON.stringify(gui.save(), null, 2);
          console.log('SynthCity dev panel values:\n' + values);
          navigator.clipboard?.writeText(values).catch(() => {});
        },
      },
      'copy',
    )
    .name('copy values (JSON)');

  // start collapsed except the most used folders
  for (const folder of [launchFolder, skyFolder, lights, glow]) folder.close();

  return gui;
}
