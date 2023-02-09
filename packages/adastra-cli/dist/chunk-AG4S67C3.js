// src/utilities/theme-flags.ts
import { Flags } from "@oclif/core";
import { normalizeStoreFqdn } from "@shopify/cli-kit/node/context/fqdn";
import { resolvePath } from "@shopify/cli-kit/node/path";
var themeFlags = {
  path: Flags.string({
    hidden: false,
    description: "The path to your theme directory.",
    parse: (input, _) => Promise.resolve(resolvePath(input)),
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
    parse: (input, _) => Promise.resolve(normalizeStoreFqdn(input))
  })
};
var theme_flags_default = themeFlags;

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
        value.forEach(
          (element) => passThroughFlags.push(`--${label}`, `${element}`)
        );
      } else {
        passThroughFlags.push(`--${label}`, `${value}`);
      }
    }
    return passThroughFlags;
  }
};

// src/utilities/theme-conf.ts
import { Conf } from "@shopify/cli-kit/node/conf";
import { outputDebug, outputContent } from "@shopify/cli-kit/node/output";
var _themeConfInstance;
var _developmentThemeConfInstance;
function themeConf() {
  if (!_themeConfInstance) {
    _themeConfInstance = new Conf({
      projectName: "shopify-cli-theme-conf"
    });
  }
  return _themeConfInstance;
}
function developmentThemeConf() {
  if (!_developmentThemeConfInstance) {
    _developmentThemeConfInstance = new Conf({
      projectName: "shopify-cli-development-theme-conf"
    });
  }
  return _developmentThemeConfInstance;
}
function getThemeStore() {
  return themeConf().get("themeStore");
}
function setThemeStore(store) {
  themeConf().set("themeStore", store);
}
function getDevelopmentTheme() {
  outputDebug(outputContent`Getting development theme...`);
  return developmentThemeConf().get(getThemeStore());
}
function setDevelopmentTheme(theme) {
  outputDebug(outputContent`Setting development theme...`);
  developmentThemeConf().set(getThemeStore(), theme);
}
function removeDevelopmentTheme() {
  outputDebug(outputContent`Removing development theme...`);
  developmentThemeConf().reset(getThemeStore());
}

// src/utilities/theme-store.ts
import { AbortError } from "@shopify/cli-kit/node/error";
import { outputContent as outputContent2, outputToken } from "@shopify/cli-kit/node/output";
function ensureThemeStore(flags) {
  const store = flags.store || getThemeStore();
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
  setThemeStore(store);
  return store;
}

// src/utilities/development-theme-manager.ts
import { ThemeManager } from "@shopify/cli-kit/node/themes/theme-manager";
import { AbortError as AbortError2 } from "@shopify/cli-kit/node/error";
var DEVELOPMENT_THEME_NOT_FOUND = (themeId) => `Development theme #${themeId} could not be found. Please create a new development theme.`;
var NO_DEVELOPMENT_THEME_ID_SET = "No development theme ID has been set. Please create a development theme first.";
var DevelopmentThemeManager = class extends ThemeManager {
  constructor(adminSession) {
    super(adminSession);
    this.context = "Development";
    this.themeId = getDevelopmentTheme();
  }
  async find() {
    const theme = await this.fetch();
    if (!theme) {
      throw new AbortError2(
        this.themeId ? DEVELOPMENT_THEME_NOT_FOUND(this.themeId) : NO_DEVELOPMENT_THEME_ID_SET
      );
    }
    return theme;
  }
  setTheme(themeId) {
    setDevelopmentTheme(themeId);
  }
  removeTheme() {
    removeDevelopmentTheme();
  }
};

// src/utilities/logger.ts
import moment from "moment";
import color from "chalk";
import { createLogger } from "vite";
import { brand } from "adastra-cli-kit";
var logger = createLogger();
var log = (logLevel, msg) => {
  const message = (currentColor = brand.colors.yellowgreen) => `${color.white(moment().format("hh:mm:ss"))} ${color.hex(currentColor).bold(`[adastra]`)} ${msg}`;
  switch (logLevel) {
    case "warn":
      logger.warn(message(brand.colors.warn));
      break;
    case "error":
      logger.error(message(brand.colors.error));
      break;
  }
  logger.info(message());
};
var customLogger = () => ({
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
var startDevMessage = (store, themeId) => {
  logger.clearScreen("info");
  log(
    "info",
    color.hex(brand.colors.yellowgreen)(
      `Initiating launch sequence for ${store.replace(
        ".myshopify.com",
        ""
      )} store
 ${themeId ? `using theme with id: ${themeId}` : ""}`
    )
  );
};

// src/utilities/theme-vars.ts
import { loadEnv } from "vite";
import { AbortError as AbortError3 } from "@shopify/cli-kit/node/error";
import { outputContent as outputContent3, outputToken as outputToken2 } from "@shopify/cli-kit/node/output";

export {
  theme_flags_default,
  ThemeCommand,
  ensureThemeStore,
  DevelopmentThemeManager,
  log,
  customLogger,
  startDevMessage
};
