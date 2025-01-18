import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // this ensures that the browser opens upon server start
    open: true,
    hmr: true,
    watch: {
      usePolling: true,
    },
  },
})
