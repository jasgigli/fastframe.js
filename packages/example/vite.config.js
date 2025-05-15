import { defineConfig } from 'vite';
import { fastframePlugin } from '@fastframe/compiler';

export default defineConfig({
  plugins: [fastframePlugin()],
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment'
  },
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.ff.js']
  },
  optimizeDeps: {
    include: ['@fastframe/core'],
    esbuildOptions: {
      jsx: 'transform',
      jsxFactory: 'h',
      jsxFragment: 'Fragment'
    }
  },
  build: {
    rollupOptions: {
      external: [],
      output: {
        format: 'es'
      }
    }
  }
});
