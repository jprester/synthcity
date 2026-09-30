# Handoff: epic/2026-agent-rework

Status and next steps for continuing this rework in a local Claude Code session. Read [AGENTS.md](../AGENTS.md) first for the project rules, commands and architecture. This document covers what's done, what's left, and what I learned along the way that isn't obvious from the code.

`main` keeps the legacy state. All rework happens on `epic/2026-agent-rework`, with no pull requests.

## Where things stand

The tooling pass is complete, and tasks 1a (seed-driven decorations, traffic and building hues) and 1b (hashed per-lot choices) are done. Before those two deliberate visual changes, the game rendered pixel-for-pixel the same as the original webpack build at `5a4ee0d`.

- **Build:**
  - Vite replaces webpack; built output is no longer committed.
  - The app uses ES modules throughout: Alea/Perlin are in `src/lib/`, and the terminal UI is `src/ui/terminal.ts` without jQuery.
  - The font is self-hosted.
  - Launch settings can be preset with query params (`src/settings.ts`).
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

- `test/generation.test.ts` snapshots the plain data from `generateBlock` for a 13×13 block area (seed 9746), with no stubs. It also checks determinism, independence from `Math.random`, and distributions.
- `test/cityLayout.test.ts` runs the three.js builders (`GeneratorItem_CityBlock`, `GeneratorItem_Traffic`) with a fake context from `test/helpers.ts`. It records every building, ground tile and decoration mesh (model/material, position, rotation, scale) for seeds 9746 and 6362.
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

## TypeScript — done

- All of `src/` and `test/` are strict TypeScript.
- `npm run typecheck` (`tsc -p .`) is part of `npm run check`.
- The vendored `src/lib/*.js` keep hand-written `.d.ts` files.
- three-mesh-bvh's own type augmentation targets a module path `@types/three` doesn't expose, so `src/types/three-mesh-bvh.d.ts` repeats it.
- `@types/three` is pinned to match `three`; bump both together.
- `package.json` `overrides` pins `ignore` to 7.0.10: the registry lists 7.0.11 but its tarball 404s. Remove the pin once installs work without it.

## Decisions

1. **Keep or re-roll the curated cities.** Decided: 1b was accepted, so seeds 9746, 6362, 4217 and 5794 now produce different (still district-identical) cities. Re-curating the seed list in `src/settings.ts` is optional.
2. **Building hue source.** Decided and done: `AssetManager.setBuildingHues(seed)`, called from `Game.init()`, sets each building material's pale emissive hue from the world seed.
3. **three.js version.** Decided: upgraded to r186, keeping the r159 bloom and FXAA passes so the look doesn't change (task 8).

## Tasks

Suggested order. Each task lists what "done" looks like and the traps I know about.

### 1a. Seed-driven decorations and traffic — done

`src/hash.ts` provides `hashFloat`/`hashRandom` keyed by (seed, position, purpose salt).

- Decorations get a stream per lot, and traffic gets a stream per cell.
- Each car has a fixed turn-around distance. The traffic count distribution (re-rolled per loop iteration) is unchanged.
- Building emissive hues come from the seed (decision 2).
- The only `Math.random` left is in `Radio.ts`, `ui/terminal.ts` and `settings.ts`, none of which is world content. three.js `generateUUID` also calls it, which the determinism tests show doesn't leak into the world.

### 1b. Decorrelate per-lot choices — done

- Perlin now only decides districts (`typeNoise`, factor 0.0017). Every per-lot choice (variant, rotation, height, material, ad model, topper, rare material, big-block ads, storefront material, city light hue) is an independent hash with its own salt.
- Rates were matched to what the old clamped noise actually produced, not its nominal thresholds:
  - toppers on 6% of eligible lots (the old `> 0.998` hit about 6.6%);
  - big-block ads 55%;
  - rare big-building materials 10%.
