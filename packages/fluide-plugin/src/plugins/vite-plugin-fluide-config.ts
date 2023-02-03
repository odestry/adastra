import path from "path";
import glob from "fast-glob";
import createDebugger from "debug";

import {
  Plugin,
  UserConfig,
  mergeConfig,
  normalizePath,
  ConfigEnv,
} from "vite";
import type { ResolvedFluidePluginOptions } from "../types";

const debug = createDebugger("fluide:config");

// Plugin for setting necessary Vite config to support Shopify plugin functionality
export default (options: ResolvedFluidePluginOptions): Plugin => {
  return {
    name: `fluide:config`,
    config(config: UserConfig, _env: ConfigEnv): UserConfig {
      const host = config.server?.host ?? "localhost";
      const port = config.server?.port ?? 5173;
      const https = config.server?.https;
      const protocol = https === true ? "https:" : "http:";
      const origin = `${protocol}//${host as string}:${port}`;
      const socketProtocol = https === true ? "wss" : "ws";

      let input = glob.sync(
        normalizePath(
          path.join(
            options.entrypointsDir,
            options.entrypointsDir === "src" ? "/*" : "**/*"
          )
        ),
        { onlyFiles: true }
      );

      options.additionalEntrypoints.forEach((globPattern) => {
        input = input.concat(glob.sync(globPattern, { onlyFiles: true }));
      });

      // const entryFileNames = path.join(options.themeRoot, `[name]${options.hash ? '-[hash]' : ''}.js`)
      // const assetFileNames = path.join(options.themeRoot, `[name]${options.hash ? '-[hash]' : ''}.[ext]`)
      const output = {
        chunkFileNames: `[name]${options.hash ? "-[hash]" : ""}.js`,
        entryFileNames: `[name]${options.hash ? "-[hash]" : ""}.js`,
        assetFileNames: `[name]${options.hash ? "-[hash]" : ""}.[ext]`,
      };

      const generatedConfig: UserConfig = {
        // Use relative base path so to load imported assets from Shopify CDN
        base: "./",
        // Do not use "public" directory
        publicDir: false,
        envPrefix: "PUBLIC_",
        css: {
          devSourcemap: false,
        },
        build: {
          // Output files to "assets" directory
          outDir: path.join(options.themeRoot, "assets"),
          // Do not use subfolder for static assets
          assetsDir: "",
          // Configure bundle entry points
          rollupOptions: {
            input,
            output,
          },
          // Output manifest file for backend integration
          manifest: `fluide.json`,
          minify: options.minify,
        },
        resolve: {
          // Provide import alias to source code dir for convenience
          alias: {
            "~": path.resolve(options.sourceCodeDir),
            "@": path.resolve(options.sourceCodeDir),
          },
        },
        server: {
          host,
          https,
          port,
          origin,
          strictPort: true,
          hmr: {
            host: host as string,
            port,
            protocol: socketProtocol,
          },
        },
      };
      debug(generatedConfig);
      return mergeConfig(generatedConfig, config);
    },
  };
};
