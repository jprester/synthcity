// three-mesh-bvh augments 'three/src/core/BufferGeometry', which doesn't
// resolve through @types/three's exports map, so repeat it here.
import type { MeshBVH, MeshBVHOptions } from 'three-mesh-bvh';

declare module 'three/src/core/BufferGeometry.js' {
  interface BufferGeometry {
    boundsTree?: MeshBVH;
    computeBoundsTree(options?: MeshBVHOptions): MeshBVH;
    disposeBoundsTree(): void;
  }
}
