import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Replace <repo-name> with your GitHub repository name
export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'docs', // default, but you can keep it explicit
  },
})