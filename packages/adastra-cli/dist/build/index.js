import {
  log
} from "../chunk-R6OUDM2D.js";

// src/commands/build/index.ts
import { Command, Flags } from "@oclif/core";
import { build } from "vite";
var _Build = class extends Command {
  async run() {
    const { flags } = await this.parse(_Build);
    log("info", "Building files for production...");
    try {
      await build({
        logLevel: flags["log-level"],
        build: {
          minify: flags.minify,
          sourcemap: flags.sourcemap
        }
      });
      log("info", "Building files for production complete");
    } catch (error) {
      log("error", error);
    }
  }
};
var Build = _Build;
Build.description = "Builds all static files into the theme assets folder.";
Build.flags = {
  minify: Flags.boolean({
    required: false,
    char: "m",
    description: "Minifies static files for production using Esbuild, then outputs them in the theme assets folder",
    env: "ADASTRA_MINIFY",
    default: true
  }),
  sourcemap: Flags.boolean({
    required: false,
    description: "Generate production source maps, the sourcemap will be appended to the resulting output file as a data URI.",
    env: "ADASTRA_SOURCEMAP"
  }),
  "log-level": Flags.string({
    required: false,
    description: "Adjust console output verbosity when building files",
    env: "ADASTRA_LOG_LEVEL",
    options: ["info", "silent", "error", "warn"],
    default: "info"
  })
};
export {
  Build as default
};
