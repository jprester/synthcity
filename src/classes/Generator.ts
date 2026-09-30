// Streaming grid: keeps an item in every cell of a disc of cells around the
// camera, spawning items as cells come into range and removing them as they
// leave. update(k) is passed on to the items (k: frame time in 60 Hz frames).

// what a spawned item may implement
export interface GeneratorItem {
  remove?(): void;
  update?(k: number): void;
}

// spawn_obj: constructed with the cell's world corner and the shared context
export type GeneratorItemClass<C> = new (x: number, z: number, context: C) => GeneratorItem;

export interface GeneratorOptions<C> {
  camera: { position: { x: number; z: number } };
  cell_size: number;
  cell_count: number; // grid width in cells; the disc's diameter
  spawn_obj: GeneratorItemClass<C>;
  context?: C; // passed through to every spawned item unchanged
  debug?: boolean;
}

class Generator<C = unknown> {
  camera: GeneratorOptions<C>['camera'];
  cell_size: number;
  cell_count: number;
  debug: boolean;
  spawn_obj: GeneratorItemClass<C>;
  context: C;
  x: number;
  z: number;
  px: number;
  pz: number;
  grid: (GeneratorItem | null)[][];

  constructor(options: GeneratorOptions<C>) {
    this.camera = options.camera;
    this.cell_size = options.cell_size || 1;
    this.cell_count = options.cell_count || 10;
    this.debug = options.debug || false;
    this.spawn_obj = options.spawn_obj;
    this.context = options.context as C;

    // init position
    this.x = Math.floor(this.camera.position.x / this.cell_size);
    this.z = Math.floor(this.camera.position.z / this.cell_size);
    this.px = this.x;
    this.pz = this.z;

    // init grid
    this.grid = new Array(this.cell_count);
    for (var i = 0; i < this.cell_count; i++) {
      this.grid[i] = [];
      for (var j = 0; j < this.cell_count; j++) {
        this.grid[i][j] = null;
      }
    }

    // add items
    this.add_items();
  }

  update(k = 1): void {
    // update position
    this.px = this.x;
    this.pz = this.z;
    this.x = Math.floor(this.camera.position.x / this.cell_size);
    this.z = Math.floor(this.camera.position.z / this.cell_size);

    // update grid
    if (this.px != this.x || this.pz != this.z) {
      const dx = this.px - this.x;
      const dz = this.pz - this.z;
      if (Math.abs(dx) >= this.cell_count || Math.abs(dz) >= this.cell_count) {
        // jumped further than the grid (e.g. crash respawn): nothing survives
        this.remove_all();
      } else {
        // remove items
        this.remove_items(dx, dz);

        // shift array
        this.shift_grid(dx, dz);
      }

      // add items (and drop those shifted outside the disc)
      this.add_items();
    }

    // update items
    this.update_items(k);
  }

  remove_items(x: number, y: number): void {
    var i, j;
    if (x < 0) {
      for (i = 0; i < this.grid.length; i++) {
        for (j = 0; j < -x; j++) {
          this.remove_item(i, j);
        }
      }
    }
    if (x > 0) {
      for (i = 0; i < this.grid.length; i++) {
        for (j = this.grid[i].length - x; j < this.grid[i].length; j++) {
          this.remove_item(i, j);
        }
      }
    }
    if (y < 0) {
      for (i = 0; i < -y; i++) {
        for (j = 0; j < this.grid[i].length; j++) {
          this.remove_item(i, j);
        }
      }
    }
    if (y > 0) {
      for (i = this.grid.length - y; i < this.grid.length; i++) {
        for (j = 0; j < this.grid[i].length; j++) {
          this.remove_item(i, j);
        }
      }
    }
  }

  remove_all(): void {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        this.remove_item(i, j);
      }
    }
  }

  remove_item(i: number, j: number): void {
    const item = this.grid[i][j];
    if (item != null) {
      if (typeof item.remove === 'function') {
        item.remove();
      }
      this.grid[i][j] = null;
    }
  }

  shift_grid(x: number, y: number): void {
    var val, i, j;
    var temp_arr: (GeneratorItem | null)[][] = new Array(this.grid.length);
    for (i = 0; i < this.grid.length; ++i) {
      temp_arr[i] = this.grid[i].slice(0);
    }
    for (i = 0; i < temp_arr.length; i++) {
      for (j = 0; j < temp_arr[i].length; j++) {
        if (i - y < 0 || i - y >= temp_arr.length || j - x < 0 || j - x >= temp_arr[i].length) {
          val = null;
        } else {
          val = temp_arr[i - y][j - x];
        }
        this.grid[i][j] = val;
      }
    }
  }

  add_items(): void {
    var i, j, xx, zz;
    var rad = Math.ceil(this.cell_count / 2);
    for (i = 0; i < this.grid.length; i++) {
      for (j = 0; j < this.grid[i].length; j++) {
        if (this.distance({ x: rad, y: rad }, { x: i, y: j }) > rad) {
          // shifted into a corner outside the disc
          this.remove_item(i, j);
        } else {
          if (this.grid[i][j] == null) {
            xx =
              Math.floor(this.camera.position.x / this.cell_size) * this.cell_size +
              j * this.cell_size -
              Math.floor((this.cell_count * this.cell_size) / 2);
            zz =
              Math.floor(this.camera.position.z / this.cell_size) * this.cell_size +
              i * this.cell_size -
              Math.floor((this.cell_count * this.cell_size) / 2);
            this.grid[i][j] = new this.spawn_obj(xx, zz, this.context);
          }
        }
      }
    }
  }

  update_items(k: number): void {
    var i, j;
    for (i = 0; i < this.grid.length; i++) {
      for (j = 0; j < this.grid[i].length; j++) {
        const item = this.grid[i][j];
        if (item != null) {
          if (typeof item.update === 'function') {
            item.update(k);
          }
        }
      }
    }
  }

  distance(p1: { x: number; y: number }, p2: { x: number; y: number }): number {
    var dx = p2.x - p1.x;
    var dy = p2.y - p1.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}

export { Generator };
