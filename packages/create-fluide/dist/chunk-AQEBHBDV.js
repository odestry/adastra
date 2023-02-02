import {
  sleep
} from "./chunk-UIY7LUGK.js";

// src/messages.ts
import { label, brand } from "@fluide/cli-kit";
import { exec } from "child_process";
import { get } from "https";
import stripAnsi from "strip-ansi";
import color from "chalk";
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
    exec("git config user.name", { encoding: "utf-8" }, (_1, gitName, _2) => {
      if (gitName.trim()) {
        return resolve(gitName.split(" ")[0].trim());
      }
      exec("whoami", { encoding: "utf-8" }, (_3, whoami, _4) => {
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
    get("https://registry.npmjs.org/fluide-plugin/latest", (res) => {
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
${label("fluide")}  ${color.hex(brand.colors.yellowgreen).bold(`v${version}`)} ${color.bold("Launch sequence initiated. 3, 2, 1 Liftoff!")}
`);
};
var info = async (prefix, text) => {
  await sleep(100);
  if (process.stdout.columns < 80) {
    console.log(`${color.cyan("\u25FC")}  ${color.cyan(prefix)}`);
    console.log(`${" ".repeat(3)}${color.dim(text)}
`);
  } else {
    console.log(`${color.cyan("\u25FC")}  ${color.cyan(prefix)} ${color.dim(text)}
`);
  }
};
async function error(prefix, text) {
  if (process.stdout.columns < 80) {
    console.log(`${" ".repeat(5)} ${color.red("\u25B2")}  ${color.red(prefix)}`);
    console.log(`${" ".repeat(9)}${color.dim(text)}`);
  } else {
    console.log(`${" ".repeat(5)} ${color.red("\u25B2")}  ${color.red(prefix)} ${color.dim(text)}`);
  }
}
async function typescriptByDefault() {
  await info("Cool!", "Astra comes with TypeScript support enabled by default.");
  console.log(`${" ".repeat(3)}${color.dim("We'll default to the most relaxed settings for you.")}`);
  await sleep(300);
}
async function nextSteps({ projectDir, devCmd }) {
  const max = process.stdout.columns;
  const prefix = max < 80 ? " " : " ".repeat(9);
  await sleep(200);
  console.log(`
 ${color.bgCyan(` ${color.black("next")} `)}  ${color.bold("Liftoff confirmed. Explore your theme!")}`);
  await sleep(100);
  if (projectDir !== "") {
    const enter = [`
${prefix}Enter your theme directory using`, color.cyan(`cd ./${projectDir}`, "")];
    const len = enter[0].length + stripAnsi(enter[1]).length;
    console.log(enter.join(len > max ? "\n" + prefix : " "));
  }
  console.log(`${prefix}Run ${color.cyan(devCmd)} to start the dev server. ${color.cyan("CTRL+C")} to stop.`);
  await sleep(100);
  console.log(`${prefix}Add frameworks like ${color.cyan("preact")} or ${color.cyan("tailwind")} by checking ${color.cyan("fluide examples")}.`);
  await sleep(100);
  console.log(`
${prefix}Stuck? Join us at ${color.cyan("https://support.fluide.build/")}`);
  await sleep(200);
}

export {
  welcome,
  getName,
  getVersion,
  banner,
  info,
  error,
  typescriptByDefault,
  nextSteps
};
