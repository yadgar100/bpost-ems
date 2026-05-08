import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    // Leaflet and Html5QrcodeScanner are loaded as CDN globals
    rollupOptions: {
      external: [],
    },
  },
});