- Spotlights stay restricted to `s_03_03`, whose roof their 160 × scale height fits. They are placed at 5% of those lots, the same overall rate as before.
- `test/generation.test.ts` asserts variant, rotation and height are independent. If you ever read rotations back from meshes, use the quaternion: three.js's Euler for a 180° `rotateY` comes back as y = 0 with x = z = π.

### 2. Split generation from rendering — done

- `src/generation/` holds pure functions that return plain data: `generateBlock`, `generateTrafficCell` and `cityLightHue`.
- The `GeneratorItem_*` classes are thin builders that take a context object (seed, noise, assets, scene, collider, player, city light pool). `Game.init()` passes it through `Generator`.
- `window.game` is gone. `PlayerCar` and `AssetManager` take their dependencies as parameters, and `GeneratorUtils.ts` was folded into `src/generation/`.
- **Trap:** `generateBlock` returns one ordered list. Mesh creation order decides ties in three.js render sorting, so the builder creates meshes in that order: decorations enter the scene as they are created, ground and buildings afterwards. Regrouping the list by kind breaks pixel neutrality.
- Advert material switches use their own `'advert-switch'` stream at the advert's position, so the data only carries the initial state.
- Next step if wanted: move `generateBlock` into a worker. It already depends only on the seed, the Perlin instance and the position.

### 3. Generator bugs — done

- **Teleport crash:** a jump of `cell_count` cells or more (crash respawn) now removes everything and rebuilds.
- **Corner leftovers:** `add_items` removes items that end up outside the disc after a shift.
- The effect on the frames was tiny: one distant traffic car and a slightly different city light assignment in drive-9746-f0360 (0.001%).
- Both former `it.fails` tests are now `it`, plus teleports along x and along both axes.

### 4. Performance

- **Measure first — done.** `?stats=1` shows an overlay (`src/ui/stats.ts`), and `npm run perf` flies drive mode in Chromium on the real GPU and prints it every second.
  - Baseline (2026-09-30, Apple M5, 1920×1080, seed 9746): 175–220 fps, about 2,000 draw calls (all passes), about 1.05 M triangles and about 8,600 scene objects.
  - CPU: update about 0.3 ms, render about 5.3 ms. The frame is CPU-bound in three.js traversal and draw submission, which is what instancing cuts.
  - The worst frame per half second stayed under 9 ms, so row construction isn't a visible hitch on this machine.
- **Instancing — buildings and ground done.**
  - `src/classes/InstancePool.ts` keeps one `InstancedMesh` per (geometry, material). Slots are allocated and freed as blocks stream, and freed slots are refilled by swapping in the last instance.
  - It frustum culls per instance each frame (`Game.animate` calls `cull(camera)`), with the same bounding-sphere test three.js uses per mesh. Without that, triangles went from 1.05 M to 4.2 M and fps dropped by a third.
  - Result: about 650 draw calls instead of 2,000, and about 2,700 scene objects instead of 8,600. At 960×540 that's about 370 fps instead of about 275. At 1080p the M5 is GPU-bound (bloom and fill rate), so it's a wash there.
  - Collision uses the off-scene `Mesh` each building still has as a proxy, with its world matrix computed once.
  - Visual: about 20 isolated edge pixels per frame (0.002%) from the GPU multiplying the instance matrix instead of a CPU-premultiplied model-view matrix.
  - Still separate meshes: adverts (their material switches), toppers, smoke and spotlights. Adverts are the next candidate: about 2,000 more objects. A switch would move the instance to another batch, and additive blending without depth write makes their order irrelevant.
- **Spread construction over frames.** Crossing a cell boundary builds a whole row of about 40 blocks in one frame. Queue new blocks and build a few per frame, nearest first.
- **Smaller costs.**
  - `Smoke` and `Spotlight` call `lookAt` every frame for every instance.
  - `Collider.intersectsSphere` allocates an `Object3D`, a `Matrix4` and a `Sphere` per mesh per frame (`Collider.ts:41–50`).

