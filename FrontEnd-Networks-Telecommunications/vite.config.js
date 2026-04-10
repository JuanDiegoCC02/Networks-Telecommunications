import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
      interval: 100, // Revisa cambios cada 100 milisegundos
    },
    host: true, // Esto ayuda a que la red local reconozca mejor el servidor
  },
})