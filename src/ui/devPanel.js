// Dev tweak panel (lil-gui) for checking effects and environment setups by
// hand. Loaded lazily by Game when enabled: on under `npm run dev`, forced with
// ?gui=1 or ?gui=0.
//
// Changes are live and temporary. Every control starts from the value the game
// set, so "reset" returns to the art direction; "copy values" puts the current
// values on the clipboard (and the console) to carry over into the code.

import GUI from 'lil-gui';

const materialsMatching = (assets, pattern) =>
  Object.entries(assets.materials)
    .filter(([key]) => pattern.test(key))
    .map(([, material]) => material);

// a number property applied to a group of objects, read from the first
function groupProxy(objects, get, set) {
  const proxy = { value: objects.length ? get(objects[0]) : 0 };
  return {
    proxy,
    apply: (v) => objects.forEach((o) => set(o, v)),
  };
}

export function createDevPanel(game) {
  const gui = new GUI({ title: 'SynthCity dev' });
  const { scene, assets } = game;

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
    .onChange((on) => game.setStats(on));

  /*----- post-processing -----*/

  const post = gui.addFolder('Post-processing');
  post.add(game.bloomPass, 'strength', 0, 15, 0.05).name('bloom strength');
  post.add(game.bloomPass, 'threshold', 0, 1, 0.01).name('bloom threshold');
  post.add(game.bloomPass, 'radius', 0, 2, 0.01).name('bloom radius');
  post.add(game.bloomPass, 'enabled').name('bloom');
  post.add(game.fxaa, 'enabled').name('FXAA');
  // No tone mapping or exposure controls: three r159 only tone maps when
  // rendering straight to the screen, and here everything goes through the
  // composer, so renderer.toneMapping has no effect.

  /*----- sky and fog -----*/

  const skyFolder = gui.addFolder('Sky and fog');
  const sky = { background: true };
  const skyTexture = scene.background;
  skyFolder
    .add(sky, 'background')
    .name('sky texture')
    .onChange((on) => (scene.background = on ? skyTexture : null));
  skyFolder.addColor(scene.fog, 'color').name('fog colour');
  skyFolder.add(scene.fog, 'near', -1000, 3000, 10).name('fog start');
  skyFolder.add(scene.fog, 'far', 100, 6000, 10).name('fog end');

  /*----- lights -----*/

  const lights = gui.addFolder('Lights');
  lights.addColor(game.sunLight, 'color').name('sun colour');
  lights.add(game.sunLight, 'intensity', 0, 5, 0.01).name('sun intensity');
  lights.addColor(game.ambientLight, 'color').name('ambient colour');
  lights.add(game.ambientLight, 'intensity', 0, 3, 0.01).name('ambient intensity');
  if (game.cityLights.length) {
    const pooled = game.cityLights.map((l) => l.light);
    const intensity = groupProxy(
      pooled,
      (l) => l.intensity,
      (l, v) => (l.intensity = v),
    );
    lights.add(intensity.proxy, 'value', 0, 500, 1).name('city lights').onChange(intensity.apply);
    const distance = groupProxy(
      pooled,
      (l) => l.distance,
      (l, v) => (l.distance = v),
    );
    lights.add(distance.proxy, 'value', 100, 6000, 10).name('city light reach').onChange(distance.apply);
  }

  /*----- emissive materials -----*/

  const glow = gui.addFolder('Glow');
  const emissive = (label, pattern, max) => {
    const group = groupProxy(
      materialsMatching(assets, pattern),
      (m) => m.emissiveIntensity,
      (m, v) => (m.emissiveIntensity = v),
    );
    glow.add(group.proxy, 'value', 0, max, 0.01).name(label).onChange(group.apply);
  };
  emissive('windows', /^(building_\d+|storefronts|mega_building_01)$/, 5);
  emissive('ads', /^ads_(large_)?\d+$/, 1);
  emissive('ground', /^ground$/, 2);
  emissive('traffic', /^cars$/, 3);
  const brightness = (label, pattern) => {
    const group = groupProxy(
      materialsMatching(assets, pattern),
      (m) => m.color.r,
      (m, v) => m.color.setScalar(v),
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
