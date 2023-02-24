import { Plugin } from 'vite'

import type { PluginAdastraOptions } from './types'
import { resolveOptions } from './options'
import adastraConfigPlugin from './plugins/vite-plugin-adastra-config'
import adastraLiquidPlugin from './plugins/vite-plugin-adastra-liquid'
import emptyAdastraConfig from './utilities/empty-adastra-config'

export default (
  options: PluginAdastraOptions = emptyAdastraConfig
): Plugin[] => {
  const resolvedOptions = resolveOptions(options)
  return [
    // Apply plugin for configuring Vite settings and options
    adastraConfigPlugin(resolvedOptions),
    // Apply plugin for generating Vite and liquid asset tags through adastra.liquid snippet
    adastraLiquidPlugin(resolvedOptions)
  ]
}
