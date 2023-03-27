import path from 'path'
import type {
  AdastraPluginOptions,
  ResolvedAdastraPluginOptions
} from './types'

export const resolveOptions = ({
  root = './',
  sourceDir = 'src',
  entrypointsDir = 'entrypoints',
  additionalEntrypoints = [],
  snippetName = 'adastra'
}: AdastraPluginOptions): ResolvedAdastraPluginOptions => {
  const resolvedEntrypointsDir = path.join(sourceDir, entrypointsDir)

  return {
    root,
    sourceDir,
    entrypointsDir: resolvedEntrypointsDir,
    additionalEntrypoints,
    snippetName
  }
}
