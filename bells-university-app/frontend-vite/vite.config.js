/*import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

//const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// https://vite.dev/config/
export default defineConfig({
  define: {
    'process.env.VITE_API_BASE_URL': process.env.VITE_API_BASE_URL
  },
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: API_BASE_URL,
        changeOrigin: true,
      },
    },
  },
})*/
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Read the API base URL from environment variables, fallback to localhost if not set
const apiBaseUrl = process.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default defineConfig({
  plugins: [react()],
  
  define: {
    // Ensure the value is a proper JS string literal
    'process.env.VITE_API_BASE_URL': JSON.stringify(apiBaseUrl),
  },

  // Optional: if you need to set the base path for production
  // base: '/',

  server: {
    port: 5173, // default Vite port
    strictPort: true,
  },
});
