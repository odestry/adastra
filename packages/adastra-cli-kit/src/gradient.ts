import color from 'chalk'
import type { Ora } from 'ora'
import ora from 'ora'
import { COLORS } from 'adastra-branding'

export const rocketAscii = '■▶'

// get a reference to scroll through while loading
// visual representation of what this generates:
// COLORS.gradient: "..xxXX"
// referenceGradient: "..xxXXXXxx....xxXX"
const referenceGradient = [
  ...COLORS.gradient,
  // draw the reverse of the gradient without
  // accidentally mutating the gradient (ugh, reverse())
  ...[...COLORS.gradient].reverse(),
  ...COLORS.gradient
]

// async-friendly setTimeout
// eslint-disable-next-line
const sleep = async (time: number): Promise<any> =>
  await new Promise(resolve => {
    setTimeout(resolve, time)
  })

function getGradientAnimFrames(): string[] {
  const frames = []
  for (let start = 0; start < COLORS.gradient.length * 2; start++) {
    const end = start + COLORS.gradient.length - 1
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
  for (let end = 1; end <= COLORS.gradient.length; end++) {
    const leadingSpacesArr = Array.from(
      new Array(Math.abs(COLORS.gradient.length - end - 1)),
      () => ' '
    )
    const gradientArr = COLORS.gradient
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
    text: color.hex(COLORS.yellowGreen)(`${rocketAscii} ${text} \n`)
  }).start()
  return spinner
}
