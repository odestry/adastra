export type PluginFluideOptions = {
  root?: string
  sourceDir?: string
  entrypointsDir?: string
  additionalEntrypoints?: string[]
  hash?: boolean
  minify?: boolean
  sourcemap?: boolean
}

export type ResolvedFluidePluginOptions = Required<PluginFluideOptions>
