import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Listen on all network interfaces
    port: process.env.PORT || 5173, // Use Render's PORT or default to 5173
    strictPort: true // Exit if port is unavailable
  },
  preview: {
    port: process.env.PORT || 5173 // For production preview
  }
})
