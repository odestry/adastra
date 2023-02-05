import path from 'path'
import {normalizePath} from 'vite'
import type {PluginFluideOptions, ResolvedFluidePluginOptions} from './types'

export const resolveOptions = (options: PluginFluideOptions): ResolvedFluidePluginOptions => {
  const root = typeof options.root !== 'undefined' ? path.normalize(options.root) : './'
  const sourceDir = typeof options.sourceDir !== 'undefined' ? path.normalize(options.sourceDir) : 'src'
  const entrypointsDir = typeof options.entrypointsDir !== 'undefined' ? path.normalize(options.entrypointsDir) : normalizePath(path.join(sourceDir))
  const additionalEntrypoints = typeof options.additionalEntrypoints !== 'undefined' ? options.additionalEntrypoints : []
  const hash = typeof options.hash !== 'undefined'
  const minify = typeof options.minify === 'undefined'
  const sourcemap = typeof options.sourcemap === 'undefined'

  return {
    root,
    sourceDir,
    entrypointsDir,
    additionalEntrypoints,
    hash,
    minify,
    sourcemap,
  }
}
