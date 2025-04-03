import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: parseInt(process.env.PORT) || 5173,
    strictPort: true,
    // Add this section:
    hmr: {
      clientPort: 443 // For Render's HTTPS
    }
  },
  preview: {
    host: '0.0.0.0',
    port: parseInt(process.env.PORT) || 5173,
    // Add allowed hosts:
    allowedHosts: [
      'virtual-study-room-2.onrender.com',
      'localhost' // Keep for local development
    ]
  }
})