### 5. Frame-rate independence — done

- `Game.animate` takes the rAF timestamp and computes `k`, the frame time in 60 Hz frames (`src/classes/frameRate.ts`). The first frame counts as one nominal frame, `k` is capped at 4, and float noise around 60 Hz snaps to exactly 1.
- `k` is passed through `Generator.update(k)` to every item and decoration, and to `Player`/`PlayerCar`.
- The maths:
  - increments: `x += v * k`
  - per-frame damping: `decay(f, k) = f^k`
  - easing (camera slerp, FOV): `ease(a, k) = 1 − (1 − a)^k`
- At `k = 1` everything reduces to the original maths bit for bit, so the 60 Hz harness stays at 0.000%.
- `test/frameRate.test.ts` simulates the same wall-clock time at 30/60/144 Hz. The car, freeroam flight and traffic end up within 2% of the same place.
- The fade-in used accumulated time. It now follows the same ~2.6 s ease-in curve by elapsed time, and master volume follows it.
- Not scaled: mouse look. `PlayerController` keeps only the last `mousemove` of a frame rather than summing them, so look speed still depends on mouse polling and frame rate. Summing the movement would fix it but makes look much more sensitive, so it needs re-tuning `mouse_sensitivity` by feel.
- Still open from task 6: collision is enabled after the first frame via a flag.

### 6. Smaller fixes

Done:

- `Collider.remove` ignores unknown uuids (it used to `splice(-1, 1)`) and also drops the mesh from `meshesInRange`. `intersectsSphere` no longer allocates per mesh. `test/collider.test.ts` checks it against the original maths.
- The FXAA resolution uniform is updated on resize.
- Input uses the `wheel` event (Firefox line deltas scaled to pixels) and `event.button`.
- `Player` and `PlayerCar` share the camera-look code, `angleDist` and `clamp` (`src/classes/cameraLook.ts`).
- Crash handling runs in the frame loop: a 2 s `crashTimer` scaled by `k` and a `respawn()` method. The UI is told through an `onCrash` callback (`src/ui/hud.ts`) instead of `PlayerCar` touching the DOM with `setTimeout`.
- `?env=day` selects the original's unused day environment: an orange haze, with no window lights, city lights or spotlights. Night stays the default.

Open:

- **FXAA runs before bloom** (`Game.ts`). Moving it after bloom changes the look slightly, so it's an art-direction decision, not a fix.
- Collision is enabled after the first frame via a flag (`Game.animate`); it could start enabled once the first frame's matrices exist.
- The day environment isn't in the settings form or the visual shot list yet.

### 7. Assets

The repo carries about 105 MB of assets. The two biggest cuts:

- **Audio:** WAV to Opus or MP3. `city_ambient.wav` is 14 MB, `traffic_ambient.wav` 10.5 MB, `car_ambient.wav` 3.3 MB, `car_wind.wav` 3.1 MB. This is lossy, so listen before committing.
- **Models:** OBJ to glTF with meshopt or Draco compression, then switch `AssetManager` to `GLTFLoader`. Geometry must stay identical: vertex order, and the `rotateY(-π/2)` applied to the spinner models. Run `visual:compare`.
- **Textures:** optionally convert to KTX2/Basis. Compression artefacts are a visual change, so review them.
- **Asset manifest — done.** `src/assets/manifest.ts` lists every texture and model in load order, with its options. `AssetManager` loads it and only hand-writes the materials, which must keep their creation order (material ids break ties in render sorting). `test/models.test.ts` checks that manifest files exist, keys are unique, every OBJ in the folder is listed, and models have consistent attributes.
- **Car textures** are lossless WebP (14 → 10 MB, identical pixels).

### 8. three.js upgrade — done (r159 → r186)

