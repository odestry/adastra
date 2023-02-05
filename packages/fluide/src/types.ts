export type PluginFluideOptions = {
  root?: string
  entrypointsDir?: string
  sourceDir?: string
  additionalEntrypoints?: string[]
  hash?: boolean
  minify?: boolean
}

export type ResolvedFluidePluginOptions = Required<PluginFluideOptions>
