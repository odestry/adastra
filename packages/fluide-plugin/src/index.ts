import { Plugin } from "vite";

import type { PluginFluideOptions } from "./types";
import { resolveOptions } from "./options";
import fluideConfig from "./plugins/vite-plugin-fluide-config";
import fluideLiquid from "./plugins/vite-plugin-fluide-liquid";

export default (options: PluginFluideOptions = {}): Plugin[] => {
  const resolvedOptions = resolveOptions(options);
  return [
    //  Apply plugin for configuring Vite settings
    fluideConfig(resolvedOptions),
    // Apply plugin for generating Liquid asset tags through fluide.liquid snippet
    fluideLiquid(resolvedOptions),
  ];
};
