"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  main: () => main,
  mkdirp: () => mkdirp
});
module.exports = __toCommonJS(src_exports);
var import_fs = __toESM(require("fs"), 1);
var import_path = __toESM(require("path"), 1);
var import_prompts = __toESM(require("prompts"), 1);
var import_which_pm_runs = __toESM(require("which-pm-runs"), 1);
var import_yargs_parser = __toESM(require("yargs-parser"), 1);
var import_ora2 = __toESM(require("ora"), 1);
var import_chalk3 = __toESM(require("chalk"), 1);
var import_comment_json = require("comment-json");
var import_execa = require("execa");
var import_giget = require("giget");
var import_colors2 = require("kleur/colors");
var import_os = require("os");
var import_cli_kit3 = require("@fluide/cli-kit");

// src/gradient.ts
var import_cli_kit = require("@fluide/cli-kit");
var import_chalk = __toESM(require("chalk"), 1);
var import_ora = __toESM(require("ora"), 1);
var gradientColors = [
  "#79E7FF",
  "#88E9F7",
  "#93EADB",
  "#9CEBC3",
  "#A2ECB5",
  "#ABED9C",
  "#B5EE82",
  "#BEEF6C",
  "#C8F153",
  "#CAF14C",
  "#CFF242"
];
var rocketAscii = "\u25A0\u25A0\u25B6";
var referenceGradient = [
  ...gradientColors,
  ...[...gradientColors].reverse(),
  ...gradientColors
];
var sleep = async (time) => await new Promise((resolve) => {
  setTimeout(resolve, time);
});
function getGradientAnimFrames() {
  const frames = [];
  for (let start = 0; start < gradientColors.length * 2; start++) {
    const end = start + gradientColors.length - 1;
    frames.push(
      referenceGradient.slice(start, end).map((g) => import_chalk.default.bgHex(g)(" ")).join("")
    );
  }
  return frames;
}
function getIntroAnimFrames() {
  const frames = [];
  for (let end = 1; end <= gradientColors.length; end++) {
    const leadingSpacesArr = Array.from(
      new Array(Math.abs(gradientColors.length - end - 1)),
      () => " "
    );
    const gradientArr = gradientColors.slice(0, end).map((g) => import_chalk.default.bgHex(g)(" "));
    frames.push([...leadingSpacesArr, ...gradientArr].join(""));
  }
  return frames;
}
async function loadWithRocketGradient(text) {
  const frames = getIntroAnimFrames();
  const intro = (0, import_ora.default)({
    spinner: {
      interval: 30,
      frames
    },
    text: `${rocketAscii} ${text}`
  });
  intro.start();
  await sleep((frames.length - 1) * intro.interval);
  intro.stop();
  const spinner = (0, import_ora.default)({
    spinner: {
      interval: 80,
      frames: getGradientAnimFrames()
    },
    text: import_chalk.default.hex(import_cli_kit.brand.colors.spaceblue)(`${rocketAscii} ${text}`)
  }).start();
  return spinner;
}

// src/logger.ts
var import_colors = require("kleur/colors");
var import_stream = require("stream");
var import_util = require("util");
var dt = new Intl.DateTimeFormat([], {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit"
});
var defaultLogDestination = new import_stream.Writable({
  objectMode: true,
  write(event, _, callback) {
    let dest = process.stderr;
    if (levels[event.level] < levels.error)
      dest = process.stdout;
    dest.write((0, import_colors.dim)(dt.format(new Date()) + " "));
    let type = event.type;
    if (type != null) {
      switch (event.level) {
        case "info":
          type = (0, import_colors.bold)((0, import_colors.blue)(type));
          break;
        case "warn":
          type = (0, import_colors.bold)((0, import_colors.yellow)(type));
          break;
        case "error":
          type = (0, import_colors.bold)((0, import_colors.red)(type));
          break;
      }
      dest.write(`[${type}] `);
    }
    dest.write((0, import_util.format)(...event.args));
    dest.write("\n");
    callback();
  }
});
var defaultLogLevel;
if (process.argv.includes("--verbose")) {
  defaultLogLevel = "debug";
} else if (process.argv.includes("--silent")) {
  defaultLogLevel = "silent";
} else {
  defaultLogLevel = "info";
}
var defaultLogOptions = {
  dest: defaultLogDestination,
  level: defaultLogLevel
};
var levels = {
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  silent: 90
};
function log(opts = {}, level, type, ...args2) {
  const logLevel = opts.level ?? defaultLogOptions.level;
  const dest = opts.dest ?? defaultLogOptions.dest;
  const event = {
    type,
    level,
    args: args2,
    message: ""
  };
  if (levels[logLevel] > levels[level]) {
    return;
  }
  dest.write(event);
}
function debug(opts, type, ...messages) {
  return log(opts, "debug", type, ...messages);
}
function info(opts, type, ...messages) {
  return log(opts, "info", type, ...messages);
}
function warn(opts, type, ...messages) {
  return log(opts, "warn", type, ...messages);
}
function error(opts, type, ...messages) {
  return log(opts, "error", type, ...messages);
}
var logger = {
  debug: debug.bind(null, defaultLogOptions, "debug"),
  info: info.bind(null, defaultLogOptions, "info"),
  warn: warn.bind(null, defaultLogOptions, "warn"),
  error: error.bind(null, defaultLogOptions, "error")
};