- `three` 0.186.1, `@types/three` 0.186.0 and `three-mesh-bvh` 0.9.15, all pinned exactly. Imports use `three/addons/...`.
- **Look preserved.** r186 changed UnrealBloom's blur kernel (roughly double the bloom at strength 7), the bloom's luminance weights and the FXAA implementation. Unmodified, the city came out washed out, with 90% of pixels different. Those three files are vendored from r159 in `src/lib/three-r159/` (see its README). With them, r186 renders within 0.008% of r159, and the baseline was re-recorded on r186.
- Moving to the current bloom/FXAA is an intentional look change: drop the vendored files and re-tune bloom strength/radius.
- The image is still composed as before: the base is tone mapped, and the bloom is added raw on top (see below).
- three-mesh-bvh 0.9 types `boundsTree` as the generic `GeometryBVH`; `Collider` casts it to `MeshBVH`, which mesh geometry builds. Its type augmentation now works, so the local one was removed.
- **How the image is composed today (keep it when upgrading).** Scene → FXAA (linear render targets) → UnrealBloom. As the last pass, UnrealBloom first draws the scene image to the screen with a `MeshBasicMaterial`, which applies ACES tone mapping, exposure and sRGB conversion. It then adds the bloom on top with a plain copy shader: no tone mapping, no colour conversion. So the base image is tone mapped but the bloom is added raw, and that is a large part of the look. `OutputPass` would tone map after bloom instead, which is a different look.

### 9. Optional

- **CI — done.** `.github/workflows/check.yml` runs `npm run check` on pushes to this branch and on pull requests, then `visual:compare` with Playwright's Chromium, uploading diff images when frames differ. It hasn't run yet (nothing pushed).
- **Type checking — done** (see TypeScript above).
- **UI.** The terminal UI works but is hand-rolled; leave it unless you want to change it. If you do, keep the DOM ids the harness uses.

## Districts — done

- `src/generation/districts.ts`: a second noise map (frequency 0.0006, sampled far from the density map) picks a kind per 4×4-block neighbourhood, so borders follow roads.
- Kinds and shares (quantiles over many seeds): industrial ~15%, residential ~18%, mixed ~32%, neon ~17%, downtown ~18%.
- Each kind is a row in `DISTRICT_STYLES`:
  - density thresholds (empty / small lots / big blocks / towers / mega buildings);
  - small-lot building groups and a height multiplier;
  - ad rules;
  - topper, spotlight and smoke chances;
  - city-light hue range.
- `mixed` is the original generator. `generation.test.ts` pins that by comparing it with the pre-district snapshot. Other tests check each kind's character and coverage.
- Tuning notes:
  - Neon toppers were halved (0.25 → 0.12) because many near the camera blow out under the bloom.
  - Close-up ads still blow out. The default seed's drive spawn (downtown) has one filling the windshield; that's the ad-art task.
- Review tools: `?at=x,z&alt=&yaw=&pitch=` starts the camera anywhere, and the stats overlay shows the district kind under the camera.

## Wall signs (ads) — done, step 1

Ads are signs placed on buildings' real walls, sized by their art. They are no longer art stretched onto the old ad-wrap models.

- **Art atlases:** `scripts/assets/build_ad_atlases.py <src>` packs the user's generated art into `ads_neon.webp` (141 neon shop signs) and `ads_posters.webp` (143 posters and ads-v2 designs), with rectangles in `src/assets/adAtlases.json`. Source: `~/Projects/software_dev/my_projects/future-cityscape/code/three-agent-template/art/external/textures/` (`signs/catalog.json`, `ads-v2/PROMPTS.md`, `signs-src/exclude.txt`).
- **Walls:** `node scripts/assets/extract_facades.mjs` (~25 s) finds each building model's flat vertical walls.
  - It samples them on a 3-unit grid and keeps a cell only where the surface is really there and an outward ray leaves the building without hitting it again. That excludes courtyards, notches between wings and inner walls.
  - It covers the usable cells with the largest rectangles (at most 60 per model) and writes `src/assets/facades.json`, in model space: normal, plane offset, extent along the wall, height range.
  - Re-run it when building models change.
