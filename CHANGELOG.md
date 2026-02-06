# 0.3.1

- Replaced baked dark skyscraper model (`dark-skyscraper.001_baked.glb`) with new multi-material GLB (`dark_skyscraper_new2.glb`) for building slot `s_04_04`
- Added multi-material GLB support via `mergeGLTFMeshes()` in AssetManager
  - GLTFLoader mesh groups are merged into a single geometry with material groups using `BufferGeometryUtils.mergeGeometries`
  - InstancedMesh supports `Material[]` natively with geometry groups
- Added embedded GLB material system (`useEmbeddedMaterial` option in model manifest)
  - Embedded materials stored under `__embedded_{modelKey}` keys
  - `MODELS_WITH_EMBEDDED_MATERIALS` set controls which models use embedded vs external materials
- New GLB building models: `sci-fi-building-9_1.glb` (s_04_03), `sci-fi-building-6_1.glb` (s_05_01), `futuristic-tower.glb` (s_05_02)
- Added Blender baking script (`scripts/bake_model_textures.py`) for texture baking with BakeUV support
- Emissive texture improvements: disabled mipmaps on emissive maps for crisp window lights at distance
- Per-material emissive intensity control via `BASE_EMISSIVE_INTENSITIES` in types.ts

# 0.3.0 - Building Instancing & GLB Model Support

- Implemented building instancing for improved rendering performance (`ad74883`)
- Added 2 new GLB building models: `sci-fi-building-6_1.glb`, `sci-fi-building-9_1.glb` (`8b3c4f6`)
- Added embedded material support for GLB models with `useEmbeddedMaterial` manifest option (`13d8092`)
- Unified emissive handling and material consistency across OBJ and GLB pipelines (`2d4d730`)
- Added 4th building variant (`s_04_04`) to city block generation (`28c2560`)
- Added Blender texture baking script (`scripts/bake_model_textures.py`) (`8df0fbf`, `4308616`)

# 0.2.1 - Code Organization & Cleanup

- Refactored code to use centralized config, constants, and utility helpers (`62a33d8`)
- Moved game classes into proper `src/classes/` folder structure (`0cd2834`)
- Added architecture documentation (`ARCHITECTURE.md`) (`f140767`)
- Added emissive property to smoke particles (`28f638e`)
- New and improved ad sprites (`82309a8`, `cd92af0`)

# 0.2.0 - Asset Refactor, Performance & Visual Effects

- Refactored asset management system: manifest-based loading, material factories, LegacyAssetManager (`e2bddf8`)
- Instanced rendering for mega buildings (`f75d4e9`)
- Pooled traffic visuals for reduced memory usage (`23ac018`)
- Enhanced visual effects system with presets and dynamic rendering options (`c856f5a`)
- Dynamic emissive intensity control and per-group visibility settings (`9df4034`)
- Performance monitoring components for R3F (`47be804`)
- Quality and performance options in settings panel (`61847bc`)
- Fixed city lights issue (`5bcdaca`)
- Added interior light to player car (`1480c55`)

# 0.1.1 - SynthCity 2026 Rework (Initial)

- React + Vite app shell with R3F-managed rendering
- Procedural generation now renders declaratively via React components
  - CityBlockVisuals, CityBlockUpdateableVisuals, TrafficCarVisuals, PlayerCarVisuals
  - GeneratorSystem coordinates spawning/despawning in `useFrame`
- Game logic remains in classes (`src/classes/`), visuals split into R3F components (`src/scene/visuals/`)
- Systems layer (`src/scene/systems/`) for GameBridge, Generator, Player, Audio, PointerLock
- Restructured game context and player controller (`usePlayerController` hook)
- Audio, pointer-lock, and UI flow handled in React systems
- TypeScript enabled for the React/R3F/UI layer (legacy classes remain JS)
- Ported terminal/settings UI into React, removed jQuery dependency
