# SynthCity 2026 (React + R3F)

SynthCity is an interactive WebGL experience: drive a flying car through a cyberpunk city. This fork modernizes the original Three.js app with React, Vite, and React Three Fiber (R3F) while preserving the core visual style and gameplay. It also adds a finite city mode with district-based generation, JSON layout import/export, and a standalone asset viewer.

![Screenshot](https://jeff-beene.com/synthcity/screenshots/readme.jpg)

## Quick Start

Requirements: Node.js (LTS recommended).

```bash
npm install
npm run dev
```

```bash
npm run build && npm run preview   # production build
npm run typecheck                  # TypeScript check
```

## Controls

- **Mouse**: look / steer
- **Mouse wheel**: zoom
- **W/S**: boost / brake
- **Space**: toggle autopilot
- **+/-**: volume
- **]**: skip song
- **P**: pause song
- **Esc**: open terminal

## URL Parameters

All parameters can be combined freely.

| Param | Values | Notes |
|-------|--------|-------|
| `quickstart` | (presence) | Skip splash screen, auto-launch |
| `mode` | `drive`, `freeroam` | Player control scheme |
| `city` | `procedural`, `finite` | World generation (default: procedural) |
| `layout` | filename | Load layout from `public/layouts/`; implies `city=finite` |
| `seed` | integer | World seed |
| `quality` | `low`, `medium`, `high` | |
| `fps` | `0`, `30`, `60`, `120` | 0 = unlimited |
| `resolution` | `0.5`, `0.75`, `1`, `1.5` | Render scaling |
| `preset` | preset ID | Visual preset |
| `windshield` | `simple`, `advanced` | |
| `music` | `0`, `1` | |
| `sfx` | `0`, `1` | |

**Visual preset IDs:** `default`, `intense-neon`, `blade-runner`, `retro-crt`, `hypercolor`

**Examples:**
```
?quickstart
?quickstart&city=finite&seed=42&preset=blade-runner
?quickstart&layout=my_city.json
?quickstart&mode=freeroam&city=finite&quality=high
?mode=assets
```

## Finite City Mode

A static, explorable city generated from a seed instead of streaming chunks.

```
?city=finite&quickstart
```

The city uses a **district system** — named zones that bias building density and type per region:

| District | Character |
|----------|-----------|
| Downtown | Dense towers, landmark buildings, slim towers in small slots |
| Industrial | Mid-size buildings, no towers |
| Residential | Mostly small buildings |
| Outskirts | Sparse |

### Landmark Buildings

Unique high-quality buildings guaranteed to appear exactly once per city in the downtown area. Placement is noise-driven (varies by seed) but presence is always guaranteed.

### JSON Layout Export/Import

Any generated layout can be exported to JSON and reloaded:

```
?layout=my_city.json&quickstart
```

Drop the JSON file in `public/layouts/`. The `?layout=` param implies `city=finite`.

## Asset Viewer

Standalone mode for inspecting all registered building models:

```
?mode=assets
```

- **Single view**: orbit camera around one model; `←`/`→` to cycle, `Tab` to switch views
- **Gallery view**: all models in a 4-column grid with labels
- All series shown: Small, Large, Tower, Slim Tower, Landmark

## Building Registry

`src/config/buildingRegistry.ts` is the single source of truth for all building models. Adding a building (OBJ or GLB) requires only one entry in the registry — asset loading, emissive setup, instanced mesh keys, and manifest entries are all auto-derived.

**Series:**

| Series | ID | Placement |
|--------|----|-----------|
| Small | s_01–s_03 | 2×2 sub-grid per block |
| Large | s_04 | One per block |
| Tower | s_05 | One per block, rare |
| Slim Tower | s_06 | 2×2 sub-grid, downtown only |
| Landmark | landmark_xx | Once per city, downtown |

## What Changed from Original

