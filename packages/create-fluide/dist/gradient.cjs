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

// src/gradient.ts
var gradient_exports = {};
__export(gradient_exports, {
  loadWithRocketGradient: () => loadWithRocketGradient,
  rocketAscii: () => rocketAscii
});
module.exports = __toCommonJS(gradient_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  loadWithRocketGradient,
  rocketAscii
});
