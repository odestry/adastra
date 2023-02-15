import { brand } from './brand'
import color from 'chalk'
import type { Ora } from 'ora'
import ora from 'ora'

const gradientColors = [
  '#79E7FF',
  '#88E9F7',
  '#93EADB',
  '#9CEBC3',
  '#A2ECB5',
  '#ABED9C',
  '#B5EE82',
  '#BEEF6C',
  '#C8F153',
  '#CAF14C',
  '#CFF242'
]

export const rocketAscii = '■▶'

// get a reference to scroll through while loading
// visual representation of what this generates:
// gradientColors: "..xxXX"
// referenceGradient: "..xxXXXXxx....xxXX"
const referenceGradient = [
  ...gradientColors,
  // draw the reverse of the gradient without
  // accidentally mutating the gradient (ugh, reverse())
  ...[...gradientColors].reverse(),
  ...gradientColors
]

// async-friendly setTimeout
const sleep = async (time: number): Promise<any> =>
  await new Promise(resolve => {
    setTimeout(resolve, time)
  })

function getGradientAnimFrames(): string[] {
  const frames = []
  for (let start = 0; start < gradientColors.length * 2; start++) {
    const end = start + gradientColors.length - 1
    frames.push(
      referenceGradient
        .slice(start, end)
        .map(g => color.bgHex(g)(' '))
        .join('')
    )
  }
  return frames
}

function getIntroAnimFrames(): string[] {
  const frames = []
  for (let end = 1; end <= gradientColors.length; end++) {
    const leadingSpacesArr = Array.from(
      new Array(Math.abs(gradientColors.length - end - 1)),
      () => ' '
    )
    const gradientArr = gradientColors
      .slice(0, end)
      .map(g => color.bgHex(g)(' '))
    frames.push([...leadingSpacesArr, ...gradientArr].join(''))
  }
  return frames
}

/**
 * Generate loading spinner with rocket flames!
 * @param text display text next to rocket
 * @returns Ora spinner for running .stop()
 */
export async function loadWithRocketGradient(text: string): Promise<Ora> {
  const frames = getIntroAnimFrames()
  const intro = ora({
    spinner: {
      interval: 10,
      frames
    },
    text: `${rocketAscii} ${text}`
  })
  intro.start()
  await sleep((frames.length - 1) * intro.interval)
  intro.stop()
  const spinner = ora({
    spinner: {
      interval: 60,
      frames: getGradientAnimFrames()
    },
    text: color.hex(brand.colors.yellowgreen)(`${rocketAscii} ${text} \n`)
  }).start()
  return spinner
}
