# AI Agent Guide

This repo is a modernized fork of SynthCity (React + Vite + R3F). This guide helps agents make consistent changes quickly.

## Architecture Summary

- **R3F owns rendering.** Do not reintroduce manual renderer/composer loops.
- **State lives in classes** (`src/classes/`). They update positions/values and manage collisions.
- **Visuals live in React** (`src/scene/visuals/`). They build meshes/lights and bind to class state.
- **Systems** (`src/scene/systems/`) coordinate updates and side effects.
- **UI** lives in `src/ui/` and is fully React-driven.

## Key Paths

- `src/scene/systems/` – GameBridge, Generator, Player, Audio, PointerLock
- `src/scene/visuals/` – Visual mesh/light components
- `src/controllers/` – Input hooks
- `src/context/` – Shared app/game state
- `src/classes/` – Legacy state logic (keep JS)
- `public/assets/` – Models, textures, sounds

## Conventions

- Prefer React/R3F declarative visuals.
- Keep class objects state-only (pose, rotation, velocity, etc.).
- If a class must create a collider mesh, call `updateMatrixWorld(true)` after transforms.
- Avoid adding `window` globals.
- TypeScript is used for React/R3F/UI; classes remain JS.

## Commands

- `npm run dev` – local dev server
- `npm run build` – production build
- `npm run preview` – local preview
- `npm run typecheck` – TypeScript check

## Known Globals

- `Perlin` is provided by `public/js/proc-noise.js` (global). Avoid refactoring unless replacing with a module.

## Common Tasks

- **Move visuals**: create a component in `src/scene/visuals/` and bind to class state.
- **New update loop**: add a system in `src/scene/systems/`.
- **UI changes**: use `src/context/GameContext.tsx` for shared state.

## Don’ts

- Don’t reintroduce `window.game` or other global state.
- Don’t move class logic into React components unless asked.
- Don’t remove collision meshes unless you migrate collision logic too.
