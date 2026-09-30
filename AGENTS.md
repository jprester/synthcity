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
npm run dev             # dev server at http://localhost:5173
npm run build           # production build into dist/
npm run preview         # serve the build
npm test                # Vitest unit + snapshot tests (fast, headless)
npm run lint            # ESLint
npm run format          # Prettier (format:check to verify)
npm run check           # lint + format:check + test + build
npm run visual:compare  # render reference frames and diff them against the baseline (~2.5 min)
```

Query params preset the launch settings, e.g. `/?seed=9746&mode=freeroam&music=0&sfx=0`. See `src/settings.js`.

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

- `test/cityLayout.test.js` snapshots the full layout of a 13×13 block area for two seeds, run headless. It is the main safety net for generator refactors.
- `test/generator.test.js` covers the streaming grid.
- Tests marked `it.fails` document known bugs. When you fix one, change it to `it`.

## Architecture

```
index.html              terminal UI markup + canvas
src/main.js             entry: styles, query params, creates window.game, starts terminal
src/Game.js             renderer, post-processing (FXAA + UnrealBloom), environment, generators, frame loop, audio
src/settings.js         launch settings (terminal form + query params)
src/hash.js             deterministic hash of (seed, position, purpose) for world content
src/ui/terminal.js      boot terminal, settings form, loading readout
src/lib/                vendored Alea PRNG and Perlin noise (not linted or formatted)
src/classes/
  AssetManager.js       loads textures, OBJ models, creates materials
  Generator.js          streaming grid: spawns/removes items in a disc of cells around the camera
  GeneratorItem_CityBlock.js   one city block: buildings, ads, toppers, smoke, spotlights, ground, storefronts
  GeneratorItem_CityLight.js   assigns pooled PointLights to districts
  GeneratorItem_Traffic.js     flying traffic lanes
  GeneratorUtils.js     noise remap + material/rotation pickers
  Collider.js           three-mesh-bvh sphere collision against nearby building meshes
  Player.js / PlayerCar.js / PlayerController.js   freeroam camera, flying car, input
  Radio.js              music playlist
public/assets/          models (OBJ), textures, sounds, music; served as-is
scripts/visual/         deterministic capture + pixel compare
test/                   Vitest
```

World constants: city block 128 units, road 24, so a cell is 152. District types come from low-frequency Perlin noise (`cityBlockNoiseFactor` 0.0017); every per-lot choice is a hash of (seed, lot position, purpose) from `src/hash.js`.

Generator items and decorations reach shared state through `window.game`. It is legacy; don't add new uses. Pass dependencies explicitly in new code.

## Conventions

- Plain ES modules and three.js; no framework. Match the surrounding code; Prettier handles formatting.
- three.js is pinned at 0.159.0. Don't upgrade as a side effect; it's a separate, visually verified task.
- Keep commits focused: one concern per commit, with the verification you ran mentioned in the message.
- Put large binary assets in `public/assets/` only when they are actually referenced.

## Roadmap

Detailed task notes, open decisions and known traps: [docs/HANDOFF.md](docs/HANDOFF.md).

Roughly in priority order:

1. **Split generation from rendering.** A pure `generateBlock(seed, cellX, cellZ)` that returns plain data, plus a separate step that builds three.js objects. Lets layout tests run without stubs and allows moving generation into a worker.
2. **Performance.** InstancedMesh/BatchedMesh per model+material (thousands of draw calls today); spread block construction over several frames instead of building a full row in one frame.
3. **Frame-rate independence.** Movement, traffic and animations are per-frame, so everything runs about 2.4× faster at 144 Hz. The fade-in multiplies by accumulated rather than per-frame delta.
4. **Generator bugs** captured in `test/generator.test.js`.
5. **Smaller fixes.**
   - `Collider.remove` splices index -1 when the uuid is missing.
   - `Collider.intersectsSphere` allocates per mesh per frame.
   - The FXAA resolution uniform is not updated on resize, and FXAA runs before bloom.
   - The `mousewheel` event doesn't fire in Firefox.
6. **Assets.** OBJ → glTF (meshopt), WAV → Opus, textures → KTX2.
