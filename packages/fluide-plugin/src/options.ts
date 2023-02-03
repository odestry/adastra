import path from "path";
import { normalizePath } from "vite";
import type { PluginFluideOptions, ResolvedFluidePluginOptions } from "./types";

export const resolveOptions = (
  options: PluginFluideOptions
): ResolvedFluidePluginOptions => {
  const themeRoot =
    typeof options.themeRoot !== "undefined"
      ? path.normalize(options.themeRoot)
      : "./";
  const sourceCodeDir =
    typeof options.sourceCodeDir !== "undefined"
      ? path.normalize(options.sourceCodeDir)
      : "src";
  const entrypointsDir =
    typeof options.entrypointsDir !== "undefined"
      ? path.normalize(options.entrypointsDir)
      : normalizePath(path.join(sourceCodeDir));
  const additionalEntrypoints =
    typeof options.additionalEntrypoints !== "undefined"
      ? options.additionalEntrypoints
      : [];
  const hash = typeof options.hash !== "undefined";
  const minify = typeof options.minify === "undefined";

  return {
    themeRoot,
    sourceCodeDir,
    entrypointsDir,
    additionalEntrypoints,
    hash,
    minify,
  };
};
