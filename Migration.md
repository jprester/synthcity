# Migration Notes

This document summarizes the modernization work from the original Three.js app to the current React + Vite + R3F architecture.

## Overview

- Rendering is now owned by React Three Fiber (R3F).
- Legacy classes are retained for simulation/state, but visuals are rendered declaratively in React.
- UI and boot flow are React-driven (Terminal + Settings).
- Audio and pointer lock are handled by dedicated R3F systems.

## Key Architectural Changes

1. **React + Vite + R3F**
   - R3F owns the render loop and renderer.
   - The scene is composed in `src/scene/systems/SynthCityScene.tsx`.

2. **Systems vs Visuals**
   - Systems live in `src/scene/systems/` and own updates/side-effects.
   - Visuals live in `src/scene/visuals/` and render meshes/lights based on class state.

3. **Classes are state-only**
   - Classes in `src/classes/` now keep simulation state.
   - Visual meshes/lights are created in React components, not in classes.
   - Colliders remain class-owned because they are used by BVH collisions.

4. **TypeScript**
   - TS is enabled for React/R3F/UI.
   - Legacy classes remain JS (`allowJs` in `tsconfig.json`).

5. **Folder renames**
   - `src/r3f` -> `src/scene`
   - `src/game` -> `src/context`

## Notable Migrations

- **Generator**
  - City blocks render via `CityBlockVisuals`.
  - Updateables (ads/topper/smoke/spotlight) render via `CityBlockUpdateableVisuals`.
  - Traffic cars render via `TrafficCarVisuals`.
  - City lights are now data descriptors rendered with `<pointLight>`.

- **Player**
  - `PlayerCar` is state-only (pose tracked via `carPose`).
  - Visual car meshes/light are rendered via `PlayerCarVisuals`.

- **Audio**
  - Lifecycle handled in `AudioSystem`.

- **Pointer Lock**
  - Handled in `PointerLockSystem`.

## Known Legacy Dependencies

- `public/js/alea.js` and `public/js/proc-noise.js` provide global `Perlin` noise.
- Assets are served from `public/assets/`.

## Suggested Next Steps

- Consider typing generator/visual descriptor shapes more strictly.
- Optional: migrate remaining class-level mesh construction to descriptors.
- If desired, move Perlin into a module import to remove global dependency.
