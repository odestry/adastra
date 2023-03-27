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
    // @ts-expect-error @todo fix typescript error
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
    // @ts-expect-error @todo fix typescript error
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
      entrypointsDir: 'entrypoints'
    })

    const userConfig = adastraConfigPlugin(options)
    // @ts-expect-error @todo fix typescript error
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
    expect(config.build.minify).toEqual(false)
    expect(config.build.rollupOptions.input).toEqual([
      'src/entrypoints/index.js'
    ])
  })

  it('handles multiple file entries', () => {
    const options = resolveOptions({
      root: 'shopify',
      entrypointsDir: 'js'
    })

    const userConfig = adastraConfigPlugin(options)
    // @ts-expect-error @todo fix typescript error
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
    expect(config.build.minify).toEqual(false)
    expect(config.build.rollupOptions.input).toEqual([
      'src/js/base.js',
      'src/js/customers.js'
    ])
  })
})

describe('resolveOptions', () => {
  it('handles a default configuration', () => {
    const options = resolveOptions({})

    expect(options.root).toBe('./')
    expect(options.sourceDir).toBe('src')
    expect(options.entrypointsDir).toBe('src/entrypoints')
    expect(options.additionalEntrypoints).toEqual([])
    expect(options.snippetName).toEqual('adastra')
  })

  it('accepts a partial configuration', () => {
    const options = resolveOptions({
      root: 'shopify',
      sourceDir: 'src'
    })

    expect(options.root).toBe('shopify')
    expect(options.sourceDir).toBe('src')
    expect(options.entrypointsDir).toBe('src/entrypoints')
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
