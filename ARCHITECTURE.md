# SynthCity Architecture Overview

## Entry Point & Bootstrap

The app starts in `src/main.tsx` which renders `src/App.tsx`. The App wraps everything in a `GameProvider` context and renders two main parts:

- **SynthCityScene** - The R3F Canvas with all 3D rendering
- **UiShell** - React UI overlay for settings and controls

---

## Game Initialization Flow

1. **GameContext** (`src/context/GameContext.tsx`) provides global state - settings, refs (`gameRef`, `terminalRef`), and flags like `launchReady`

2. **GameBridge** (`src/scene/systems/GameBridge.tsx`) creates the `Game` instance in a `useEffect`:
   - Passes camera, canvas, settings, controller
   - Sets up environment (fog, lighting)
   - Applies sky background when `launchReady` is true (no asset polling loop)
   - Triggers `onAssetsLoaded` callback when ready

3. **Game class** (`src/classes/Game.js`) constructor initializes:
   - Collision system (BVH-accelerated raycasting)
   - World constants imported from `src/config/world.ts`
   - Environment presets imported from `src/config/environments.ts`

4. **game.init()** is called on user interaction:
   - Creates Player or PlayerCar based on mode
   - Sets `isRunning = true`

---

## Generator System (Procedural City)

**GeneratorSystem** (`src/scene/systems/GeneratorSystem.tsx`) handles streaming content around the player using a grid system:

| Generator | Grid Size      | Radius    | Purpose                |
| --------- | -------------- | --------- | ---------------------- |
| CityBlock | 152 (128+24)   | 40 blocks | Buildings, decorations |
| Traffic   | 152            | 12 blocks | Flying cars            |
| CityLight | 608 (4x scale) | 8 blocks  | Point lights           |

### CityBlock Generator

`src/classes/GeneratorItem_CityBlock.js`:

- Uses Perlin noise to determine building types
- Places small buildings (2x2 grid), large buildings, and rare mega buildings
- Adds decorations: ads, toppers, spotlights, smoke, storefronts
- Registers collision meshes

### Traffic Generator

`src/classes/GeneratorItem_Traffic.js`:

- Spawns 3 lanes of cars per cell at varying altitudes
- Cars auto-reverse direction when far from player

### Update Cycle

Runs in `useFrame`:

- Checks if player moved to new grid cell
- Spawns/despawns generators based on proximity
- Updates all active generators

---

## Player System

### PlayerCar (Drive Mode)

`src/classes/PlayerCar.js`:

- Autopilot mode: car bobs sinusoidally, player looks around
- Manual mode: mouse controls pitch/roll
- Collision detection via `game.collider.intersectsSphere()`
- Crash freezes for 2s, then respawns

### Player (Freeroam Mode)

`src/classes/Player.js`:

- WASD movement, R/F for altitude
- Smooth quaternion-based camera look

### Controller

`src/controllers/usePlayerController.ts`:

- Captures keyboard/mouse during pointer lock
- Tracks ~20 input states

### Pointer Lock

`src/scene/systems/PointerLockSystem.tsx`:

- Source of truth is `document.pointerLockElement`
- Controller enable/disable and blocker visibility are synchronized from actual lock state
- Launch does not assume lock success; UI transitions after lock is confirmed

---

## Scene Structure

```
<Canvas>
  <FrameLimiter />
  <GameBridge />           → Environment, lighting, post-processing
  <GeneratorSystem />      → City blocks, traffic, lights
  <PlayerSystem />         → Player car visuals
  <AudioSystem />          → Audio management
  <PointerLockSystem />    → Input capture
</Canvas>
```

### Visual Components

- **CityBlockVisuals** - Static building meshes
- **CityBlockUpdateableVisuals** - Dynamic decorations (rotating ads, smoke)
- **InstancedMegaBuildings** - Uses InstancedMesh for performance
- **PooledTrafficVisuals** - Object pool for traffic cars

---

## Asset Loading

