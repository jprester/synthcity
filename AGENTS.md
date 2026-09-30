# Agent guide

SynthCity is an infinite, procedurally generated cyberpunk city in three.js. You fly a car through it (drive mode) or roam freely (freeroam mode) at night, under heavy bloom, with a synthwave radio.

## Project rules

These hold for every change:

- **The city is procedural and infinite.** Everything in the world is generated from the world seed and the cell coordinates. Never hand-place content or add fixed maps.
- **Same seed, same city.** For a given seed, generating a cell must give the same result every time, whatever else happened before. World content must never use `Math.random()`; derive it from the seed and position with `src/hash.js` (`hashFloat(seed, x, z, 'purpose')`, or `hashRandom(...)` for a stream). Use a distinct purpose salt for each new use.
- **The look is intentional.** The night palette, strong bloom (threshold 0, strength 7), fog, emissive windows, ads and spotlights are the original art direction. Don't retune them as a side effect of other work.
- **Refactors are pixel-neutral.** Anything that isn't meant to change the look must pass `npm run visual:compare` unchanged.

## Commands

```bash
npm install
npm run dev             # dev server at http://localhost:5173 (with the lil-gui tweak panel)
npm run build           # production build into dist/
npm run preview         # serve the build
npm test                # Vitest unit + snapshot tests (fast, headless)
npm run lint            # ESLint
npm run format          # Prettier (format:check to verify)
npm run check           # lint + format:check + test + build
npm run visual:compare  # render reference frames and diff them against the baseline (~2.5 min)
npm run perf            # fly drive mode on the real GPU and print the ?stats=1 readout
```

Query params preset the launch settings, e.g. `/?seed=9746&mode=freeroam&music=0&sfx=0`. See `src/settings.js`. For manual testing, `skip=1` skips the boot terminal and launches as soon as assets load; click the canvas to grab the mouse and start audio.

The dev tweak panel (`src/ui/devPanel.js`, lil-gui) is on under `npm run dev` (`gui=0` hides it, `gui=1` enables it in a build). It covers bloom, FXAA, sky and fog, lights, glow, time scale and the stats overlay, and can relaunch with another seed, mode or environment. "copy values" puts the tweaked values on the clipboard. Panel changes are temporary; move values you want to keep into the code deliberately (the look is intentional). `env=day` selects the day environment; `stats=1` shows a performance overlay (fps, CPU update/render time, draw calls, triangles, objects).

## Verifying a change

1. Always: `npm run check`.
2. Any change that touches generation, rendering, materials, assets or the frame loop: `npm run visual:compare`.
   - It builds the app, serves it, and renders a fixed shot list (`scripts/visual/shots.mjs`) in headless Chromium with SwiftShader. Time is frozen, `Math.random` is seeded and frames are stepped manually, so the output is identical on every machine.
   - It reports the share of differing pixels per frame. Diff images go to `screenshots/visual/diff/`, the new frames to `screenshots/visual/current/`.
   - It needs Playwright's Chromium once: `npx playwright install chromium`.
3. If a snapshot test or visual frame changes:
   - **Unintentional:** it's a bug. Fix the code; don't update the snapshot.
   - **Intentional** (a deliberate change to generation or look): update in the same commit with `npx vitest run -u` and/or `npm run visual:baseline`. Say in the commit message what changed visually and why, and look at the new frames before committing.

Test layout:

- `test/generation.test.js` covers the pure generators (`src/generation/`): a data snapshot of a 13×13 block area, determinism, and distribution checks. No stubs.
- `test/cityLayout.test.js` runs the three.js builders over that data and snapshots every mesh for two seeds. It is the main safety net for builder and rendering refactors.
- `test/generator.test.js` covers the streaming grid, including teleports and disc coverage after moving.
- Tests marked `it.fails` document known bugs. When you fix one, change it to `it`.

## Architecture

```
index.html              terminal UI markup + canvas
src/main.js             entry: styles, query params, creates the Game, starts terminal
src/Game.js             renderer, post-processing (FXAA + UnrealBloom), environment, generators, frame loop, audio
src/settings.js         launch settings (terminal form + query params)
src/hash.js             deterministic hash of (seed, position, purpose) for world content
src/ui/terminal.js      boot terminal, settings form, loading readout
src/lib/                vendored Alea PRNG and Perlin noise (not linted or formatted)
src/generation/         pure world generation: plain data from (seed, position), no three.js
  world.js              world constants, district noise
  cityBlock.js          generateBlock: buildings, ads, toppers, smoke, spotlights, ground, storefronts
  traffic.js            generateTrafficCell: starting state of the cars in a cell
  cityLight.js          cityLightHue: district edge lights
src/classes/
  AssetManager.js       loads textures, OBJ models, creates materials
  Generator.js          streaming grid: spawns/removes items in a disc of cells around the camera
  GeneratorItem_CityBlock.js   builds a block's meshes and decorations from generateBlock
  GeneratorItem_CityLight.js   assigns pooled PointLights to district edges
  GeneratorItem_Traffic.js     spawns and moves the cars of a traffic cell
  InstancePool.js       one InstancedMesh per geometry+material, per-instance frustum culling
  Collider.js           three-mesh-bvh sphere collision against nearby building proxies
  Player.js / PlayerCar.js / PlayerController.js   freeroam camera, flying car, input
  Radio.js              music playlist
public/assets/          models (OBJ), textures, sounds, music; served as-is
scripts/visual/         deterministic capture + pixel compare
test/                   Vitest
```

World constants: city block 128 units, road 24, so a cell is 152. District types come from low-frequency Perlin noise (`DISTRICT_NOISE_FACTOR` 0.0017); every per-lot choice is a hash of (seed, lot position, purpose) from `src/hash.js`.

Generation and rendering are separate. New world content goes into `src/generation/` as plain data, and the builder in `src/classes/GeneratorItem_*` turns it into three.js objects. Builders get their dependencies (seed, noise, assets, scene, collider, player) from the context object `Game.init()` passes through `Generator`. There is no global game object; pass dependencies explicitly.

## Conventions

- Per-frame motion takes `k` (frame time in 60 Hz frames, `src/classes/frameRate.js`): scale increments by `k`, use `decay(f, k)` for damping and `ease(a, k)` for easing. Never assume 60 Hz.
- Plain ES modules and three.js; no framework. Match the surrounding code; Prettier handles formatting.
- three.js is pinned at 0.159.0. Don't upgrade as a side effect; it's a separate, visually verified task.
- Keep commits focused: one concern per commit, with the verification you ran mentioned in the message.
- Put large binary assets in `public/assets/` only when they are actually referenced.

## Roadmap

Detailed task notes, open decisions and known traps: [docs/HANDOFF.md](docs/HANDOFF.md).

Roughly in priority order:

1. **Performance.** Buildings and ground are instanced (`InstancePool`); adverts are next. At 1080p the frame is GPU-bound on bloom and fill rate; measure with `npm run perf`.
2. **Smaller fixes.**
   - FXAA runs before bloom (moving it is a look decision).
3. **Assets.** OBJ → glTF (meshopt), WAV → Opus, textures → KTX2.
