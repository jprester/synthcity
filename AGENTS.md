# AI Agent Guide

This repo is a modernized fork of SynthCity (React + Vite + R3F). This guide helps agents make consistent changes quickly.

## Architecture Summary

- **R3F owns rendering.** Do not reintroduce manual renderer/composer loops.
- **State lives in classes** (`src/classes/`). They update positions/values and manage collisions.
- **Visuals live in React** (`src/scene/visuals/`). They build meshes/lights and bind to class state.
- **Systems** (`src/scene/systems/`) coordinate updates and side effects.
- **UI** lives in `src/ui/` and is fully React-driven.

## Key Paths

- `src/config/` – World constants, environments, default settings
- `src/config/cityLayouts/` – Finite city layout types, generator, district system, export/import
- `src/types/` – Shared TypeScript contracts (`settings`, `game`)
- `src/constants/` – Colors, UI labels
- `src/utils/` – Math, angles, random helpers
- `src/scene/systems/` – GameBridge, Generator, Player, Audio, PointerLock, FiniteCitySystem, AssetViewerScene
- `src/scene/visuals/` – Visual mesh/light components
- `src/scene/effects/` – Post-processing, visual presets
- `src/controllers/` – Input hooks
- `src/context/` – Shared app/game state
- `src/classes/` – Legacy state logic (keep JS)
- `public/assets/` – Models, textures, sounds
- `public/layouts/` – JSON city layout files (loaded at runtime via `?layout=`)

## Conventions

- Prefer React/R3F declarative visuals.
- Keep class objects state-only (pose, rotation, velocity, etc.).
- If a class must create a collider mesh, call `updateMatrixWorld(true)` after transforms.
- Avoid adding `window` globals.
- TypeScript is used for React/R3F/UI; classes remain JS.
- Use centralized config: import from `src/config/` for world/environment constants.
- Use centralized utils: import math/random helpers from `src/utils/`.
- Colors and labels live in `src/constants/`.

## Commands

- `npm run dev` – local dev server
- `npm run build` – production build
- `npm run preview` – local preview
- `npm run typecheck` – TypeScript check

## Known Globals

- `Perlin` is provided by `public/js/proc-noise.js` (global).
- For TypeScript code, use `createPerlin()` from `src/utils/perlin.ts` instead of local `declare const Perlin`.

---

## Building Registry (`src/config/buildingRegistry.ts`)

Single source of truth for all building models. Asset loading, emissive setup, instanced mesh keys, and ad model keys are all auto-derived — no other files need updating when adding buildings.

### Series

| Constant | Series ID | Placement |
|---|---|---|
| `SMALL_SERIES` | s_01, s_02, s_03 | 2×2 sub-grid per block. Selection hardcoded in `GeneratorItem_CityBlock.js` — do not change. |
| `LARGE_SERIES` | s_04 | One per block, noise-driven variant selection |
| `TOWER_SERIES` | s_05 | One per block, rare (noise > threshold) |
| `SLIM_TOWER_SERIES` | s_06 | 2×2 sub-grid, downtown-only in finite city mode |
| `LANDMARK_SERIES` | landmark_xx | One instance per type per city, guaranteed in downtown |

### Adding a building (OBJ)

1. Place `.obj` + textures in `public/assets/models/`
2. Add a `{ key: "s_XX_YY", weight: N }` entry to the appropriate series in `buildingRegistry.ts`

### Adding a building (GLB with embedded materials)

1. Place `.glb` in `public/assets/models/`
2. Add an entry with `source: { format: "glb", path: "models/filename.glb", scale?: N, emissiveBase?: N }` to the appropriate series
3. That's it — manifest, emissive entry, and instanced mesh key are all derived automatically

### Adding a landmark

1. Place `.glb` in `public/assets/models/`
2. Add an entry to `LANDMARK_SERIES` in `buildingRegistry.ts`
3. No other changes needed — landmarks are guaranteed to appear once per city in the downtown district

### Adding a slim tower

1. Place `.glb` in `public/assets/models/`
2. Add an entry to `SLIM_TOWER_SERIES` in `buildingRegistry.ts`
3. Slim towers appear exclusively in the downtown district in finite city mode

---

## City Modes

Controlled by two orthogonal settings:

- **`mode`** (`"drive"` | `"freeroam"`) — player control scheme
- **`cityMode`** (`"procedural"` | `"finite"`) — world generation

### Procedural city (`cityMode: "procedural"`)

Infinite, chunk-based generation via `GeneratorItem_CityBlock.js`. Uses Perlin noise. Default mode.

### Finite city (`cityMode: "finite"`)

Static grid city generated once from a seed, or loaded from a JSON file. Implemented in `src/scene/systems/FiniteCitySystem.tsx`.

- Grid: 15×15 blocks by default, centered on origin
- Ground tiles, buildings, mega buildings, storefronts, boundary walls all placed at startup
- Collision registered with the same collider system as the procedural city

**Activate:** `?city=finite` or `?city=finite&quickstart`

---

## District System (`src/config/cityLayouts/districts.ts`)

Overlays named rectangular zones on the finite city grid to bias building type thresholds per region. Each district shifts the noise thresholds that decide whether a block is empty, small, large, or tower.

