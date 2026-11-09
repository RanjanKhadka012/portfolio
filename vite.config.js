import { defineConfig } from 'vite'

export default defineConfig({
  root: './',
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  },
  server: {
    port: 3000,
    host: '127.0.0.1',
    open: false
  },
  preview: {
    port: 4173,
    host: '127.0.0.1',
    open: false
  }
})
