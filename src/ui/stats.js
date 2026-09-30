// Performance overlay, enabled with ?stats=1. Shows frame rate and what the
// renderer did over the last frame, summed across all post-processing passes.

const INTERVAL = 0.5; // seconds between readout updates

export class StatsOverlay {
  constructor(renderer, scene) {
    this.renderer = renderer;
    this.scene = scene;

    // the composer renders several passes per frame; count them all
    this.renderer.info.autoReset = false;

    this.el = document.createElement('div');
    this.el.id = 'stats';
    document.body.appendChild(this.el);

    this.frames = 0;
    this.elapsed = 0;
    this.worst = 0;
    this.updateTime = 0;
    this.renderTime = 0;
  }

  dispose() {
    this.el.remove();
    this.renderer.info.autoReset = true;
  }

  // call before updating the world
  beginUpdate() {
    this.t0 = performance.now();
  }

  // call before rendering a frame
  begin() {
    this.t1 = performance.now();
    this.renderer.info.reset();
  }

  // call after rendering a frame; delta in seconds
  end(delta) {
    const t2 = performance.now();
    this.updateTime += this.t1 - this.t0;
    this.renderTime += t2 - this.t1;
    this.frames++;
    this.elapsed += delta;
    this.worst = Math.max(this.worst, delta);
    if (this.elapsed < INTERVAL) return;

    const { render, memory } = this.renderer.info;
    let objects = 0;
    this.scene.traverseVisible(() => objects++);
    const fps = this.frames / this.elapsed;
    this.el.textContent = [
      `${fps.toFixed(0)} fps  avg ${((1000 * this.elapsed) / this.frames).toFixed(1)} ms  max ${(1000 * this.worst).toFixed(1)} ms`,
      `cpu: update ${(this.updateTime / this.frames).toFixed(2)} ms  render ${(this.renderTime / this.frames).toFixed(2)} ms`,
      `draw calls ${render.calls}  triangles ${(render.triangles / 1e6).toFixed(2)} M`,
      `objects ${objects}  geometries ${memory.geometries}  textures ${memory.textures}`,
    ].join('\n');

    this.frames = 0;
    this.elapsed = 0;
    this.worst = 0;
    this.updateTime = 0;
    this.renderTime = 0;
  }
}
