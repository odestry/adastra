/**
 * Options for the Adastra plugin.
 */
export interface AdastraPluginOptions {
  /**
   * Root path to your Shopify theme directory.
   * @default './'
   */
  root?: string

  /**
   * Front-end source code directory.
   * @default 'src'
   */
  sourceDir?: string

  /**
   * Front-end entry points directory relative to the source directory.
   * @default 'entrypoints'
   */
  entrypointsDir?: string

  /**
   * Additional files to use as entry points (accepts an array of file paths or glob patterns).
   * @default []
   */
  additionalEntrypoints?: string[]

  /**
   * Specifies the file name of the snippet that loads your assets.
   * @default 'adastra.liquid'
   */
  snippetName?: string
}

/**
 * Resolved options for the Adastra plugin with all optional properties assigned their default values.
 */
export type ResolvedAdastraPluginOptions = Required<AdastraPluginOptions>
export type DevServerUrl = `${'http' | 'https'}://${string}:${number}`
