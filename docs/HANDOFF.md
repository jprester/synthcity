# Handoff: epic/2026-agent-rework

Status and next steps for continuing this rework in a local Claude Code session. Read [AGENTS.md](../AGENTS.md) first for the project rules, commands and architecture. This document covers what's done, what's left, and what I learned along the way that isn't obvious from the code.

`main` keeps the legacy state. All rework happens on `epic/2026-agent-rework`, with no pull requests.

## Where things stand

The tooling pass is complete. The game is otherwise the original code, and it renders pixel-for-pixel the same as the original webpack build at `5a4ee0d`.

- **Build:**
  - Vite replaces webpack; built output is no longer committed.
  - The app uses ES modules throughout: Alea/Perlin are in `src/lib/`, and the terminal UI is `src/ui/terminal.js` without jQuery.
  - The font is self-hosted.
  - Launch settings can be preset with query params (`src/settings.js`).
- **Checks:**
  - ESLint and Prettier. The one-time reformat commit is listed in `.git-blame-ignore-revs`; enable it locally with `git config blame.ignoreRevsFile .git-blame-ignore-revs`.
  - Vitest: noise, the streaming grid, and golden layout snapshots.
  - Deterministic visual regression: `npm run visual:compare`.
- **Docs:** `AGENTS.md` is the guide shared by all agents, and `CLAUDE.md` imports it.

### Local setup

```bash
git checkout epic/2026-agent-rework && git pull
npm install
npx playwright install chromium   # once; Playwright is pinned to 1.56.1
npm run check                     # lint, format, tests, build (~15 s)
npm run visual:compare            # ~2.5 min; should report 0.000% on all 7 frames
npm run dev                       # http://localhost:5173
```

The visual harness forces SwiftShader (software GL), so your local results are identical to the ones recorded in the cloud, whatever GPU you have. Because of that, the harness is useless for measuring performance; see task 4.

## How the safety nets work

Knowing this helps you tell whether a diff is real.

**Layout snapshots.** `test/cityLayout.test.js` runs `GeneratorItem_CityBlock` headless against a stub `window.game` (`test/helpers.js`). It records every building, ground tile and decoration (model/material, position, rotation, scale) for a 13×13 block area at seeds 9746 and 6362. `Math.random` is stubbed with a seeded PRNG, so decorations are pinned too.

**Visual harness** (`scripts/visual/capture.mjs`):

- **Frozen state.** The wall clock is frozen, `performance.now` advances exactly 1/60 s per frame, `requestAnimationFrame` is driven manually, and `Math.random` is a seeded PRNG.
- **Reseeds** the PRNG twice:
  - at the game's first `assets/` image request, so the building emissive hues don't depend on how many random calls happened before loading;
  - at the Launch click.
- **Skips draws on intermediate frames.** The game logic still runs every frame, but only the captured frame is drawn. Nothing accumulates across frames, so the image is unaffected, and it makes a 360-frame shot take seconds instead of about 40 minutes.
- **Depends on these DOM ids:** `#enterBtn`, `#canvas`, `#blocker`, `#crashMessage`. If you rebuild the UI, keep them or update the harness.
- **Legacy builds:** it also sets `window.userSettings` so it can capture them.

**Re-recording from legacy.** To capture frames from an older checkout:

1. Serve that checkout with any static server.
2. Run `node scripts/visual/capture.mjs --url http://localhost:8080/ --out /tmp/frames`.
3. Add `--jquery path/to/jquery.min.js` only if the jQuery CDN isn't reachable.

**Expected failures.** Tests marked `it.fails` document known bugs. When the bug is fixed the test starts failing; change it to `it`.

**Intentional changes.** Update in the same commit (`npx vitest run -u`, `npm run visual:baseline`), look at the new frames, and describe the visual change in the commit message.

## Decisions for you before the city-changing work