**AssetManager** (`src/assets/AssetManager.ts`):

- Manifest-based loading (textures, models, materials)
- Supports OBJ, GLB, GLTF formats
- Lazy material creation with factories
- Methods: `getModel()`, `getMaterial()`, `getTexture()`

### GLB Multi-Material Support

GLTFLoader creates separate Mesh objects per material primitive inside a Group. `mergeGLTFMeshes()` in AssetManager recombines them:

1. Extracts geometry + material from each child Mesh
2. Merges geometries via `BufferGeometryUtils.mergeGeometries(geos, true)` — the `true` flag creates indexed groups mapping to `Material[]` indices
3. Stores the merged geometry and `Material[]` array
4. InstancedMesh natively supports `Material[]` with geometry groups

### Embedded Material System

Some GLB models ship with their own PBR materials instead of using the shared external material system:

- **Model manifest** (`src/assets/manifests/models.ts`): GLB entries use `useEmbeddedMaterial: true` in options
- **Material storage**: Embedded materials are stored under `__embedded_{modelKey}` keys (e.g. `__embedded_s_04_04`)
- **Visual routing**: `MODELS_WITH_EMBEDDED_MATERIALS` set in `src/scene/visuals/useBuildingInstances.ts` controls which models use embedded vs external materials
- **Emissive intensity**: Per-material emissive intensity is configured in `BASE_EMISSIVE_INTENSITIES` (`src/assets/types.ts`)
- **Emissive maps**: Mipmaps are disabled on emissive maps (`generateMipmaps=false`, `LinearFilter`) for crisp window lights at distance

### Current GLB Model Overrides

| Slot     | GLB File                    | Notes                          |
| -------- | --------------------------- | ------------------------------ |
| s_04_03  | `sci-fi-building-9_1.glb`  | Multi-material embedded        |
| s_04_04  | `dark_skyscraper_new2.glb` | Multi-material embedded        |
| s_05_01  | `sci-fi-building-6_1.glb`  | Multi-material embedded        |
| s_05_02  | `futuristic-tower.glb`     | Multi-material embedded        |

### Loading Flow

1. `game.load()` → creates AssetManager
2. Progress shown in terminal
3. `onAssetsLoaded()` sets `launchReady = true`

---

## Data Flow Summary

```
Input (Controller)
    ↓
PlayerSystem (useFrame priority 1)
    ↓
Game.updatePlayer() → Player position/collision
    ↓
GeneratorSystem (useFrame priority 2) → Spawn/despawn content
    ↓
Visual Components → Render meshes
    ↓
EnhancedEffects → Post-processing
```

---

## Key Files Reference

| Component    | File                                                                          |
| ------------ | ----------------------------------------------------------------------------- |
| Entry Point  | `src/main.tsx`, `src/App.tsx`                                                 |
| Context      | `src/context/GameContext.tsx`                                                 |
| Config       | `src/config/world.ts`, `src/config/environments.ts`, `src/config/settings.ts` |
| Constants    | `src/constants/colors.ts`, `src/constants/labels.ts`                          |
| Utilities    | `src/utils/math.ts`, `src/utils/angles.ts`, `src/utils/random.ts`             |
| Perlin Wrap  | `src/utils/perlin.ts`                                                          |
| Shared Types | `src/types/settings.ts`, `src/types/game.ts`                                   |
| Game Logic   | `src/classes/Game.js`                                                         |
| Player Logic | `src/classes/Player.js`, `src/classes/PlayerCar.js`                           |
| Generators   | `src/classes/GeneratorItem_*.js`, `src/scene/systems/GeneratorSystem.tsx`     |
| Systems      | `src/scene/systems/*.tsx`                                                     |
| Visuals      | `src/scene/visuals/*.tsx`                                                     |
| Assets       | `src/assets/AssetManager.ts`                                                  |
| Controllers  | `src/controllers/usePlayerController.ts`                                      |
| UI           | `src/ui/UiShell.tsx`                                                          |
