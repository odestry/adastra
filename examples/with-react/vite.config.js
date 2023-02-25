import { defineConfig } from 'vite'
import adastra from 'adastra-plugin'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [adastra(), react()]
})
