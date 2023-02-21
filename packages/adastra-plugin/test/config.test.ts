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
    const config = userConfig.config(emptyAdastraConfig, {
      command: 'serve',
      mode: 'development'
    })

    expect(config.base).toBe('./')
    expect(config.publicDir).toEqual('src/public')
    expect(config.build.outDir).toBe('assets')
    expect(config.build.assetsDir).toBe('')
    expect(config.build.rollupOptions.input).toEqual(['src/app.js'])
    expect(config.build.manifest).toBe('adastra.manifest.json')
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
  })

  it('accepts a partial configuration', () => {
    const options = resolveOptions({ additionalEntrypoints: ['src/js/*.js'] })
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
      'src/app.js',
      'src/js/app.js'
    ])
  })
})

describe('resolve Adastra Options', () => {
  it('handles a default options configuration', () => {
    const options = resolveOptions(emptyAdastraConfig)

    expect(options.root).toBe('./')
    expect(options.sourceDir).toBe('src')
    expect(options.entrypointsDir).toBe('src')
    expect(options.additionalEntrypoints).toEqual([])
    expect(options.hash).toBe(false)
    expect(options.minify).toBe(true)
  })

  it('accepts a partial options configuration with src dir', () => {
    const options = resolveOptions({
      root: 'shopify',
      sourceDir: 'src'
    })

    expect(options.root).toBe('shopify')
    expect(options.sourceDir).toBe('src')
    expect(options.entrypointsDir).toBe('src')
    expect(options.additionalEntrypoints).toEqual([])
    expect(options.hash).toBe(false)
    expect(options.minify).toBe(true)
  })

  it('accepts a partial configuration with entrypoints', () => {
    const options = resolveOptions({
      root: 'shopify',
      sourceDir: 'src',
      entrypointsDir: 'src/entries'
    })

    expect(options.root).toBe('shopify')
    expect(options.sourceDir).toBe('src')
    expect(options.entrypointsDir).toBe('src/entries')
    expect(options.additionalEntrypoints).toEqual([])
    expect(options.hash).toBe(false)
    expect(options.minify).toBe(true)
  })

  it('accepts a partial configuration with hashing active', () => {
    const options = resolveOptions({
      hash: true,
      minify: false
    })

    expect(options.root).toBe('./')
    expect(options.sourceDir).toBe('src')
    expect(options.entrypointsDir).toBe('src')
    expect(options.additionalEntrypoints).toEqual([])
    expect(options.hash).toBe(true)
    expect(options.minify).toBe(false)
  })
})

vi.mock('fast-glob', () => {
  return {
    default: {
      sync: vi
        .fn()
        // mock default entries
        .mockReturnValueOnce(['src/app.js'])
        // mock default entries + additional entries
        .mockReturnValueOnce(['src/app.js'])
        .mockReturnValueOnce(['src/js/app.js'])
    }
  }
})
