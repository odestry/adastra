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
  const snippetName = options.snippetName ?? 'adastra'

  return {
    root,
    sourceDir,
    entrypointsDir,
    snippetName
  }
}