// src/messages.ts
var import_cli_kit2 = require("@fluide/cli-kit");
var import_node_child_process = require("child_process");
var import_node_https = require("https");
var import_strip_ansi = __toESM(require("strip-ansi"), 1);
var import_chalk2 = __toESM(require("chalk"), 1);

// src/utils.ts
var sleep2 = async (ms) => await new Promise((resolve) => setTimeout(resolve, ms));
var random = (...arr) => {
  arr = arr.flat(1);
  return arr[Math.floor(arr.length * Math.random())];
};

// src/messages.ts
var welcome = [
  "Let's claim your online store on Shopify.",
  "I'll be your assistant today.",
  "Let's build something awesome!",
  "Let's build something great!",
  "Let's build something fast!",
  "Let's make merchants some money!",
  "Let's make the web a better place!",
  "Let's create a new project!",
  "Let's create something unique!",
  "Time to build a new storefront.",
  "Time to build a faster storefront.",
  "Time to build a sweet new store.",
  "We're glad to have you on board.",
  "Keeping the internet weird since 2023.",
  "Initiating launch sequence...",
  "Initiating launch sequence... right... now!",
  "Awaiting further instructions."
];
var getName = async () => {
  return await new Promise((resolve) => {
    (0, import_node_child_process.exec)("git config user.name", { encoding: "utf-8" }, (_1, gitName, _2) => {
      if (gitName.trim()) {
        return resolve(gitName.split(" ")[0].trim());
      }
      (0, import_node_child_process.exec)("whoami", { encoding: "utf-8" }, (_3, whoami, _4) => {
        if (whoami.trim()) {
          return resolve(whoami.split(" ")[0].trim());
        }
        return resolve("astronaut");
      });
    });
  });
};
var v;
var getVersion = async () => {
  return await new Promise((resolve) => {
    if (v)
      return resolve(v);
    (0, import_node_https.get)("https://registry.npmjs.org/fluide-plugin/latest", (res) => {
      let body = "";
      res.on("data", (chunk) => body += chunk);
      res.on("end", () => {
        const { version } = JSON.parse(body);
        v = version;
        resolve(version);
      });
    });
  });
};
var banner = async (version) => {
  return console.log(`
${(0, import_cli_kit2.label)("fluide")}  ${import_chalk2.default.hex(import_cli_kit2.brand.colors.yellowgreen).bold(`v${version}`)} ${import_chalk2.default.bold("Launch sequence initiated. 3, 2, 1 Liftoff!")}
`);
};
var info2 = async (prefix, text) => {
  await sleep2(100);
  if (process.stdout.columns < 80) {
    console.log(`${import_chalk2.default.cyan("\u25FC")}  ${import_chalk2.default.cyan(prefix)}`);
    console.log(`${" ".repeat(3)}${import_chalk2.default.dim(text)}
`);
  } else {
    console.log(`${import_chalk2.default.cyan("\u25FC")}  ${import_chalk2.default.cyan(prefix)} ${import_chalk2.default.dim(text)}
`);
  }
};
async function typescriptByDefault() {
  await info2("Cool!", "Astra comes with TypeScript support enabled by default.");
  console.log(`${" ".repeat(3)}${import_chalk2.default.dim("We'll default to the most relaxed settings for you.")}`);
  await sleep2(300);
}
async function nextSteps({ projectDir, devCmd }) {
  const max = process.stdout.columns;
  const prefix = max < 80 ? " " : " ".repeat(9);
  await sleep2(200);
  console.log(`
 ${import_chalk2.default.bgCyan(` ${import_chalk2.default.black("next")} `)}  ${import_chalk2.default.bold("Liftoff confirmed. Explore your theme!")}`);
  await sleep2(100);
  if (projectDir !== "") {
    const enter = [`
${prefix}Enter your theme directory using`, import_chalk2.default.cyan(`cd ./${projectDir}`, "")];
    const len = enter[0].length + (0, import_strip_ansi.default)(enter[1]).length;
    console.log(enter.join(len > max ? "\n" + prefix : " "));
  }
  console.log(`${prefix}Run ${import_chalk2.default.cyan(devCmd)} to start the dev server. ${import_chalk2.default.cyan("CTRL+C")} to stop.`);
  await sleep2(100);
  console.log(`${prefix}Add frameworks like ${import_chalk2.default.cyan("preact")} or ${import_chalk2.default.cyan("tailwind")} by checking ${import_chalk2.default.cyan("fluide examples")}.`);
  await sleep2(100);
  console.log(`
${prefix}Stuck? Join us at ${import_chalk2.default.cyan("https://support.fluide.build/")}`);
  await sleep2(200);
}