1. **Keep or re-roll the curated cities.** Seeds 9746, 6362, 4217 and 5794 were picked by the original author because they look good.
   - Replacing decoration randomness (task 1a) keeps every building where it is.
   - Fixing the variant/rotation/height correlation (task 1b) changes which building stands on each lot, so those cities will look different.
   - Options: accept that and re-curate seeds; or put the new per-lot hash behind a generator version (`?gen=2`) and keep v1 for the curated seeds; or skip 1b.
   - Recommendation: do 1a now, then look at 1b frames side by side before deciding.
2. **Building hue source.** Today each building material gets a random pale emissive hue per page load.
   - Materials are created during asset loading, before Launch, and the seed can still change in the settings form after loading. So hues can't simply come from the world seed at creation time.
   - Options: fixed hues per material (simplest, stable across sessions); or recolour materials in `Game.init()` from the world seed.
   - Recommendation: seed-derived hues set in `init()`, so each seed has a consistent palette.
3. **Stay on three.js r159 or upgrade.** An upgrade is best done after instancing, with the visual harness as the check. Expect UnrealBloom and colour differences that need a deliberate re-tune against the baseline.

## Tasks

Suggested order. Each task lists what "done" looks like and the traps I know about.

### 1a. Seed-driven decorations and traffic (changes the look once, on purpose)

Replace `Math.random()` for world content with a deterministic hash of (world seed, world position or cell, purpose).

- Add a small hash module, e.g. `src/lib/hash.js`: a 32-bit integer hash such as a murmur3 finaliser or splitmix32 over (seed, x, z, salt), returning floats in [0, 1). Write unit tests for it.
- **Uses in `src/classes/GeneratorItem_CityBlock.js`:**
  - Spotlight chance: line 105.
  - Smoke chance: line 121.
  - `Advert`: material, switch interval, counter, whether it switches (lines 258–277). The periodic switch at line 277 can stay random over time, but its initial state should be seeded.
  - `Topper`: model, material, scale, spin (lines 302–312).
  - `Smoke`: material, scale, phase (lines 325–332).
  - `Spotlight`: material, scale, phase (lines 347–353).
- **Uses in `src/classes/GeneratorItem_Traffic.js`:**
  - Car count per lane (line 13), model (47), offsets (59–81), altitude band and speed (85–86).
  - Line 102 draws a new random reverse distance every frame. Give each car a fixed threshold instead.
  - Motion itself stays time-based.
- **Hues:** `src/classes/AssetManager.js:432` (building emissive hue); see decision 2.
- **Leave alone:** `Radio.js:139` (playlist shuffle is not world content) and `ui/terminal.js` (cosmetic loading names).
- **Done when:**
  - The `it.todo` in `test/cityLayout.test.js` becomes a real test: decorations are identical for two different `Math.random` seeds.
  - The building part of the layout snapshots is unchanged.
  - Snapshots and the visual baseline are updated in the same commit, with before/after frames reviewed.
- **Trap:** three.js `generateUUID` also calls `Math.random`. That's fine and must not affect world content, which is exactly what the new test checks.

### 1b. Decorrelate per-lot choices (see decision 1)

- For small buildings, `subtypeNoise` and `rotateNoise` sample identical coordinates (`GeneratorItem_CityBlock.js:72` and `:82`), so variant, rotation and height scale are the same number.
- More generally, per-lot values sample Processing-style value noise at integer lattice points (coordinates × 5), which acts as a weak hash. I measured only 512 distinct values over 40,000 lots, with about 10% of samples clamped by `fixNoise`.
- Keep Perlin only for the low-frequency district map (`typeNoise`, factor 0.0017) and use the hash from 1a for per-lot choices with distinct salts.
- **Done when:** a test asserts that variant and rotation are not perfectly correlated. Update snapshots and the baseline deliberately.

### 2. Split generation from rendering

- Create `generateBlock({ seed, noise, x, z })` returning plain data, e.g. `{ buildings: [{ model, material, position, rotationY, scaleY, collide }], decorations: [...], ground, storefronts }`.
- Make `GeneratorItem_CityBlock` a thin builder that turns that data into meshes and colliders.
- Do the same for city lights and traffic spawn parameters.
- Remove `window.game` from generators by passing a context object (assets, scene, collider, noise, constants) into the `Generator` and items. `src/main.js` still sets `window.game`; delete it when nothing reads it.
- **Done when:**
  - The layout test calls `generateBlock` directly with no stubs.
  - Snapshots are unchanged.
  - `visual:compare` shows 0.000%.
