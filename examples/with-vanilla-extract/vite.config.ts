import { defineConfig } from 'vite'
import adastra from 'adastra-plugin'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

export default defineConfig({
  plugins: [adastra(), vanillaExtractPlugin()]
})
