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
   - Triggers `onAssetsLoaded` callback when ready

3. **Game class** (`src/classes/Game.js`) constructor initializes:
   - Collision system (BVH-accelerated raycasting)
   - World constants: `cityBlockSize = 128`, `roadWidth = 24`
   - Environment presets (night/day with fog, sun, ambient settings)

4. **game.init()** is called on user interaction:
   - Creates Player or PlayerCar based on mode
   - Sets `isRunning = true`

---

## Generator System (Procedural City)

**GeneratorSystem** (`src/scene/systems/GeneratorSystem.tsx`) handles streaming content around the player using a grid system:

| Generator | Grid Size | Radius | Purpose |
|-----------|-----------|--------|---------|
| CityBlock | 152 (128+24) | 40 blocks | Buildings, decorations |
| Traffic | 152 | 12 blocks | Flying cars |
| CityLight | 608 (4x scale) | 8 blocks | Point lights |

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

| Component | File |
|-----------|------|
| Entry Point | `src/main.tsx`, `src/App.tsx` |
| Context | `src/context/GameContext.tsx` |
| Game Logic | `src/classes/Game.js` |
| Player Logic | `src/classes/Player.js`, `src/classes/PlayerCar.js` |
| Generators | `src/classes/GeneratorItem_*.js`, `src/scene/systems/GeneratorSystem.tsx` |
| Systems | `src/scene/systems/*.tsx` |
| Visuals | `src/scene/visuals/*.tsx` |
| Assets | `src/assets/AssetManager.ts` |
| Controllers | `src/controllers/usePlayerController.ts` |
| UI | `src/ui/UiShell.tsx` |
