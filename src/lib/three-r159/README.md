# three.js r159 post-processing

These files are copied from three.js r159. Only their import paths have been
changed.

- `UnrealBloomPass.js`: r186 changed the blur kernel (three.js #31528). The old
  kernel truncated its Gaussian at ±1σ without renormalizing, so each blur
  pass lost about a third of its energy. With SynthCity's bloom strength of 7,
  the new kernel roughly doubles the bloom and washes the city out.
- `LuminosityHighPassShader.js`: used by the bloom pass. r186 switched its
  luminance weights to Rec. 709.
- `FXAAShader.js`: r186 replaced the FXAA implementation. FXAA runs before
  bloom here, so it feeds the bloom.

The `.d.ts` files re-export the current addons' types, which have the same
public API.

To move to the current versions, drop these files, import from
`three/addons/...` and re-tune bloom strength/radius against the visual
baseline. That is an intentional look change.
