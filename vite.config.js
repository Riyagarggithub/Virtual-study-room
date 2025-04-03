import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    hmr: {
      clientPort: 443, // Required for Render's HTTPS
    },
  },
  preview: {
    host: '0.0.0.0',
    port: process.env.PORT || 5173,
    // 👇 Disable host check (safe for preview mode)
    cors: true,
    disableHostCheck: true, // Bypasses the "Blocked request" error
  },
});