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
    }
  },
  preview: {
    host: '0.0.0.0',
    port: parseInt(process.env.PORT) || 5173,
    cors: true,
    // Explicitly allow your Render domain
    allowedHosts: [
      'virtual-study-room-3.onrender.com',
      'localhost'
    ]
  }
});