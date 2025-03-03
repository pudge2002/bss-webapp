import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), nodePolyfills()],
  resolve: {
    alias: {
      https: 'node:https',
      http: 'node:http',
      url: 'node:url',
      buffer: 'node:buffer',
      stream: 'node:stream',
      assert: 'node:assert',
      util: 'node:util',
    }
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis'
      }
    }
  }
});
