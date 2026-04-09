import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        whitepaper: resolve(__dirname, 'whitepaper/index.html')
      }
    }
  },
  server: {
    open: true,
    port: 3000
  }
});