export type PluginAdastraOptions = {
  root?: string
  entrypointsDir?: string
  sourceDir?: string
  additionalEntrypoints?: string[]
  hash?: boolean
  minify?: boolean
}

export type ResolvedAdastraPluginOptions = Required<PluginAdastraOptions>
