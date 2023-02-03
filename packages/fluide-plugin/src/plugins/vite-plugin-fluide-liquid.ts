import fs from "fs";
import path from "path";
import createDebugger from "debug";
import { Manifest, Plugin, ResolvedConfig, normalizePath } from "vite";

import {
  disableThemeCheckTag,
  fluideTagDisclaimer,
  fluideTagEntryPath,
  fluideTagSnippetDev,
  stylesheetTag,
  scriptTag,
  preloadScriptTag,
  fluideEntryTag,
} from "../utilities";
import { CSS_EXTENSIONS_REGEX } from "../constants";
import type { ResolvedFluidePluginOptions } from "../types";

const debug = createDebugger("fluide:liquid");

// Plugin for generating fluide tag liquid theme snippet with entry points for JS and CSS assets
export default (options: ResolvedFluidePluginOptions): Plugin => {
  let config: ResolvedConfig;
  let modulesPath = "";

  const fluideTagSnippetPath = path.resolve(
    options.themeRoot,
    `snippets/fluide.liquid`
  );

  return {
    name: `fluide:liquid`,
    enforce: "post",
    configResolved(resolvedConfig) {
      // Store reference to resolved config
      config = resolvedConfig;

      const modulesAlias = config.resolve.alias.find(
        (value) => value.find === "@modules"
      );
      if (modulesAlias != null) {
        // Store relative path to modules directory
        modulesPath = normalizePath(
          path.relative(options.entrypointsDir, modulesAlias.replacement)
        );
      }
    },
    configureServer({ config }) {
      const protocol = config.server?.https === true ? "https:" : "http:";
      const host =
        typeof config.server?.host === "string"
          ? config.server.host
          : "localhost";
      const port =
        typeof config.server?.port !== "undefined" ? config.server.port : 5173;

      const assetHost =
        typeof config.server?.origin === "string"
          ? config.server.origin
          : `${protocol}//${host}:${port}`;

      debug({ assetHost });

      const fluideTagSnippetContent =
        disableThemeCheckTag +
        fluideTagDisclaimer +
        fluideTagEntryPath(config.resolve.alias, options.entrypointsDir) +
        fluideTagSnippetDev(assetHost, options.entrypointsDir, modulesPath);

      // Write fluide tag snippet for development server
      fs.writeFileSync(fluideTagSnippetPath, fluideTagSnippetContent);
    },
    closeBundle() {
      const manifestFilePath = path.resolve(
        options.themeRoot,
        `assets/fluide.json`
      );

      if (!fs.existsSync(manifestFilePath)) {
        return;
      }

      const assetTags: string[] = [];
      const manifest = JSON.parse(
        fs.readFileSync(manifestFilePath, "utf8")
      ) as Manifest;

      Object.keys(manifest).forEach((src) => {
        const { file, isEntry, css, imports } = manifest[src];
        const ext = path.extname(src);

        // Generate tags for JS and CSS entry points
        if (isEntry === true) {
          const entryName = normalizePath(
            path.relative(options.entrypointsDir, src)
          );
          const entryPaths = [`/${src}`, entryName];
          const tagsForEntry = [];

          if (ext.match(CSS_EXTENSIONS_REGEX) !== null) {
            // Render style tag for CSS entry
            tagsForEntry.push(stylesheetTag(file));
          } else {
            // Render preload tags for JS entry
            tagsForEntry.push(preloadScriptTag(file));

            // Render script tag for JS entry
            tagsForEntry.push(scriptTag(file));

            if (typeof css !== "undefined" && css.length > 0) {
              css.forEach((cssFileName: string) => {
                // Render style tag for imported CSS file
                tagsForEntry.push(stylesheetTag(cssFileName));
              });
            }

            if (typeof imports !== "undefined" && imports.length > 0) {
              imports.forEach((importFilename: string) => {
                const chunk = manifest[importFilename];
                const { css } = chunk;
                // Render preload tags for JS imports
                tagsForEntry.push(preloadScriptTag(chunk.file));

                // Render style tag for JS imports
                if (typeof css !== "undefined" && css.length > 0) {
                  css.forEach((cssFileName: string) => {
                    // Render style tag for imported CSS file
                    tagsForEntry.push(stylesheetTag(cssFileName));
                  });
                }
              });
            }

            // Add shorthand path for theme module entries
            if (
              modulesPath !== "" &&
              !path.relative(modulesPath, entryName).includes("..")
            ) {
              entryPaths.push(path.dirname(entryName));
            }
          }

          assetTags.push(
            fluideEntryTag(
              entryPaths,
              tagsForEntry.join("\n  "),
              assetTags.length === 0
            )
          );
        }

        // Generate entry tag for bundled "style.css" file when cssCodeSplit is false
        if (src === "style.css" && !config.build.cssCodeSplit) {
          assetTags.push(fluideEntryTag([src], stylesheetTag(file), false));
        }
      });

      const fluideTagSnippetContent =
        disableThemeCheckTag +
        fluideTagDisclaimer +
        fluideTagEntryPath(config.resolve.alias, options.entrypointsDir) +
        assetTags.join("\n") +
        "\n{% endif %}\n";

      // Write fluide tag snippet for production build
      fs.writeFileSync(fluideTagSnippetPath, fluideTagSnippetContent);
    },
  };
};
