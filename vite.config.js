import { defineConfig } from 'vite';

export default defineConfig({
  // relative asset URLs so the build can be hosted under any sub-path
  base: './',
  build: {
    // keep bundled files apart from the game assets copied from public/assets
    assetsDir: 'bundle',
    // three.js alone is ~560 kB minified
    chunkSizeWarningLimit: 600,
    rolldownOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/three')) return 'three';
        },
      },
    },
  },
  test: {
    include: ['test/**/*.test.js'],
  },
});
