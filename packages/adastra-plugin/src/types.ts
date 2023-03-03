export interface PluginAdastraOptions {
  root?: string
  sourceDir?: string
  entrypointsDir?: string
  snippetName?: string
}

export type ResolvedAdastraPluginOptions = Required<PluginAdastraOptions>
