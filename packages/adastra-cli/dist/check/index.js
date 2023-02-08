import {
  ThemeCommand,
  theme_flags_default
} from "../chunk-R2T36YUM.js";

// src/commands/check/index.ts
import { Flags } from "@oclif/core";
import { execCLI2 } from "@shopify/cli-kit/node/ruby";
import { globalFlags } from "@shopify/cli-kit/node/cli";
var _Check = class extends ThemeCommand {
  async run() {
    const { flags } = await this.parse(_Check);
    await execCLI2(
      [
        "theme",
        "check",
        flags.path,
        ...this.passThroughFlags(flags, { allowedFlags: _Check.cli2Flags })
      ],
      {
        directory: flags.path
      }
    );
  }
};
var Check = _Check;
Check.description = "Validate the theme using theme check same as shopify theme check.";
Check.flags = {
  ...globalFlags,
  path: theme_flags_default.path,
  "auto-correct": Flags.boolean({
    char: "a",
    required: false,
    description: "Automatically fix offenses",
    env: "SHOPIFY_FLAG_AUTO_CORRECT"
  }),
  category: Flags.string({
    char: "c",
    required: false,
    description: `Only run this category of checks
Runs checks matching all categories when specified more than once`,
    env: "SHOPIFY_FLAG_CATEGORY"
  }),
  config: Flags.string({
    char: "C",
    required: false,
    description: `Use the config provided, overriding .theme-check.yml if present
Use :theme_app_extension to use default checks for theme app extensions`,
    env: "SHOPIFY_FLAG_CONFIG"
  }),
  "exclude-category": Flags.string({
    char: "x",
    required: false,
    description: `Exclude this category of checks
Excludes checks matching any category when specified more than once`,
    env: "SHOPIFY_FLAG_EXCLUDE_CATEGORY"
  }),
  "fail-level": Flags.string({
    required: false,
    description: "Minimum severity for exit with error code",
    env: "SHOPIFY_FLAG_FAIL_LEVEL",
    options: ["error", "suggestion", "style"]
  }),
  init: Flags.boolean({
    required: false,
    description: "Generate a .theme-check.yml file",
    env: "SHOPIFY_FLAG_INIT"
  }),
  list: Flags.boolean({
    required: false,
    description: "List enabled checks",
    env: "SHOPIFY_FLAG_LIST"
  }),
  output: Flags.string({
    char: "o",
    required: false,
    description: "The output format to use",
    env: "SHOPIFY_FLAG_OUTPUT",
    options: ["text", "json"],
    default: "text"
  }),
  print: Flags.boolean({
    required: false,
    description: "Output active config to STDOUT",
    env: "SHOPIFY_FLAG_PRINT"
  }),
  version: Flags.boolean({
    char: "v",
    required: false,
    description: "Print Theme Check version",
    env: "SHOPIFY_FLAG_VERSION"
  })
};
Check.cli2Flags = [
  "auto-correct",
  "category",
  "config",
  "exclude-category",
  "fail-level",
  "init",
  "list",
  "output",
  "print",
  "version"
];
export {
  Check as default
};
