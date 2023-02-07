// src/commands/build/index.ts
import { Command } from "@oclif/core";
import { build } from "vite";
var Build = class extends Command {
  async run() {
    await build({
      logLevel: "silent"
    });
    this.log("build adastra complete");
  }
};
Build.description = "Say Build";
Build.examples = [
  `$ adastra build
  launch build (./src/commands/build/index.ts)
`
];
Build.flags = {};
Build.args = {};
export {
  Build as default
};
