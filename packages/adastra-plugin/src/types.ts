export type PluginAdastraOptions = {
  root?: string
  sourceDir?: string
  entrypointsDir?: string
  additionalEntrypoints?: string[]
  hash?: boolean
  minify?: boolean
  sourcemap?: boolean
}

export type ResolvedAdastraPluginOptions = Required<PluginAdastraOptions>
