import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    hmr: {
      protocol: 'wss',
      clientPort: 443
    },
    // Add allowed hosts inside server config
    allowedHosts: [
      'virtual-study-room-6.onrender.com',
      'localhost'
    ]
  },
  preview: {
    host: '0.0.0.0',
    port: parseInt(process.env.PORT) || 5173,
    cors: true,
    allowedHosts: [
      'virtual-study-room-6.onrender.com',
      'localhost'
    ]
  }
});