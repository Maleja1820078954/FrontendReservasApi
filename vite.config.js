import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy SOLO para reservas
      '/api/Reservations': {
        target: 'https://apireservas-evhpcvnkcvbxdcc8.chilecentral-01.azurewebsites.net',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path
      }
    }
  }
})
