import readline from 'node:readline'
import chalk from 'chalk'
import logUpdate from 'log-update'
import { erase, cursor } from 'sisteransi'
import { sleep } from './utils/index.js'
import { COLORS } from 'adastra-branding'

export const FULL_FRAMES = [
  ...Array.from(
    { length: COLORS.gradient.length - 1 },
    () => COLORS.gradient[0]
  ),
  ...COLORS.gradient,
  ...Array.from(
    { length: COLORS.gradient.length - 1 },
    () => COLORS.gradient[COLORS.gradient.length - 1]
  ),
  ...[...COLORS.gradient].reverse()
]

export const frame = (offset = 0): string[] => {
  const frames = FULL_FRAMES.slice(
    offset,
    offset + (COLORS.gradient.length - 2)
  )
  if (frames.length < COLORS.gradient.length - 2) {
    const filled = new Array(COLORS.gradient.length - frames.length - 2).fill(
      COLORS.gradient[0]
    )
    frames.push(...filled)
  }
  return frames
}

// get a reference to scroll through while loading
// visual representation of what this generates:
// gradientColors: "..xxXX"
// referenceGradient: "..xxXXXXxx....xxXX"
export const GRADIENT = [...FULL_FRAMES.map((_, i) => frame(i))].reverse()

export const getGradientAnimFrames = (): string[] => {
  return GRADIENT.map(
    colors => ' ' + colors.map(g => chalk.hex(g)('█')).join('')
  )
}

/**
 * Generate loading spinner with rocket flames!
 * @param text display text next to rocket
 * @returns Ora spinner for running .stop()
 */
export const gradient = async (
  text: string
): Promise<{
  start: () => void
  stop: () => void
}> => {
  let i = 0
  const frames = getGradientAnimFrames()
  let interval: NodeJS.Timeout

  const rl = readline.createInterface({
    input: process.stdin,
    escapeCodeTimeout: 50
  })
  readline.emitKeypressEvents(process.stdin, rl)

  if (process.stdin.isTTY) process.stdin.setRawMode(true)
  const keypress = (): void => {
    if (process.stdin.isTTY) process.stdin.setRawMode(true)
    process.stdout.write(cursor.hide + erase.lines(2))
  }

  let done = false
  const spinner = {
    start() {
      process.stdout.write(cursor.hide)
      process.stdin.on('keypress', keypress)
      logUpdate(`${frames[0]}  ${text}`)

      const loop = async (): Promise<void> => {
        if (done) return
        if (i < frames.length - 1) {
          i++
        } else {
          i = 0
        }
        const frame = frames[i]
        logUpdate(`${frame}  ${text}`)
        if (!done) await sleep(90)
        await loop()
      }

      void loop()
    },
    stop() {
      done = true
      process.stdin.removeListener('keypress', keypress)
      clearInterval(interval)
      logUpdate.clear()
    }
  }
  spinner.start()
  return spinner
}

export const spinner = async ({
  start,
  end,
  while: update = async () => await sleep(100)
}: {
  start: string
  end: string
  while: (...args: any) => Promise<any>
}): Promise<void> => {
  const act = update()
  const tooslow = Object.create(null)
  const result = await Promise.race([sleep(500).then(() => tooslow), act])
  if (result === tooslow) {
    const loading = await gradient(chalk.green(start))
    await act
    loading.stop()
  }
  console.log(`${' '.repeat(5)} ${chalk.green('✔')}  ${chalk.green(end)}`)
}
