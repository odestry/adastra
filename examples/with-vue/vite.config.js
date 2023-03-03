import { defineConfig } from 'vite'
import adastra from 'adastra-plugin'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [adastra(), vue()]
})
