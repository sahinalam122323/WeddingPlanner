import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  root: 'wedddinnggg-laaast-finall',
  server: {
    open: true,
  },
  plugins: [
    tailwindcss(),
  ],
})