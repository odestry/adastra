import { defineConfig } from 'vite'
import adastra from 'adastra-plugin'
import preact from '@preact/preset-vite'

export default defineConfig({
  plugins: [adastra(),  preact()]
})
