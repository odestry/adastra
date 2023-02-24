import path from 'path'
import { describe, expect, it } from 'vitest'

import { resolveOptions } from '../src/options'
import emptyAdastraConfig from '../src/utilities/empty-adastra-config'

describe('resolve Adastra Options', () => {
  it('handles a default options configuration', () => {
    const options = resolveOptions(emptyAdastraConfig)

    expect(options.root).toBe('./')
    expect(options.sourceDir).toBe('src')
    expect(options.entrypointsDir).toBe('src/entrypoints')
    expect(options.hash).toBe(false)
    expect(options.minify).toBe(true)
  })

  it('accepts a partial options configuration with root & src dir', () => {
    const options = resolveOptions({
      root: 'shopify',
      sourceDir: 'frontend'
    })

    expect(options.root).toBe('shopify')
    expect(options.sourceDir).toBe('frontend')
    expect(options.entrypointsDir).toBe('frontend/entrypoints')
    expect(options.hash).toBe(false)
    expect(options.minify).toBe(true)
  })

  it('accepts a partial configuration with entrypoints', () => {
    const options = resolveOptions({
      sourceDir: 'frontend',
      entrypointsDir: 'entries'
    })

    expect(options.root).toBe('./')
    expect(options.sourceDir).toBe('frontend')
    expect(options.entrypointsDir).toBe('frontend/entries')
    expect(options.hash).toBe(false)
    expect(options.minify).toBe(true)
  })

  it('accepts a partial configuration with hashing active and disabling minifcation', () => {
    const options = resolveOptions({
      hash: true,
      minify: false
    })

    expect(options.root).toBe('./')
    expect(options.sourceDir).toBe('src')
    expect(options.entrypointsDir).toBe('src/entrypoints')
    expect(options.hash).toBe(true)
    expect(options.minify).toBe(false)
  })

  it('handles partial configuration with source dir as undefined', () => {
    const options = resolveOptions({
      root: 'theme',
      sourceDir: undefined,
      entrypointsDir: 'entry'
    })

    expect(options.root).toBe('theme')
    expect(options.sourceDir).toBe('src')
    expect(options.entrypointsDir).toBe('src/entry')
    expect(options.hash).toBe(false)
    expect(options.minify).toBe(true)
  })

  it('accepts a partial configuration with entrypoints dir as wildcard', () => {
    const options = resolveOptions({
      entrypointsDir: 'entrypoints/**'
    })

    expect(options.root).toBe('./')
    expect(options.sourceDir).toBe('src')
    expect(options.entrypointsDir).toBe('src/entrypoints/**')
  })
})
