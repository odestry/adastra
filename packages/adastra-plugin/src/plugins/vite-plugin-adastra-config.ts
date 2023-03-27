import path from 'path'
import glob from 'fast-glob'
import createDebugger from 'debug'

import { Plugin, UserConfig, mergeConfig, normalizePath } from 'vite'
import type { ResolvedAdastraPluginOptions } from '../types'

const debug = createDebugger('adastra-plugin:config')

/**
 * Create the Adastra configuration plugin.
 *
 * @param options - The resolved Adastra plugin options.
 * @returns The Vite plugin with the Adastra configuration.
 */
export default (options: ResolvedAdastraPluginOptions): Plugin => {
  return {
    name: 'adastra-plugin-config',
    config(config: UserConfig): UserConfig {
      const host = config.server?.host ?? 'localhost'
      const port = config.server?.port ?? 5173
      const https = config.server?.https
      const protocol = https === true ? 'https:' : 'http:'
      const origin = `${protocol}//${host as string}:${port}`
      const socketProtocol = https === true ? 'wss' : 'ws'

      const input = glob.sync(
        [
          normalizePath(path.join(options.entrypointsDir, '**/*')),
          ...options.additionalEntrypoints
        ],
        { onlyFiles: true }
      )

      const defaultAliases: Record<string, string> = {
        '~': path.resolve(options.sourceDir),
        '@': path.resolve(options.sourceDir)
      }

      const generatedConfig: UserConfig = {
        // Use relative base path to load imported assets from Shopify CDN
        base: config.base ?? './',
        envPrefix: config.envPrefix ?? ['VITE_', 'PUBLIC_', 'ADASTRA_'],
        publicDir: config.publicDir ?? false,
        build: {
          // Output files to "assets" directory
          outDir: config.build?.outDir ?? path.join(options.root, 'assets'),
          modulePreload: {
            polyfill: true
          },
          // Do not use subfolder for static assets
          assetsDir: config.build?.assetsDir ?? '',
          // Configure bundle entry points
          rollupOptions: {
            input
          },
          // Output manifest file for backend integration
          manifest: config.build?.manifest ?? 'adastra.manifest.json'
        },
        resolve: {
          // Provide import alias to source code dir for convenience
          alias: Array.isArray(config.resolve?.alias)
            ? [
                ...(config.resolve?.alias ?? []),
                ...Object.keys(defaultAliases).map(alias => ({
                  find: alias,
                  replacement: defaultAliases[alias]
                }))
              ]
            : {
                ...defaultAliases,
                ...config.resolve?.alias
              }
        },
        server: {
          host,
          https,
          port,
          origin,
          strictPort: config.server?.strictPort ?? true,
          hmr:
            config.server?.hmr === false
              ? false
              : {
                  host: typeof host === 'string' ? host : undefined,
                  port,
                  protocol: socketProtocol,
                  ...(config.server?.hmr === true ? {} : config.server?.hmr)
                },
          watch: {
            ignored: config.server?.watch?.ignored ?? [
              'assets/*',
              `snippets/${options.snippetName}.liquid`
            ] // Ignore assets and snippet files
          }
        }
      }
      debug(generatedConfig)

      return mergeConfig(generatedConfig, config)
    }
  }
}