- This is a refactor, so it must be pixel-neutral.

### 3. Generator bugs (tests already exist)

- **Teleport crash.** `Generator.remove_items` (`src/classes/Generator.js:72`) indexes past the grid when the camera moves more than `cell_count` cells along z.
  - Crash respawn (`PlayerCar.js:257`) teleports to the origin, so flying about 2 km in z and then crashing throws in the traffic generator's update, which has 12 cells.
  - Fix: when |dx| or |dz| ≥ `cell_count`, remove everything and rebuild.
- **Corner leftovers.** Items shifted into grid corners outside the disc are never removed, so after moving the generator holds about 15% more items than intended.
  - Fix: in `add_items` (or after `shift_grid`), remove items outside the disc.
  - For the city blocks (radius 20 cells ≈ 3 km) the corners lie beyond the far plane (2800) and fog.
  - For traffic (radius 6 cells ≈ 900 units) and city lights, the removed items were visible or affected lighting. Expect small intentional diffs and check them.
- **Done when:** both `it.fails` in `test/generator.test.js` become `it`.

### 4. Performance

- **Measure first.** Add a `?stats=1` overlay showing FPS, `renderer.info.render.calls` and triangles. The visual harness can't measure performance; use your real browser and GPU.
- **Instancing.** Every building, ad and ground tile is its own `Mesh`, which means thousands of draw calls. Geometry is already shared per model, so an `InstancedMesh` (or `BatchedMesh`) per model+material pair, with slots allocated and freed as blocks stream in and out, is the big win.
  - Colliders currently use per-mesh BVH (`Collider.js`, `three-mesh-bvh`). Keep invisible per-building proxies for collision, or test spheres against instance transforms plus the shared geometry BVH.
  - Transparent and additive decorations (smoke, spotlights) may sort differently when instanced. Expect to review small diffs there, while opaque buildings should be pixel-identical.
- **Spread construction over frames.** Crossing a cell boundary builds a whole row of about 40 blocks in one frame. Queue new blocks and build a few per frame, nearest first.
- **Smaller costs.**
  - `Smoke` and `Spotlight` call `lookAt` every frame for every instance.
  - `Collider.intersectsSphere` allocates an `Object3D`, a `Matrix4` and a `Sphere` per mesh per frame (`Collider.js:41–50`).

### 5. Frame-rate independence

- All motion is per frame: car physics in `PlayerCar.js`/`Player.js`, traffic speed, advert switch counters, topper spin, smoke and spotlight phases. At 144 Hz everything runs about 2.4× faster than at 60 Hz.
- Scale by `delta * 60`, or use a fixed-timestep accumulator (better for the car physics and damping, which are `*= 0.965` per frame).
- Because the harness steps at exactly 60 Hz, a correct conversion should come out pixel-identical or near it. That makes it a good check for this task.
- **Fade-in bug:** `Game.js:420/423` adds `clockDelta` (accumulated time) rather than the per-frame delta, so the fade speeds up quadratically. The harness forces opacity to 1, so fixing it won't show in the frames.

### 6. Smaller fixes

- `Collider.remove` (`Collider.js:33`) does `splice(findIndex(...), 1)`. On a miss that's `splice(-1, 1)` and deletes the last collider. Also, `meshesInRange` keeps removed meshes until the next refresh.
- **FXAA:** the resolution uniform isn't updated in `onWindowResize` (`Game.js:203`). FXAA also runs before bloom (`Game.js:201–218`); moving it after bloom changes the look slightly, so treat that as an intentional visual change.
- **Input** (`PlayerController.js`):
  - The `mousewheel` event (line 77) never fires in Firefox; use `wheel`.
  - `event.which` (lines 209, 225) is deprecated; use `event.button`.
