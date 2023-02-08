// src/utilities/theme-flags.ts
import { Flags } from "@oclif/core";
import { normalizeStoreFqdn } from "@shopify/cli-kit/node/context/fqdn";
import { resolvePath } from "@shopify/cli-kit/node/path";
var themeFlags = {
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
var theme_flags_default = themeFlags;

// src/utilities/theme-vars.ts
import { loadEnv } from "vite";

// src/utilities/theme-conf.ts
import { Conf } from "@shopify/cli-kit/node/conf";
import { outputDebug, outputContent } from "@shopify/cli-kit/node/output";
var _themeConfInstance;
function themeConf() {
  if (!_themeConfInstance) {
    _themeConfInstance = new Conf({
      projectName: "shopify-cli-theme-conf"
    });
  }
  return _themeConfInstance;
}

// src/utilities/theme-vars.ts
import { AbortError } from "@shopify/cli-kit/node/error";
import { outputContent as outputContent2, outputToken } from "@shopify/cli-kit/node/output";
function getThemeVars(flags) {
  let store = flags.store || themeConf().get("themeStore");
  if (!store) {
    throw new AbortError(
      "A store is required",
      `Specify the store passing ${outputContent2`${outputToken.genericShellCommand(
        `--${theme_flags_default.store.name}={your_store_url}`
      )}`.value} or set the ${outputContent2`${outputToken.genericShellCommand(
        theme_flags_default.store.env
      )}`.value} environment variable.`
    );
  }
  let password = typeof flags?.password !== "undefined" ? flags.password : "";
  let port = typeof flags?.port !== "undefined" ? flags.port : "9292";
  const mode = typeof flags?.mode !== "undefined" ? flags.mode : "";
  const path = typeof flags?.path !== "undefined" ? flags.path : ".";
  const envars = loadEnv(mode, path, ["VITE_", "SHOPIFY_"]);
  if (envars.SHOPIFY_FLAG_STORE) {
    store = envars.SHOPIFY_FLAG_STORE;
    themeConf().set("themeStore", store);
  }
  if (envars.SHOPIFY_CLI_THEME_TOKEN)
    password = envars.SHOPIFY_CLI_THEME_TOKEN;
  if (envars.SHOPIFY_FLAG_PORT)
    port = envars.SHOPIFY_FLAG_PORT;
  return {
    store,
    password,
    port
  };
}

// src/utilities/theme-command.ts
import Command from "@shopify/cli-kit/node/base-command";
var ThemeCommand = class extends Command {
  passThroughFlags(flags, { allowedFlags }) {
    const passThroughFlags = [];
    for (const [label2, value] of Object.entries(flags)) {
      if (!(allowedFlags ?? []).includes(label2)) {
        continue;
      } else if (typeof value === "boolean") {
        passThroughFlags.push(`--${label2}`);
      } else if (Array.isArray(value)) {
        value.forEach(
          (element) => passThroughFlags.push(`--${label2}`, `${element}`)
        );
      } else {
        passThroughFlags.push(`--${label2}`, `${value}`);
      }
    }
    return passThroughFlags;
  }
};

// src/utilities/logger.ts
import moment from "moment";
import color from "chalk";
import { createLogger } from "vite";
import { brand, label } from "adastra-cli-kit";
var logger = createLogger();
var log = (logLevel, msg, logger2 = console) => {
  const message = (currentColor = brand.colors.yellowgreen) => `${color.white(moment().format("hh:mm:ss"))} ${color.hex(currentColor).bold(`[adastra]`)} ${msg}`;
  switch (logLevel) {
    case "warn":
      logger2.warn(message(brand.colors.warn));
      break;
    case "error":
      logger2.error(message(brand.colors.error));
      break;
  }
  if (logger2.log !== void 0) {
    logger2.log(message());
  } else {
    logger2.info(message());
  }
};
var logInitiateSequence = (baseUrl, logger2 = console.log) => {
  logger2(
    `${" ".repeat(3)}${label("Adastra")} ${color.hex(brand.colors.yellowgreen)(
      `Initiating launch sequence for ${baseUrl} 
`
    )}`
  );
};
var startDevMessage = (baseUrl, logger2 = console.log, clearScreen = console.clear) => {
  clearScreen();
  logger2(
    `${" ".repeat(2)}${label("Adastra")} ${color.hex(brand.colors.yellowgreen)(
      `Initiating launch sequence for ${baseUrl.replace(
        ".myshopify.com",
        ""
      )} store
`
    )}`
  );
};
var customLogger = (store) => ({
  ...logger,
  info: (msg, options) => {
    logger.clearScreen("info");
    log("info", msg);
  },
  warn: (msg, options) => {
    logger.clearScreen("warn");
    log("warn", msg);
  },
  error: (msg, options) => {
    logger.clearScreen("error");
    log("error", msg);
  }
});

export {
  theme_flags_default,
  getThemeVars,
  ThemeCommand,
  log,
  logInitiateSequence,
  startDevMessage,
  customLogger
};
