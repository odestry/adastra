export type PluginFluideOptions = {
  themeRoot?: string
  entrypointsDir?: string
  additionalEntrypoints?: string[]
  sourceCodeDir?: string
  hash?: boolean
  minify?: boolean
}

export type ResolvedFluidePluginOptions = Required<PluginFluideOptions>