- `Game.animate` drops the rAF timestamp, and collision is enabled after the first frame via a flag. Simplify both once the frame loop is being reworked.
- `Player` and `PlayerCar` duplicate the camera-look code and `angle_dist`/`fix_angle`; move those into a shared helper.
- `PlayerCar`'s crash handling writes to the DOM directly and uses `setTimeout`. Move it to the frame loop and send UI updates through the terminal/UI module.
- **The `day` environment** exists in `Game.getEnvironment` but can't be selected. Expose it via a query param (and optionally the settings form) if you want it; it has its own bloom and lighting values.

### 7. Assets

The repo carries about 105 MB of assets. The two biggest cuts:

- **Audio:** WAV to Opus or MP3. `city_ambient.wav` is 14 MB, `traffic_ambient.wav` 10.5 MB, `car_ambient.wav` 3.3 MB, `car_wind.wav` 3.1 MB. This is lossy, so listen before committing.
- **Models:** OBJ to glTF with meshopt or Draco compression, then switch `AssetManager` to `GLTFLoader`. Geometry must stay identical: vertex order, and the `rotateY(-π/2)` applied to the spinner models. Run `visual:compare`.
- **Textures:** optionally convert to KTX2/Basis. Compression artefacts are a visual change, so review them.
- **`AssetManager.js`** is hundreds of lines of repeated load calls. Replace it with a manifest; `epic/2026-rework` has one in `src/assets/manifests/` to use as a reference.

### 8. three.js upgrade (after 4)

- Pinned at 0.159.0. Upgrade in one dedicated commit, re-tune bloom and exposure against the baseline, then accept the new baseline deliberately.
- The postprocessing and examples import paths (`three/examples/jsm/...`) became `three/addons/...`.

### 9. Optional

- **CI.** A GitHub Actions workflow on pushes to this branch running `npm run check`. `visual:compare` also runs in CI with Playwright's Chromium (about 3 min).
- **Type checking.** `// @ts-check` plus JSDoc, or `checkJs` in a `jsconfig.json`, gives agents type errors without a TypeScript migration.
- **UI.** The terminal UI works but is hand-rolled; leave it unless you want to change it. If you do, keep the DOM ids the harness uses.

## Procedural feature ideas (after 1–5)

These fit the original vision and become cheap once generation returns plain data:

- **More districts.** More district types from the low-frequency map, such as industrial, residential, megablock and waterfront/void, each with its own building mix, ad density and light colour.
- **Road hierarchy.** Occasional wide avenues or plazas from a second low-frequency channel, instead of a uniform 152-unit grid.
- **Landmarks and skybridges.** Rare landmarks per region (the existing mega buildings are a start), and skybridges between tall neighbours.
- **Traffic lanes along avenues.** Traffic that follows the road hierarchy, with lane altitude bands per district.
- **Seeded atmosphere.** Weather or haze per seed (fog colour and density, rain on the windshield) and a seed-derived palette shift, within the night look.
- **Shareable views.** `?seed=` already works; add camera position/heading params so a view can be shared.

## Things in epic/2026-rework worth looking at

Don't merge that branch. It moved to React/R3F, swapped the bloom for the `postprocessing` library behind quality presets (the default "Low" likely disables bloom), and changed assets. These pieces are worth reading as reference:

- **New building models and bake scripts.** New GLB buildings in `public/assets/models/`, and the Blender scripts `scripts/bake_model_textures.py` and `scripts/export_centered_glb.py`. Evaluate each model against the look before adopting it.
- **Asset manifest and registry:** `src/assets/manifests/*` and `src/config/buildingRegistry.ts`.
- **Asset viewer** (`src/scene/systems/AssetViewerScene.tsx`, `src/ui/AssetViewerUI.tsx`). Handy for checking new models; worth reimplementing as a plain page behind `?viewer=1`.
- **Performance monitor and quality/FPS settings:** `src/ui/PerformanceMonitor.tsx`.

## Environment notes

- Node 20.19+ (Vite 8).
- In Claude Code on the web, Chromium is preinstalled and the `playwright install` step isn't needed.
- `npm run visual:compare -- --only drive-9746` runs a single shot while iterating (about 1 min). Run the full set before committing.
