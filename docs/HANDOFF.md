# Handoff: epic/2026-agent-rework

Status and next steps for continuing this rework in a local Claude Code session. Read [AGENTS.md](../AGENTS.md) first for the project rules, commands and architecture. This document covers what's done, what's left, and what I learned along the way that isn't obvious from the code.

`main` keeps the legacy state. All rework happens on `epic/2026-agent-rework`, with no pull requests.

## Where things stand

The tooling pass is complete, and tasks 1a (seed-driven decorations, traffic and building hues) and 1b (hashed per-lot choices) are done. Before those two deliberate visual changes, the game rendered pixel-for-pixel the same as the original webpack build at `5a4ee0d`.

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

**Layout snapshots.**

- `test/generation.test.js` snapshots the plain data from `generateBlock` for a 13×13 block area (seed 9746), with no stubs. It also checks determinism, independence from `Math.random`, and distributions.
- `test/cityLayout.test.js` runs the three.js builders (`GeneratorItem_CityBlock`, `GeneratorItem_Traffic`) with a fake context from `test/helpers.js`. It records every building, ground tile and decoration mesh (model/material, position, rotation, scale) for seeds 9746 and 6362.
- If only the builder changes, the data snapshot must stay put; if only generation changes, both move.

**Visual harness** (`scripts/visual/capture.mjs`):

- **Frozen state.** The wall clock is frozen, `performance.now` advances exactly 1/60 s per frame, `requestAnimationFrame` is driven manually, and `Math.random` is a seeded PRNG.
- **Reseeds** the PRNG twice:
  - at the game's first `assets/` image request (this pinned the building hues before 1a; they now come from the seed, so it's harmless but no longer needed);
  - at the Launch click.
- **Skips draws on intermediate frames.** The game logic still runs every frame, but only the captured frame is drawn. Nothing accumulates across frames, so the image is unaffected, and it makes a 360-frame shot take seconds instead of about 40 minutes.
- **Depends on these DOM ids:** `#enterBtn`, `#canvas`, `#blocker`, `#crashMessage`. If you rebuild the UI, keep them or update the harness.
- **Legacy builds:** it also sets `window.userSettings` so it can capture them.

**Re-recording from legacy.** To capture frames from an older checkout:

1. Serve that checkout with any static server.
2. Run `node scripts/visual/capture.mjs --url http://localhost:8080/ --out /tmp/frames`.
3. Add `--jquery path/to/jquery.min.js` only if the jQuery CDN isn't reachable.

**Expected failures.** Tests marked `it.fails` document known bugs (none left right now). When the bug is fixed the test starts failing; change it to `it`.

**Intentional changes.** Update in the same commit (`npx vitest run -u`, `npm run visual:baseline`), look at the new frames, and describe the visual change in the commit message.

## Decisions

1. **Keep or re-roll the curated cities.** Decided: 1b was accepted, so seeds 9746, 6362, 4217 and 5794 now produce different (still district-identical) cities. Re-curating the seed list in `src/settings.js` is optional.
2. **Building hue source.** Decided and done: `AssetManager.setBuildingHues(seed)`, called from `Game.init()`, sets each building material's pale emissive hue from the world seed.
3. **Stay on three.js r159 or upgrade.** An upgrade is best done after instancing, with the visual harness as the check. Expect UnrealBloom and colour differences that need a deliberate re-tune against the baseline.

## Tasks

Suggested order. Each task lists what "done" looks like and the traps I know about.

### 1a. Seed-driven decorations and traffic — done

`src/hash.js` provides `hashFloat`/`hashRandom` keyed by (seed, position, purpose salt).

- Decorations get a stream per lot, and traffic gets a stream per cell.
- Each car has a fixed turn-around distance. The traffic count distribution (re-rolled per loop iteration) is unchanged.
- Building emissive hues come from the seed (decision 2).
- The only `Math.random` left is in `Radio.js`, `ui/terminal.js` and `settings.js`, none of which is world content. three.js `generateUUID` also calls it, which the determinism tests show doesn't leak into the world.

### 1b. Decorrelate per-lot choices — done

- Perlin now only decides districts (`typeNoise`, factor 0.0017). Every per-lot choice (variant, rotation, height, material, ad model, topper, rare material, big-block ads, storefront material, city light hue) is an independent hash with its own salt.
- Rates were matched to what the old clamped noise actually produced, not its nominal thresholds:
  - toppers on 6% of eligible lots (the old `> 0.998` hit about 6.6%);
  - big-block ads 55%;
  - rare big-building materials 10%.
- Spotlights stay restricted to `s_03_03`, whose roof their 160 × scale height fits. They are placed at 5% of those lots, the same overall rate as before.
- `test/generation.test.js` asserts variant, rotation and height are independent. If you ever read rotations back from meshes, use the quaternion: three.js's Euler for a 180° `rotateY` comes back as y = 0 with x = z = π.

### 2. Split generation from rendering — done

- `src/generation/` holds pure functions that return plain data: `generateBlock`, `generateTrafficCell` and `cityLightHue`.
- The `GeneratorItem_*` classes are thin builders that take a context object (seed, noise, assets, scene, collider, player, city light pool). `Game.init()` passes it through `Generator`.
- `window.game` is gone. `PlayerCar` and `AssetManager` take their dependencies as parameters, and `GeneratorUtils.js` was folded into `src/generation/`.
- **Trap:** `generateBlock` returns one ordered list. Mesh creation order decides ties in three.js render sorting, so the builder creates meshes in that order: decorations enter the scene as they are created, ground and buildings afterwards. Regrouping the list by kind breaks pixel neutrality.
- Advert material switches use their own `'advert-switch'` stream at the advert's position, so the data only carries the initial state.
- Next step if wanted: move `generateBlock` into a worker. It already depends only on the seed, the Perlin instance and the position.

### 3. Generator bugs — done

- **Teleport crash:** a jump of `cell_count` cells or more (crash respawn) now removes everything and rebuilds.
- **Corner leftovers:** `add_items` removes items that end up outside the disc after a shift.
- The effect on the frames was tiny: one distant traffic car and a slightly different city light assignment in drive-9746-f0360 (0.001%).
- Both former `it.fails` tests are now `it`, plus teleports along x and along both axes.

### 4. Performance

- **Measure first — done.** `?stats=1` shows an overlay (`src/ui/stats.js`), and `npm run perf` flies drive mode in Chromium on the real GPU and prints it every second.
  - Baseline (2026-09-30, Apple M5, 1920×1080, seed 9746): 175–220 fps, about 2,000 draw calls (all passes), about 1.05 M triangles and about 8,600 scene objects.
  - CPU: update about 0.3 ms, render about 5.3 ms. The frame is CPU-bound in three.js traversal and draw submission, which is what instancing cuts.
  - The worst frame per half second stayed under 9 ms, so row construction isn't a visible hitch on this machine.
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
