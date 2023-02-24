export interface PluginAdastraOptions {
  root?: string
  sourceDir?: string
  entrypointsDir?: string
  hash?: boolean
  minify?: boolean
}

export type ResolvedAdastraPluginOptions = Required<PluginAdastraOptions>
