import { defineConfig } from 'vite'
import adastra from 'adastra-plugin'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
  plugins: [adastra(), svelte()]
})
