import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Ensure this is correct
     assetsDir: 'assets',
     rollupOptions: {
      input: './src/main.jsx', // Ensure the entry file is correct
    }
  }
})
