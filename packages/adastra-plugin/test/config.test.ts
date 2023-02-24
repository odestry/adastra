import path from 'path'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { resolveOptions } from '../src/options'
import emptyAdastraConfig from '../src/utilities/empty-adastra-config'
import adastraConfigPlugin from '../src/plugins/vite-plugin-adastra-config'

describe('adastra-plugin:config', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('handles a default configuration', () => {
    const options = resolveOptions(emptyAdastraConfig)
    const userConfig = adastraConfigPlugin(options)
    // @ts-expect-error
    const config = userConfig.config(
      {},
      { command: 'serve', mode: 'development' }
    )

    expect(config.base).toBe('./')
    expect(config.publicDir).toEqual(false)
    expect(config.build.outDir).toBe('assets')
    expect(config.build.assetsDir).toBe('')
    expect(config.build.manifest).toBe('adastra.manifest.json')
    expect(config.build.rollupOptions.input).toEqual(['src/entrypoints/app.js'])
    expect(config.resolve.alias['~']).toMatch(path.resolve('src'))
    expect(config.resolve.alias['@']).toMatch(path.resolve('src'))
    expect(config.server.host).toBe('localhost')
    expect(config.server.https).toEqual(undefined)
    expect(config.server.port).toEqual(5173)
    expect(config.server.origin).toEqual('http://localhost:5173')
    expect(config.server.strictPort).toEqual(true)
    expect(config.server.hmr.host).toEqual('localhost')
    expect(config.server.hmr.port).toEqual(5173)
    expect(config.server.hmr.protocol).toEqual('ws')
    expect(config.server.watch.ignored).toEqual([
      'assets/*',
      `snippets/adastra.liquid`
    ])
  })

  it('accepts a partial user configuration', () => {
    const options = resolveOptions({
      sourceDir: 'frontend',
      entrypointsDir: 'entries'
    })
    const userConfig = adastraConfigPlugin(options)
    // @ts-expect-error
    const config = userConfig.config(
      {
        server: {
          port: 3000
        },
        build: {
          sourcemap: true
        }
      },
      { command: 'serve', mode: 'development' }
    )
    expect(config.server.port).toEqual(3000)
    expect(config.build.sourcemap).toBe(true)
    expect(config.build.rollupOptions.input).toEqual([
      'frontend/entries/app.js'
    ])
  })

  it('rewrite default configuration', () => {
    const options = resolveOptions({
      root: 'shopify',
      entrypointsDir: 'entrypoints',
      minify: true
    })

    const userConfig = adastraConfigPlugin(options)
    // @ts-expect-error
    const config = userConfig.config(
      {
        publicDir: 'public',
        build: {
          minify: false
        }
      },
      { command: 'serve', mode: 'development' }
    )
    expect(config.publicDir).toEqual('public')
    expect(config.build.minify).toBe(false)
    expect(config.build.rollupOptions.input).toEqual([
      'src/entrypoints/index.js'
    ])
  })

  it('handles multiple file entries', () => {
    const options = resolveOptions({
      root: 'shopify',
      entrypointsDir: 'js',
      minify: true
    })

    const userConfig = adastraConfigPlugin(options)
    // @ts-expect-error
    const config = userConfig.config(
      {
        publicDir: 'public',
        build: {
          minify: false
        }
      },
      { command: 'serve', mode: 'development' }
    )
    expect(config.publicDir).toEqual('public')
    expect(config.build.minify).toBe(false)
    expect(config.build.rollupOptions.input).toEqual([
      'src/js/base.js',
      'src/js/customers.js'
    ])
  })
})

vi.mock('fast-glob', () => {
  return {
    default: {
      sync: vi
        .fn()
        // mock default entries
        .mockReturnValueOnce(['src/entrypoints/app.js'])
        .mockReturnValueOnce(['frontend/entries/app.js'])
        .mockReturnValueOnce(['src/entrypoints/index.js'])

        // mock multiple entries at once
        .mockReturnValueOnce(['src/js/base.js', 'src/js/customers.js'])
    }
  }
})
