import { defineConfig } from 'vite'
import adastra from 'adastra-plugin'
import solid from 'vite-plugin-solid';

export default defineConfig({
  plugins: [adastra(), solid()]
})
