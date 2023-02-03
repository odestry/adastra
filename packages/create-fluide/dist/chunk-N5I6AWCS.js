// src/gradient.ts
import { brand } from "@fluide/cli-kit";
import color from "chalk";
import ora from "ora";
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
      referenceGradient.slice(start, end).map((g) => color.bgHex(g)(" ")).join("")
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
    const gradientArr = gradientColors.slice(0, end).map((g) => color.bgHex(g)(" "));
    frames.push([...leadingSpacesArr, ...gradientArr].join(""));
  }
  return frames;
}
async function loadWithRocketGradient(text) {
  const frames = getIntroAnimFrames();
  const intro = ora({
    spinner: {
      interval: 30,
      frames
    },
    text: `${rocketAscii} ${text}`
  });
  intro.start();
  await sleep((frames.length - 1) * intro.interval);
  intro.stop();
  const spinner = ora({
    spinner: {
      interval: 80,
      frames: getGradientAnimFrames()
    },
    text: color.hex(brand.colors.spaceblue)(`${rocketAscii} ${text}`)
  }).start();
  return spinner;
}

export {
  rocketAscii,
  loadWithRocketGradient
};
