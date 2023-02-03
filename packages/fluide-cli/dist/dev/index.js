import {
  ThemeCommand,
  theme_flags_default
} from "../chunk-JY6WLQYU.js";

// src/commands/dev/index.ts
import { Flags } from "@oclif/core";
import { globalFlags } from "@shopify/cli-kit/node/cli";
import { execCLI2 } from "@shopify/cli-kit/node/ruby";
import { AbortController } from "@shopify/cli-kit/node/abort";
import {
  ensureAuthenticatedStorefront,
  ensureAuthenticatedThemes
} from "@shopify/cli-kit/node/session";
import { sleep } from "@shopify/cli-kit/node/system";
import { outputDebug } from "@shopify/cli-kit/node/output";
import { createServer } from "vite";
import color2 from "chalk";

// src/utilities/logger.ts
import moment from "moment";
import { brand, label } from "@fluide/cli-kit";
import color from "chalk";
import { createLogger } from "vite";
var logger = createLogger();
var log = (logLevel, msg, logger2 = console) => {
  const message = (currentColor = brand.colors.yellowgreen) => `${color.white(moment().format("hh:mm:ss"))} ${color.hex(currentColor).bold(`[Fluide]`)} ${msg}`;
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
var printOtherUrls = (baseUrl, logger2 = console.log) => {
  const editingUrl = `https://${baseUrl}/admin/themes/editor`;
  const previewUrl = `https://${baseUrl}/preview_theme_id=pb=0`;
  const stopServerMessage = "(Use Ctrl-C to stop server)";
  logger2(
    `${" ".repeat(2)}${color.white(
      "Customize this theme in the Theme Editor, and use 'fluide sync'\n  to get the latest changes"
    )}
  ${color.hex(brand.colors.yellowgreen)(editingUrl)}

  ${color.white("Share this theme preview with other some cool")}
  ${color.hex(brand.colors.yellowgreen)(previewUrl)}

  ${stopServerMessage}
`
  );
};
var logInitiateSequence = (baseUrl, logger2 = console.log) => {
  logger2(
    `${" ".repeat(3)}${label("Fluide")} ${color.hex(brand.colors.yellowgreen)(
      `Initiating launch sequence for ${baseUrl} 
`
    )}`
  );
};
var customLogger = (store) => ({
  ...logger,
  info: (msg, options) => {
    logger.clearScreen("info");
    printOtherUrls(store, logger.info);
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

// src/commands/dev/index.ts
import { brand as brand2 } from "@fluide/cli-kit";

// src/utilities/theme-vars.ts
import { loadEnv } from "vite";

// src/utilities/theme-conf.ts
import { Conf } from "@shopify/cli-kit/node/conf";
var _instance;
function themeConf() {
  if (!_instance) {
    _instance = new Conf({
      projectName: "shopify-cli-theme-conf"
    });
  }
  return _instance;
}

// src/utilities/theme-vars.ts
import { AbortError } from "@shopify/cli-kit/node/error";
import { outputContent, outputToken } from "@shopify/cli-kit/node/output";
function getThemeVars(flags) {
  let store = flags.store || themeConf().get("themeStore");
  if (!store) {
    throw new AbortError(
      "A store is required",
      `Specify the store passing ${outputContent`${outputToken.genericShellCommand(
        `--${theme_flags_default.store.name}={your_store_url}`
      )}`.value} or set the ${outputContent`${outputToken.genericShellCommand(
        theme_flags_default.store.env
      )}`.value} environment variable.`
    );
  }
  let password = typeof flags?.password !== "undefined" ? flags.password : "";
  let port = typeof flags?.port !== "undefined" ? flags.port : "9292";
  const mode = typeof flags?.mode !== "undefined" ? flags.mode : "";
  const path = typeof flags?.path !== "undefined" ? flags.path : ".";
  const envars = loadEnv(
    mode,
    path,
    ["VITE_", "SHOPIFY_"]
  );
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

// src/commands/dev/index.ts
var _Dev = class extends ThemeCommand {
  constructor() {
    super(...arguments);
    this.ThemeRefreshTimeoutInMs = 24 * 110 * 60 * 1e3;
  }
  async run() {
    const { flags } = await this.parse(_Dev);
    const flagsToPass = this.passThroughFlags(flags, {
      allowedFlags: _Dev.cli2Flags
    });
    const { store, password, port } = getThemeVars(flags);
    const command = [
      "theme",
      "serve",
      flags.path,
      "--ignore",
      ..._Dev.ignoredFiles,
      ...flagsToPass,
      "--port",
      port
    ];
    let controller = new AbortController();
    const server = await createServer({
      customLogger: customLogger(store),
      server: {
        port: +port - 1
      }
    });
    setInterval(() => {
      outputDebug(
        "Refreshing theme session token and restarting theme server..."
      );
      controller.abort();
      controller = new AbortController();
      this.execute(store, password, command, controller).then(
        async () => await server.restart()
      );
    }, this.ThemeRefreshTimeoutInMs);
    logInitiateSequence(store);
    await server.listen();
    await this.execute(store, password, command, controller);
  }
  async execute(store, password, command, controller) {
    await sleep(2);
    const adminSession = await ensureAuthenticatedThemes(
      store,
      password,
      [],
      true
    );
    const storefrontToken = await ensureAuthenticatedStorefront([], password);
    return execCLI2(command, {
      adminSession,
      storefrontToken,
      signal: controller.signal
    });
  }
};
var Dev = _Dev;
Dev.description = color2.hex(brand2.colors.yellowgreen)(
  "Uploads the current theme as a development theme to the connected store, then prints theme editor and preview URLs to your terminal. While running, changes will push to the store in real time."
);
Dev.flags = {
  ...globalFlags,
  path: theme_flags_default.path,
  host: Flags.string({
    description: "Set which network interface the web server listens on. The default value is 127.0.0.1.",
    env: "SHOPIFY_FLAG_HOST"
  }),
  "live-reload": Flags.string({
    description: `The live reload mode switches the server behavior when a file is modified:
- hot-reload Hot reloads local changes to CSS and sections (default)
- full-page  Always refreshes the entire page
- off        Deactivate live reload`,
    default: "hot-reload",
    options: ["hot-reload", "full-page", "off"],
    env: "SHOPIFY_FLAG_LIVE_RELOAD"
  }),
  poll: Flags.boolean({
    description: "Force polling to detect file changes.",
    env: "SHOPIFY_FLAG_POLL"
  }),
  "theme-editor-sync": Flags.boolean({
    char: "e",
    description: "Synchronize Theme Editor updates in the local theme files.",
    env: "SHOPIFY_FLAG_THEME_EDITOR_SYNC"
  }),
  port: Flags.string({
    description: "Local port to serve theme preview from.",
    env: "SHOPIFY_FLAG_PORT"
  }),
  store: theme_flags_default.store,
  theme: Flags.string({
    char: "t",
    description: "Theme ID or name of the remote theme.",
    env: "SHOPIFY_FLAG_THEME_ID"
  }),
  only: Flags.string({
    char: "o",
    multiple: true,
    description: "Hot reload only files that match the specified pattern.",
    env: "SHOPIFY_FLAG_ONLY"
  }),
  ignore: Flags.string({
    char: "x",
    multiple: true,
    description: "Skip hot reloading any files that match the specified pattern.",
    env: "SHOPIFY_FLAG_IGNORE"
  }),
  stable: Flags.boolean({
    hidden: true,
    description: "Performs the upload by relying in the legacy upload approach (slower, but it might be more stable in some scenarios)",
    env: "SHOPIFY_FLAG_STABLE"
  }),
  force: Flags.boolean({
    hidden: true,
    char: "f",
    description: "Proceed without confirmation, if current directory does not seem to be theme directory.",
    env: "SHOPIFY_FLAG_FORCE"
  }),
  password: theme_flags_default.password,
  mode: Flags.string({
    char: "m",
    description: "Loaded env variables from specific env files.",
    env: "NODE_ENV"
  })
};
Dev.ignoredFiles = [
  "package.json",
  "jsconfig.json",
  "src/",
  "tsconfig*.json",
  ".vscode",
  "node_modules"
];
Dev.cli2Flags = [
  "host",
  "live-reload",
  "poll",
  "theme-editor-sync",
  "port",
  "theme",
  "only",
  "ignore",
  "stable",
  "force"
];
export {
  Dev as default
};
