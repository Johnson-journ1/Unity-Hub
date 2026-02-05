import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: API_BASE_URL,
        changeOrigin: true,
      },
    },
  },
})