| District | Empty | Small | Tower | Character |
|---|---|---|---|---|
| `default` | 0.10 | 0.80 | 0.975 | Balanced |
| `downtown` | 0.00 | 0.30 | 0.850 | Dense, lots of towers + landmarks |
| `industrial` | 0.10 | 0.60 | 0.999 | Mid-size heavy, no towers |
| `residential` | 0.10 | 0.95 | 0.999 | Mostly small buildings |
| `outskirts` | 0.30 | 0.85 | 0.999 | Sparse |

`getDistrictBias(gi, gj, districts)` returns the bias for a block. First match wins, so district order in `DEFAULT_DISTRICTS` matters for overlapping zones.

Districts also control which building series is used in the small slot: downtown uses `SLIM_TOWER_SERIES`, all other districts use s_01–s_03.

Landmarks are always placed in the downtown district via a pre-pass in `generateLayout.ts`, regardless of noise thresholds.

---

## JSON Layout Export/Import

### Export

```ts
import { exportLayoutToJSON } from "./src/config/cityLayouts";
const json = exportLayoutToJSON(layout); // JSON string, ready to save
```

### Import via URL

Drop a JSON file in `public/layouts/` and load it with:

```
?layout=my_city.json&quickstart
```

`?layout=` implies `city=finite` automatically. Falls back to generated layout with a console warning if the file fails to load.

### Format

The `FiniteCityLayout` type is fully serializable — all values are plain numbers and strings. See `src/config/cityLayouts/types.ts` for the schema.

---

## Visual Presets (`src/scene/effects/VisualPresets.ts`)

Post-processing effect presets. Identified by kebab-case ID.

| ID | Name |
|---|---|
| `default` | Default |
| `intense-neon` | Intense Neon |
| `blade-runner` | Blade Runner |
| `retro-crt` | Retro CRT |
| `hypercolor` | Hypercolor |

**Activate via URL:** `?preset=blade-runner`

Adding a preset: add a `VisualPreset` constant and register it in `VISUAL_PRESETS` in `VisualPresets.ts`. No other files need updating.

---

## URL Query Parameters

All parameters can be combined. `quickstart` skips the splash screen.

| Param | Values | Default | Notes |
|---|---|---|---|
| `quickstart` | (presence) | — | Skip splash, auto-launch |
| `mode` | `drive`, `freeroam` | `drive` | Player control scheme |
| `city` | `procedural`, `finite` | `procedural` | World generation mode |
| `layout` | filename | — | Load from `public/layouts/`; implies `city=finite` |
| `seed` | integer | 9746 | World seed |
| `quality` | `low`, `medium`, `high` | `medium` | Rendering quality |
| `fps` | `0`, `30`, `60`, `120` | `0` | Frame rate cap (0 = unlimited) |
| `resolution` | `0.5`, `0.75`, `1`, `1.5` | `1` | Render scaling |
| `preset` | preset ID | `default` | Visual post-processing preset |
| `windshield` | `simple`, `advanced` | `simple` | Windshield shader |
| `music` | `0`, `1` | `1` | Background music |
| `sfx` | `0`, `1` | `1` | Sound effects |
| `mode=assets` | — | — | Launch asset viewer (see below) |

**Examples:**
```
?quickstart
?quickstart&city=finite&seed=42&preset=blade-runner
?quickstart&layout=my_city.json
?quickstart&mode=freeroam&city=finite&quality=high&fps=60
?mode=assets
```

---

## Asset Viewer (`?mode=assets`)

A standalone mode for inspecting all loaded building models. Completely separate from the game UI.

**Activate:** `?mode=assets`

**Controls:**
- `←` / `→` arrow keys — cycle through models (single view)
- `Tab` — toggle between single view and gallery view
- Mouse — orbit camera (drag to rotate, scroll to zoom)
- Single/Gallery buttons in top-left UI

**What it shows:**
- Every building model registered in `buildingRegistry.ts` (all series: small, large, tower, slim tower, landmarks)
- Model key, series label, format (GLB/OBJ), and index in the panel
- Gallery mode lays all models out in a 4-column grid with labels underneath

The viewer uses the same `AssetManager` as the game — models are loaded identically to how they appear in-game, so lighting and emissive materials match.

---

## Common Tasks

- **Move visuals**: create a component in `src/scene/visuals/` and bind to class state.
- **New update loop**: add a system in `src/scene/systems/`.
- **UI changes**: use `src/context/GameContext.tsx` for shared state.
- **Add constants**: add to appropriate file in `src/config/` or `src/constants/`.
- **Add utility functions**: add to appropriate file in `src/utils/`.
- **Add a building model**: see Building Registry section above. Single entry in `buildingRegistry.ts` is all that's needed.
- **Add a visual preset**: add constant + register in `VISUAL_PRESETS` in `VisualPresets.ts`.
- **Add a district type**: add bias entry in `DISTRICT_BIASES` and type to `DistrictType` in `districts.ts` / `types.ts`.

## Don'ts

- Don't reintroduce `window.game` or other global state.
- Don't move class logic into React components unless asked.
- Don't remove collision meshes unless you migrate collision logic too.
- Don't modify small building selection in `GeneratorItem_CityBlock.js` — it causes visible layout shifts.
- Don't manually update `src/assets/manifests/models.ts` or `src/assets/types.ts` for buildings — the registry derives these automatically.
