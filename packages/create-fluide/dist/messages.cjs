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

// src/messages.ts
var messages_exports = {};
__export(messages_exports, {
  banner: () => banner,
  error: () => error,
  getName: () => getName,
  getVersion: () => getVersion,
  info: () => info,
  nextSteps: () => nextSteps,
  typescriptByDefault: () => typescriptByDefault,
  welcome: () => welcome
});
module.exports = __toCommonJS(messages_exports);
var import_cli_kit = require("@fluide/cli-kit");
var import_node_child_process = require("child_process");
var import_node_https = require("https");
var import_strip_ansi = __toESM(require("strip-ansi"), 1);
var import_chalk = __toESM(require("chalk"), 1);

// src/utils.ts
var sleep = async (ms) => await new Promise((resolve) => setTimeout(resolve, ms));

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
${(0, import_cli_kit.label)("fluide")}  ${import_chalk.default.hex(import_cli_kit.brand.colors.yellowgreen).bold(`v${version}`)} ${import_chalk.default.bold("Launch sequence initiated. 3, 2, 1 Liftoff!")}
`);
};
var info = async (prefix, text) => {
  await sleep(100);
  if (process.stdout.columns < 80) {
    console.log(`${import_chalk.default.cyan("\u25FC")}  ${import_chalk.default.cyan(prefix)}`);
    console.log(`${" ".repeat(3)}${import_chalk.default.dim(text)}
`);
  } else {
    console.log(`${import_chalk.default.cyan("\u25FC")}  ${import_chalk.default.cyan(prefix)} ${import_chalk.default.dim(text)}
`);
  }
};
async function error(prefix, text) {
  if (process.stdout.columns < 80) {
    console.log(`${" ".repeat(5)} ${import_chalk.default.red("\u25B2")}  ${import_chalk.default.red(prefix)}`);
    console.log(`${" ".repeat(9)}${import_chalk.default.dim(text)}`);
  } else {
    console.log(`${" ".repeat(5)} ${import_chalk.default.red("\u25B2")}  ${import_chalk.default.red(prefix)} ${import_chalk.default.dim(text)}`);
  }
}
async function typescriptByDefault() {
  await info("Cool!", "Astra comes with TypeScript support enabled by default.");
  console.log(`${" ".repeat(3)}${import_chalk.default.dim("We'll default to the most relaxed settings for you.")}`);
  await sleep(300);
}
async function nextSteps({ projectDir, devCmd }) {
  const max = process.stdout.columns;
  const prefix = max < 80 ? " " : " ".repeat(9);
  await sleep(200);
  console.log(`
 ${import_chalk.default.bgCyan(` ${import_chalk.default.black("next")} `)}  ${import_chalk.default.bold("Liftoff confirmed. Explore your theme!")}`);
  await sleep(100);
  if (projectDir !== "") {
    const enter = [`
${prefix}Enter your theme directory using`, import_chalk.default.cyan(`cd ./${projectDir}`, "")];
    const len = enter[0].length + (0, import_strip_ansi.default)(enter[1]).length;
    console.log(enter.join(len > max ? "\n" + prefix : " "));
  }
  console.log(`${prefix}Run ${import_chalk.default.cyan(devCmd)} to start the dev server. ${import_chalk.default.cyan("CTRL+C")} to stop.`);
  await sleep(100);
  console.log(`${prefix}Add frameworks like ${import_chalk.default.cyan("preact")} or ${import_chalk.default.cyan("tailwind")} by checking ${import_chalk.default.cyan("fluide examples")}.`);
  await sleep(100);
  console.log(`
${prefix}Stuck? Join us at ${import_chalk.default.cyan("https://support.fluide.build/")}`);
  await sleep(200);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  banner,
  error,
  getName,
  getVersion,
  info,
  nextSteps,
  typescriptByDefault,
  welcome
});