- **Placement** (`src/generation/signs.ts`, pure data): per building that has ads (same district gates as before), per wall rectangle:
  - Small neon signs low on the building: 14–28 units on the long side, in the lower half of the height (capped at 200 units), up to 10 per wall, density per district (`neonSigns`).
  - Big posters and designs in the 45–85% band: 35–80 units tall, one chance per ~110 units of band, at the district's `posterChance`.
  - Each sign keeps its art's exact aspect, stays inside an exposed rectangle with 2-unit margins, and never overlaps another. Everything is hashed from (seed, building).
  - Measured per building with ads (sign area in units²): downtown ~2,050, neon ~2,470, mixed higher after the last tuning, industrial ~80, residential ~135.
- **Rendering:**
  - Every sign is one instance of a unit quad in `InstancePool`. Its art rectangle is per-instance data (`INSTANCE_DATA`, a vec4 kept on the batch's own geometry, packed through growth, removal and culling).
  - `useInstanceArt` (`src/rendering/adArt.ts`) maps the quad's UVs into it in the material's vertex shader.
  - Materials `ads_neon` and `ads_posters`: emission only (black diffuse and specular), sRGB atlases, additive, no fog, emissive 0.3 (`signsEmissiveIntensity`).
  - Screens (35% of posters) switch between art of the same aspect.
  - Result: ~240 draw calls instead of ~866, and ~800 scene objects instead of ~2,700, at ~197 fps at 1080p on the M5.
- **Removed:** the `ads_s_*` ad-wrap models, the panel mapping, and `ads_01..05`. Rooftop holograms keep `ads_large_*`.
- **Tests:** `test/signs.test.ts` checks the art aspect, that each sign lies inside an exposed wall rectangle (transformed back to model space), and that a ray from each sign leaves its building (against the real model). It also checks the zones (neon low, posters in the middle band), no overlaps and determinism.
- **Step 2 — done: banners, blade signs, density.**
  - **Banners:** tall billboards down skyscrapers (buildings of 250+ units). They use tall art from both atlases, 90–360 units high, in 25–97% of the building's height.
    - They hang on a second, coarser wall scan (`banners` in `facades.json`) that treats ribbed facades (surfaces within 4 units) as one wall at their front, so towers whose walls are broken into strips still get them.
    - Posters and neon avoid the areas banners take.
    - Every skyscraper gets banner chances, even without the district's ads roll. Chances per ~70 units of wall width: downtown 0.7, neon 0.6, mixed 0.5.
    - Two sculpted towers (s_04_03, s_05_02) have no tall flat walls and stay mostly bare.
  - **Blade signs:** upright neon art sticking out perpendicular to walls that face a street (checked per sign against the block's footprint). Each is two back-to-back single-sided quads, so it reads from both sides. Share per district: `bladeShare`.
  - **Density:** raised in every district. Measured sign area per building: downtown ~4,700, neon ~3,000, mixed ~1,300; industrial and residential stay quiet.
  - **Signs sit 0.6 in front of walls:** the facade scan casts from 0.5, and ledges up to ~0.4 deep exist.
  - **Extractor fixes along the way:**
    - `-0.00` vs `0.00` in the plane key split one wall into two, giving duplicate overlapping rectangles.
    - Near-coplanar layered surfaces now keep only the front-most rectangle.
    - A test pins both.
- **Next:**
  - Rooftop billboards on frames (needs roof data; Codex's `RooftopKit` finds roofs).
  - Per-art brightness from the catalog's `gain`.
  - Collision for blade signs if flying low through them matters.

## Procedural feature ideas (after 1–5)

These fit the original vision and become cheap once generation returns plain data:

- **More districts.** Done (see above). Still open: a waterfront/void kind needs new assets (water, piers).
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