// src/templates.ts
var TEMPLATES = [
  { value: "basics", title: "Some few best practices (recommended)" },
  { value: "lite", title: "A starter for building reusable sections" },
  { value: "minimal", title: "An empty theme project" }
];

// src/index.ts
var cleanArgv = process.argv.filter((arg) => arg !== "--");
var args = (0, import_yargs_parser.default)(cleanArgv, { boolean: ["fancy", "y"], alias: { y: "yes" } });
if ((0, import_os.platform)() === "win32")
  args.skipTars = true;
import_prompts.default.override(args);
var mkdirp = (dir) => {
  try {
    import_fs.default.mkdirSync(dir, { recursive: true });
  } catch (e) {
    if (e.code === "EEXIST")
      return;
    throw e;
  }
};
var VALID_PROJECT_DIRECTORY_SAFE_LIST = [
  ".DS_Store",
  ".git",
  ".gitattributes",
  ".gitignore",
  ".gitlab-ci.yml",
  ".hg",
  ".hgcheck",
  ".hgignore",
  ".idea",
  ".npmignore",
  ".travis.yml",
  ".yarn",
  ".yarnrc.yml",
  "docs",
  "LICENSE",
  "mkdocs.yml",
  "Thumbs.db",
  /\.iml$/,
  /^npm-debug\.log/,
  /^yarn-debug\.log/,
  /^yarn-error\.log/
];
var isValidProjectDirectory = (dirPath) => {
  if (!import_fs.default.existsSync(dirPath)) {
    return true;
  }
  const conflicts = import_fs.default.readdirSync(dirPath).filter((content) => {
    return !VALID_PROJECT_DIRECTORY_SAFE_LIST.some((safeContent) => {
      return typeof safeContent === "string" ? content === safeContent : safeContent.test(content);
    });
  });
  return conflicts.length === 0;
};
var FILES_TO_REMOVE = [".theme-check.yml", "CHANGELOG.md"];
async function main() {
  const pkgManager = (0, import_which_pm_runs.default)()?.name || "npm";
  const [username, version] = await Promise.all([getName(), getVersion()]);
  logger.debug("Verbose logging turned on");
  if (!args.skipTars) {
    await (0, import_cli_kit3.say)(
      [
        [
          "Welcome",
          "to",
          (0, import_cli_kit3.label)("fluide"),
          import_chalk3.default.hex(import_cli_kit3.brand.colors.yellowgreen)(`v${version}`) + ",",
          `${username}!`
        ],
        random(welcome)
      ]
    );
    await banner(version);
  }
  let cwd = args._[2];
  if (cwd && isValidProjectDirectory(cwd)) {
    const acknowledgeProjectDir = (0, import_ora2.default)({
      color: "yellow",
      text: `Using ${(0, import_colors2.bold)(cwd)} as project directory.`
    });
    acknowledgeProjectDir.succeed();
  }
  if (!cwd || !isValidProjectDirectory(cwd)) {
    const notEmptyMsg = (dirPath) => `"${(0, import_colors2.bold)(dirPath)}" is not empty!`;
    if (!isValidProjectDirectory(cwd)) {
      const rejectProjectDir = (0, import_ora2.default)({ color: "red", text: notEmptyMsg(cwd) });
      rejectProjectDir.fail();
    }
    const dirResponse = await (0, import_prompts.default)(
      {
        type: "text",
        name: "directory",
        message: "Where would you like to create your new Shopify project?",
        initial: (0, import_cli_kit3.generateProjectName)(),
        validate(value) {
          if (!isValidProjectDirectory(value))
            return notEmptyMsg(value);
          return true;
        }
      },
      { onCancel: () => (0, import_ora2.default)().info((0, import_colors2.dim)("Operation cancelled. See you later, astronaut!")) }
    );
    cwd = dirResponse.directory;
  }
  if (!cwd) {
    (0, import_ora2.default)().info((0, import_colors2.dim)("No directory provided. See you later, astronaut!"));
    process.exit(1);
  }
  const options = await (0, import_prompts.default)(
    [
      {
        type: "select",
        name: "template",
        message: "How would you like to setup your theme project?",
        choices: TEMPLATES
      }
    ],
    {
      onCancel: () => (0, import_ora2.default)().info((0, import_colors2.dim)("Operation cancelled. See you later, astronaut!"))
    }
  );
  if (!options.template || options.template === true) {
    (0, import_ora2.default)().info((0, import_colors2.dim)("No template provided. See you later, astronaut!"));
    process.exit(1);
  }
  const templateSpinner = await loadWithRocketGradient("Copying theme files and folders...");
  const hash = args.commit ? `#${args.commit}` : "";
  const isThirdParty = options.template.includes("/");
  const templateTarget = isThirdParty ? options.template : `withastro/astro/examples/${options.template}#latest`;
  if (!args.dryRun) {
    try {
      await (0, import_giget.downloadTemplate)(`${templateTarget}${hash}`, {
        force: true,
        provider: "github",
        cwd,
        dir: "."
      });
    } catch (err) {
      import_fs.default.rmdirSync(cwd);
      if (err.message.includes("404")) {
        console.error(`Could not find template ${import_chalk3.default.underline(options.template)}!`);
        if (isThirdParty) {
          const hasBranch = options.template.includes("#");
          if (hasBranch) {
            console.error("Are you sure this GitHub repo and branch exist?");
          } else {
            console.error(
              `Are you sure this GitHub repo exists?This command uses the ${import_chalk3.default.bold("main")} branch by default.
If the repo doesn't have a main branch, specify a custom branch name:
` + import_chalk3.default.underline(options.template + import_chalk3.default.bold("#branch-name"))
            );
          }
        }
      } else {
        console.error(err.message);
      }
      process.exit(1);
    }
    await Promise.all(
      FILES_TO_REMOVE.map(async (file) => {
        const fileLoc = import_path.default.resolve(import_path.default.join(cwd, file));
        if (import_fs.default.existsSync(fileLoc)) {
          return await import_fs.default.promises.rm(fileLoc, {});
        }
      })
    );
  }
  templateSpinner.text = (0, import_colors2.green)("Theme copied!");
  templateSpinner.succeed();
  const install = args.y ? true : (await (0, import_prompts.default)(
    {
      type: "confirm",
      name: "install",
      message: `Would you like to install ${pkgManager} dependencies? ${(0, import_colors2.reset)((0, import_colors2.dim)("(recommended)"))}`,
      initial: true
    },
    {
      onCancel: () => {
        (0, import_ora2.default)().info(
          (0, import_colors2.dim)(
            "Operation cancelled. Your project folder has already been created, however no dependencies have been installed"
          )
        );
        process.exit(1);
      }
    }
  )).install;
  if (args.dryRun) {
    (0, import_ora2.default)().info((0, import_colors2.dim)("--dry-run enabled, skipping installing dependencies."));
  } else if (install) {
    const installExec = (0, import_execa.execa)(pkgManager, ["install"], { cwd });
    const installingPackagesMsg = `Installing packages${emojiWithFallback(" \u{1F4E6}", "...")}`;
    const installSpinner = await loadWithRocketGradient(installingPackagesMsg);
    await new Promise((resolve, reject) => {
      installExec.stdout?.on("data", (data) => {
        installSpinner.text = `${rocketAscii} ${installingPackagesMsg}
${(0, import_colors2.bold)(`[${pkgManager}]`)} ${data}`;
      });
      installExec.on("error", (error2) => reject(error2));
      installExec.on("close", () => resolve());
    });
    installSpinner.text = (0, import_colors2.green)("Packages installed!");
    installSpinner.succeed();
  } else {
    await info2("No problem astronaut!", "Remember to install dependencies after setup.");
  }
  const gitResponse = args.y ? true : (await (0, import_prompts.default)(
    {
      type: "confirm",
      name: "git",
      message: `Would you like to initialize a new git repository? ${(0, import_colors2.reset)((0, import_colors2.dim)("(optional)"))}`,
      initial: true
    },
    {
      onCancel: () => {
        (0, import_ora2.default)().info(
          (0, import_colors2.dim)("Operation cancelled. No worries, your project folder has already been created")
        );
        process.exit(1);
      }
    }
  )).git;
  if (args.dryRun) {
    (0, import_ora2.default)().info((0, import_colors2.dim)("--dry-run enabled, skipping."));
  } else if (gitResponse) {
    const gitDir = "./.git";
    if (import_fs.default.existsSync(gitDir)) {
      (0, import_ora2.default)().info((0, import_colors2.dim)("A .git directory already exists. Skipping creating a new Git repository."));
    } else {
      await (0, import_execa.execaCommand)("git init", { cwd });
      (0, import_ora2.default)().succeed("Git repository created!");
    }
  } else {
    await info2("Sounds good!", `You can come back and run ${import_chalk3.default.reset("git init")}${import_chalk3.default.dim(" later.")}`);
  }
  if (args.y && !args.typescript) {
    (0, import_ora2.default)().warn((0, import_colors2.dim)('--typescript <choice> missing. Defaulting to "strict"'));
    args.typescript = "strict";
  }
  let tsResponse = args.typescript || (await (0, import_prompts.default)(
    {
      type: "select",
      name: "typescript",
      message: "How would you like to setup TypeScript?",
      choices: [
        { value: "strict", title: "Strict", description: "(recommended)" },
        { value: "strictest", title: "Strictest" },
        { value: "base", title: "Relaxed" },
        { value: "unsure", title: "Help me choose" }
      ]
    },
    {
      onCancel: () => {
        (0, import_ora2.default)().info(
          (0, import_colors2.dim)(
            "Operation cancelled. Your project folder has been created but no TypeScript configuration file was created."
          )
        );
        process.exit(1);
      }
    }
  )).typescript;
  if (tsResponse === "unsure") {
    await typescriptByDefault();
    tsResponse = "base";
  }
  if (args.dryRun) {
    (0, import_ora2.default)().info((0, import_colors2.dim)("--dry-run enabled, skipping."));
  } else if (tsResponse) {
    const templateTSConfigPath = import_path.default.join(cwd, "tsconfig.json");
    import_fs.default.readFile(templateTSConfigPath, (err, data) => {
      if (err != null && err.code === "ENOENT") {
        import_fs.default.writeFileSync(
          templateTSConfigPath,
          (0, import_comment_json.stringify)({ extends: `astro/tsconfigs/${tsResponse ?? "base"}` }, null, 2)
        );
        return;
      }
      const templateTSConfig = (0, import_comment_json.parse)(data.toString());
      if (templateTSConfig && typeof templateTSConfig === "object") {
        const result = (0, import_comment_json.assign)(templateTSConfig, {
          extends: `astro/tsconfigs/${tsResponse ?? "base"}`
        });
        import_fs.default.writeFileSync(templateTSConfigPath, (0, import_comment_json.stringify)(result, null, 2));
      } else {
        console.log(
          (0, import_colors2.yellow)("There was an error applying the requested TypeScript settings. This could be because the template's tsconfig.json is malformed")
        );
      }
    });
    (0, import_ora2.default)().succeed("TypeScript settings applied!");
  }
  const projectDir = import_path.default.relative(process.cwd(), cwd);
  const devCmd = pkgManager === "npm" ? "npm run dev" : `${pkgManager} dev`;
  await nextSteps({ projectDir, devCmd });
  if (!args.skipTars) {
    await (0, import_cli_kit3.say)(["Good luck out there, astronaut!"]);
  }
}
var emojiWithFallback = (char, fallback) => {
  return process.platform !== "win32" ? char : fallback;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  main,
  mkdirp
});
