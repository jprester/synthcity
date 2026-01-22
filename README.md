# SynthCity 2026 (React + R3F)

SynthCity is an interactive WebGL experience: drive a flying car through an infinite, procedurally generated cyberpunk city. This fork modernizes the original Three.js app with React, Vite, and React Three Fiber (R3F) while preserving the core visual style and gameplay.

![Screenshot](https://jeff-beene.com/synthcity/screenshots/readme.jpg)

## What Changed

- React + Vite app shell with R3F-managed rendering.
- Procedural generation now renders declaratively via React components.
- Game logic remains in classes, while visuals are split into R3F components.
- Audio, pointer-lock, and UI flow are handled in React systems.
- TypeScript enabled for the React/R3F/UI layer (legacy classes remain JS).

## Quick Start

Requirements: Node.js (LTS recommended).

```bash
npm install
npm run dev
```

Build and preview:

```bash
npm run build
npm run preview
```

Typecheck:

```bash
npm run typecheck
```

## Controls

- Mouse: look / steer
- Mouse wheel: zoom
- W/S: boost / brake
- Space: toggle autopilot
- +/-: volume
- ]: skip song
- P: pause song
- Esc: open terminal

## Project Structure

```
src/
  scene/
    systems/
      SynthCityScene.tsx      # R3F canvas + system composition
      GameBridge.tsx          # Game init, camera, postprocessing
      GeneratorSystem.tsx     # City block, traffic, lights
      PlayerSystem.tsx        # Player updates + car visuals
      AudioSystem.tsx         # Music/SFX lifecycle
      PointerLockSystem.tsx   # Pointer lock management
    visuals/
      PlayerCarVisuals.tsx
      TrafficCarVisuals.tsx
      CityBlockVisuals.tsx
      CityBlockUpdateableVisuals.tsx
  controllers/
    usePlayerController.ts    # Input state hook
  context/
    GameContext.tsx           # Shared game + UI state
  ui/
    UiShell.tsx               # Terminal + settings UI
    initTerminal.ts           # Terminal boot sequence
  classes/
    (legacy state classes)
public/
  assets/                      # Textures, models, audio
```

### Architecture Notes

- **Classes in `src/classes/`** keep simulation state and update methods.
- **Visuals in `src/scene/visuals/`** build meshes/lights and bind to class state.
- **Systems in `src/scene/systems/`** drive update loops and side effects.
- R3F owns the render loop and renderer; classes do not manage rendering.

## Credits

- Bladerunner Sedan 3d Model - Quaz30 [sketchfab.com/quaz30](sketchfab.com/quaz30)
- Sound FX - Various contributors on [freesound.org](https://freesound.org)
- Music from [#Uppbeat](https://uppbeat.io/) (free for Creators!)
  - prigida [uppbeat.io/browse/artist/prigida](https://uppbeat.io/browse/artist/prigida)
  - pecanpie [uppbeat.io/browse/artist/pecan-pie](https://uppbeat.io/browse/artist/pecan-pie)
  - mountaineer [uppbeat.io/browse/artist/mountaineer](https://uppbeat.io/browse/artist/mountaineer)
  - d0d [uppbeat.io/browse/artist/d0d](https://uppbeat.io/browse/artist/d0d)
  - fass [uppbeat.io/browse/artist/fass](https://uppbeat.io/browse/artist/fass)
  - tatami [uppbeat.io/browse/artist/tatami](https://uppbeat.io/browse/artist/tatami)
  - kaleidoscope [uppbeat.io/browse/artist/kaleidoscope](https://uppbeat.io/browse/artist/kaleidoscope)
  - noisecake [uppbeat.io/browse/artist/noise-cake](https://uppbeat.io/browse/artist/noise-cake)
  - moodmaze [uppbeat.io/browse/artist/mood-maze](https://uppbeat.io/browse/artist/mood-maze)
  - bosnow [uppbeat.io/browse/artist/bosnow](https://uppbeat.io/browse/artist/bosnow)
  - tecnosine [uppbeat.io/browse/artist/tecnosine](https://uppbeat.io/browse/artist/tecnosine)

## Support (please support ogirinal author!)

:coffee: [Buy me a coffee](https://www.paypal.com/donate/?business=DV5PFYEPQ59W4&no_recurring=0&item_name=Want+to+support+my+side-projects+or+buy+me+a+coffee?+Feel+free+to+leave+a+donation+below%21&currency_code=USD)