- React + Vite app shell with R3F-managed rendering
- Procedural generation renders declaratively via React components
- Game logic remains in classes; visuals split into R3F components
- Systems layer for GameBridge, Generator, Player, Audio, PointerLock
- TypeScript for React/R3F/UI layer (legacy classes remain JS)
- Manifest-based asset loading with lazy material factories
- GLB multi-material support via auto-merged geometry groups
- Building instancing via `InstancedMesh` for small/large/tower/slim tower/landmark buildings
- Pooled traffic visuals
- Enhanced visual effects system with presets and per-category emissive intensity
- Finite city mode with district system, landmarks, slim towers, JSON import/export
- Asset viewer for model inspection
- URL query parameter system for configuring all settings at launch
- Blender baking script (`scripts/bake_model_textures.py`)

## Project Structure

```
src/
  config/
    buildingRegistry.ts          # All building model definitions (single source of truth)
    settings.ts                  # Default game settings
    querySettings.ts             # URL param parsing
    world.ts                     # World constants
    environments.ts              # Night/day environment presets
    cityLayouts/
      types.ts                   # Layout + district types
      districts.ts               # District biases + DEFAULT_DISTRICTS
      generateLayout.ts          # Finite city generator (noise + districts + landmarks)
      export.ts                  # exportLayoutToJSON()
      import.ts                  # loadLayoutFromURL()
      index.ts                   # Barrel exports
  types/
    settings.ts                  # GameSettings, CityMode, QualityLevel, etc.
    game.ts                      # GameRuntime, RuntimeCollider, etc.
  scene/
    systems/
      SynthCityScene.tsx         # R3F canvas + system composition + city mode routing
      GameBridge.tsx             # Game init, camera, post-processing
      GeneratorSystem.tsx        # Procedural city blocks, traffic, lights
      FiniteCitySystem.tsx       # Finite city ground, buildings, collision, walls
      PlayerSystem.tsx           # Player updates + car visuals
      AudioSystem.tsx            # Music/SFX lifecycle
      PointerLockSystem.tsx      # Pointer lock management
      AssetViewerScene.tsx       # Standalone asset inspector canvas
    visuals/
      useBuildingInstances.ts    # InstancedMesh setup for all building series
      useMegaBuildingInstances.ts
      InstancedBuildings.tsx
      InstancedMegaBuildings.tsx
      PlayerCarVisuals.tsx
      TrafficCarVisuals.tsx
      CityBlockVisuals.tsx
      CityBlockUpdateableVisuals.tsx
    effects/
      VisualPresets.ts           # Post-processing preset definitions
  assets/
    AssetManager.ts              # Manifest loader, GLB merging, material storage
    manifests/
      models.ts                  # Model manifest (auto-populated via registry)
      textures.ts
      materials.ts
    types.ts                     # Emissive intensity config
  controllers/
    usePlayerController.ts
  context/
    GameContext.tsx
  ui/
    UiShell.tsx
    AssetViewerUI.tsx
  classes/
    (legacy state classes — remain JS)
scripts/
  bake_model_textures.py         # Blender texture baking script
public/
  assets/                        # Textures, models (OBJ + GLB), audio
  layouts/                       # JSON city layout files (loaded via ?layout=)
```

## Credits

- Bladerunner Sedan 3d Model - Quaz30 [sketchfab.com/quaz30](sketchfab.com/quaz30)
- Sound FX - Various contributors on [freesound.org](https://freesound.org)
- Music from [#Uppbeat](https://uppbeat.io/) (free for Creators!)
  - prigida, pecanpie, mountaineer, d0d, fass, tatami, kaleidoscope, noisecake, moodmaze, bosnow, tecnosine

## Support (please support the original author!)

:coffee: [Buy me a coffee](https://www.paypal.com/donate/?business=DV5PFYEPQ59W4&no_recurring=0&item_name=Want+to+support+my+side-projects+or+buy+me+a+coffee?+Feel+free+to+leave+a+donation+below%21&currency_code=USD)
