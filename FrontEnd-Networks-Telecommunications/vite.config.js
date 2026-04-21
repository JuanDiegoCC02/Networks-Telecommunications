import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
      interval: 100, // request the file system every 100ms to check for changes
    },
    host: false, // state that the server should only be accessible from localhost
  },
})