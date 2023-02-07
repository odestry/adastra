import { Plugin } from 'vite'

import type { PluginAdastraOptions } from './types'
import { resolveOptions } from './options'
import adastraConfig from './plugins/vite-plugin-adastra-config'
import adastraLiquid from './plugins/vite-plugin-adastra-liquid'

export default (options: PluginAdastraOptions = {}): Plugin[] => {
  const resolvedOptions = resolveOptions(options)
  return [
    //  Apply plugin for configuring Vite settings
    adastraConfig(resolvedOptions),
    // Apply plugin for generating Liquid asset tags through adastra.liquid snippet
    adastraLiquid(resolvedOptions)
  ]
}
