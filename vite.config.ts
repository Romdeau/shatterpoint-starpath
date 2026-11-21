import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  base: '/shatterpoint-starpath/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'prompt',
      manifest: { name: 'Shatterpoint Starpath', short_name: 'Starpath', start_url: './', scope: './', display: 'standalone', background_color: '#09090b', theme_color: '#10b981', icons: [{ src: 'starpath.svg', sizes: 'any', type: 'image/svg+xml' }] },
      workbox: { clientsClaim: true, globPatterns: ['**/*.{js,css,html,svg,woff2}'], navigateFallback: 'index.html' },
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
