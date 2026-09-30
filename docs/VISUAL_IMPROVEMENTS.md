# Visual improvements: first pass

This pass adds window brightness variation, rooftop equipment and antennas,
and layered night haze. Ad artwork, materials, UVs and switching logic are
left to the separate ad work. The existing r159 bloom, FXAA ordering, exposure,
sky and distance fog settings stay unchanged.

- `src/generation/buildingDetails.ts` hashes window brightness and rooftop kit
  choices independently from the existing building layout. `mixed` keeps its
  original window brightness and receives no new rooftop kits.
- `RooftopKit` finds a safe area on an actual horizontal roof triangle. It
  avoids roofs with existing toppers or spotlights, shares three primitive
  geometries/materials through `InstancePool`, and registers collision proxies.
- The pool keeps each window multiplier with its matrix through growth,
  removal and visibility packing. The material shader applies it only to
  emission, preserving the colour of the walls.
- `HeightFogPass` integrates two height bands against scene depth. Weather
  comes from hashed world neighbourhoods and remains stable across streaming
  and teleports. Haze uses half-resolution integration and depth-aware
  upsampling. Glass keeps its shading but no longer writes windshield depth
  over city depth. Day mode has no layered haze.
- Freeroam now reaches 1,800 units, allowing views above the tallest buildings.
  City ambience still fades out at 800 and stays at zero above that altitude.

The dev panel's **Sky and fog** folder has **layered haze** and **haze density**
controls. **Glow → windows** still controls the overall window intensity.
Changes in the panel remain temporary.

An aerial view for manual review:

`/?seed=9746&mode=freeroam&music=0&sfx=0&skip=1&at=0,0&alt=1400&yaw=20&pitch=-48&gui=1`

Validation covers deterministic generation, weather after teleports, emission
after instance swaps/culling, rooftop collisions/removal and high-altitude
audio. The visual shot list now includes aerial, skyline and day views, and
capture fails on shader/browser errors (apart from headless pointer-lock
errors). A resized drive shot also checks the advanced windshield. Baseline changes are intentional: subdued windows, new silhouettes
and night haze. Existing layout/data snapshots remain unchanged.

A short isolated 1920×1080 drive benchmark on the Apple M5 measured roughly
193–211 fps before and 169–178 fps after this pass: about 0.8–1 ms additional
frame time. The new work adds three rooftop batches and two haze draws. These
are short local measurements, not a cross-device performance guarantee.
