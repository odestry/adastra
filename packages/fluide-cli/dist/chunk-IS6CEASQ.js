// src/utilities/theme-flags.ts
import { Flags } from "@oclif/core";
import { normalizeStoreFqdn } from "@shopify/cli-kit/node/environment/fqdn";
import { resolvePath } from "@shopify/cli-kit/node/path";
var theme_flags_default = {
  path: Flags.string({
    hidden: false,
    description: "The path to your theme directory.",
    parse: async (input, _) => await Promise.resolve(resolvePath(input)),
    env: "SHOPIFY_FLAG_PATH",
    default: "."
  }),
  password: Flags.string({
    hidden: false,
    description: "Password generated from the Theme Access app.",
    env: "SHOPIFY_CLI_THEME_TOKEN"
  }),
  store: Flags.string({
    char: "s",
    description: "Store URL. It can be the store prefix (johns-apparel) or the full myshopify.com URL (johns-apparel.myshopify.com, https://johns-apparel.myshopify.com).",
    env: "SHOPIFY_FLAG_STORE",
    parse: async (input, _) => await Promise.resolve(normalizeStoreFqdn(input))
  })
};

// src/utilities/theme-command.ts
import Command from "@shopify/cli-kit/node/base-command";
var ThemeCommand = class extends Command {
  passThroughFlags(flags, { allowedFlags }) {
    const passThroughFlags = [];
    for (const [label, value] of Object.entries(flags)) {
      if (!(allowedFlags ?? []).includes(label)) {
        continue;
      } else if (typeof value === "boolean") {
        passThroughFlags.push(`--${label}`);
      } else if (Array.isArray(value)) {
        value.forEach((element) => passThroughFlags.push(`--${label}`, `${element}`));
      } else {
        passThroughFlags.push(`--${label}`, `${value}`);
      }
    }
    return passThroughFlags;
  }
};

export {
  theme_flags_default,
  ThemeCommand
};
