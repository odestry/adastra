import path from 'path'
import type {
  PluginAdastraOptions,
  ResolvedAdastraPluginOptions
} from './types'

export const resolveOptions = (
  options: PluginAdastraOptions
): ResolvedAdastraPluginOptions => {
  const root = options.root ?? './'
  const sourceDir = options.sourceDir ?? 'src'
  const entrypointsDir = path.join(
    sourceDir,
    options.entrypointsDir ?? 'entrypoints'
  )

  const hash = options.hash ?? false
  const minify = options.minify ?? true

  return {
    root,
    sourceDir,
    entrypointsDir,
    hash,
    minify
  }
}
