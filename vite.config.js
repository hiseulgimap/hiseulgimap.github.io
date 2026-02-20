import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'HiSeulgi Map',
        short_name: 'HiSeulgi Map',
        description: '슬기의 발자취를 따라서',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'minimal-ui',
        start_url: '/',
        icons: [
          {
            src: '/icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
      },
    }),
  ],
});
