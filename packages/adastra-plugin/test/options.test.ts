import { describe, expect, it } from 'vitest'

import { resolveOptions } from '../src/options'
import emptyAdastraConfig from '../src/utilities/empty-adastra-config'

describe('resolve Adastra Options', () => {
  it('handles a default options configuration', () => {
    const options = resolveOptions(emptyAdastraConfig)

    expect(options.root).toBe('./')
    expect(options.sourceDir).toBe('src')
    expect(options.entrypointsDir).toBe('src/entrypoints')
    expect(options.snippetName).toBe('adastra')
  })

  it('accepts a partial options configuration with root & src dir', () => {
    const options = resolveOptions({
      root: 'shopify',
      sourceDir: 'frontend'
    })

    expect(options.root).toBe('shopify')
    expect(options.sourceDir).toBe('frontend')
    expect(options.entrypointsDir).toBe('frontend/entrypoints')
    expect(options.snippetName).toBe('adastra')
  })

  it('accepts a partial configuration with entrypoints', () => {
    const options = resolveOptions({
      sourceDir: 'frontend',
      entrypointsDir: 'entries',
      snippetName: 'vite-tag'
    })

    expect(options.root).toBe('./')
    expect(options.sourceDir).toBe('frontend')
    expect(options.entrypointsDir).toBe('frontend/entries')
    expect(options.snippetName).toBe('vite-tag')
  })

  it('accepts a partial configuration with custom snippet name', () => {
    const options = resolveOptions({
      snippetName: 'vite-tag'
    })

    expect(options.root).toBe('./')
    expect(options.sourceDir).toBe('src')
    expect(options.entrypointsDir).toBe('src/entrypoints')
    expect(options.snippetName).toBe('vite-tag')
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
    expect(options.snippetName).toBe('adastra')
  })

  it('accepts a partial configuration with entrypoints dir as wildcard', () => {
    const options = resolveOptions({
      entrypointsDir: 'entrypoints/**'
    })

    expect(options.root).toBe('./')
    expect(options.sourceDir).toBe('src')
    expect(options.entrypointsDir).toBe('src/entrypoints/**')
    expect(options.snippetName).toBe('adastra')
  })
})
