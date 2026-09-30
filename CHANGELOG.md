# Unreleased

- Build with Vite instead of webpack (`npm run dev`, `npm run build`); built output is no longer committed
- ES modules throughout; jQuery and CDN dependencies removed, font self-hosted
- Launch settings via query params (`seed`, `mode`, `music`, `sfx`, `scale`, `windshield`)
- ESLint, Prettier, Vitest (noise, generator grid, city layout snapshots)
- Deterministic visual regression harness (`npm run visual:compare`)
- Agent guide (AGENTS.md, CLAUDE.md)
- Removed unused assets and code (music.wav, Shaders.js, unused CSS)

# 1.0.6

- Collision detection
  - Implemented `three-mesh-bvh`
  - New Collider class manages collision with nearby meshes
  - Upon collision, car resets to origin
- Improved car handling
  - Tightened up steering
  - Use `W` or `Shift` to boost
  - Use `S` to brake
- PointerLock fix
  - Enter button fade in effect sometimes caused pointer lock to fail

# 1.0.5

- Added `uiOnUnfocus` query param (for Wallpaper Engine)

# 1.0.4

- Added master volume control (plus/minus keys)
- Added min/max altitude for car
- Added chime sound for autopilot engage/disengage

# 1.0.3

- Initial release!
