import readline from 'node:readline'
import color from 'chalk'
import moment from 'moment'
import logUpdate from 'log-update'
import { random, randomBetween, sleep, enableAscii } from './utils.js'
import { action } from './util/action.js'
import { brand } from './brand.js'

export const say = async (
  messages: string | string[] = [],
  { clear = false } = {}
): Promise<void> => {
  const rl = readline.createInterface({
    input: process.stdin,
    escapeCodeTimeout: 50
  })
  readline.emitKeypressEvents(process.stdin, rl)
  let i = 0
  let cancelled = false
  const done = async (): Promise<void> => {
    process.stdin.off('keypress', done)
    if (process.stdin.isTTY) process.stdin.setRawMode(false)
    rl.close()
    cancelled = true
    if (i < messages.length - 1) {
      logUpdate.clear()
    } else if (clear) {
      logUpdate.clear()
    } else {
      logUpdate.done()
    }
  }

  if (process.stdin.isTTY) process.stdin.setRawMode(true)
  process.stdin.on('keypress', (str, key) => {
    if (process.stdin.isTTY) process.stdin.setRawMode(true)
    const k = action(key, true)
    if (k === 'abort') {
      done()
      return process.exit(0)
    }
    if (['up', 'down', 'left', 'right'].includes(k as any)) return
    done()
  })

  const _messages = Array.isArray(messages) ? messages : [messages]
  const eyes = enableAscii()
    ? ['•', '•', 'o', 'o', '•', 'O', '^', '•']
    : ['●', '●', '●', '●', '●', '○', '○', '•']
  const mouths = enableAscii()
    ? ['•', 'O', '*', 'o', 'o', '•', '-']
    : ['•', '○', '■', '▪', '▫', '▬', '▭', '-', '○']
  const walls = enableAscii() ? ['—', '|'] : ['─', '│']
  const corners = enableAscii() ? ['+', '+', '+', '+'] : ['╭', '╮', '╰', '╯']

  const face = (
    msg: string,
    { mouth = mouths[0], eye = eyes[0] } = {}
  ): string => {
    const [h, v] = walls
    const [tl, tr, bl, br] = corners
    const head = h.repeat(3)
    return [
      `${tl}${h.repeat(2)}${head}${tr}`,
      `${v} ${eye} ${color.hex(brand.colors.yellowgreen)(mouth)} ${eye} ${color
        .hex(brand.colors.yellowgreen)
        .bold(brand.tars)}`,
      `${v}${' '.repeat(5)}${v} ${msg}`,
      `${bl}${h.repeat(5)}${br}`
    ].join('\n')
  }

  for (const message of _messages) {
    const _message = Array.isArray(message) ? message : message.split(' ')
    const msg = []
    let eye = random(eyes)
    let j = 0
    for (const word of [''].concat(_message)) {
      if (word) msg.push(word)
      const mouth = random(mouths)
      if (j % 7 === 0) eye = random(eyes)

      // eslint-disable-next-line no-self-assign
      if (i === 1) eye = eye
      logUpdate('\n' + face(msg.join(' '), { mouth, eye }))
      if (!cancelled) await sleep(randomBetween(50, 150))
      j++
    }
    if (!cancelled) await sleep(75)
    const text =
      '\n' +
      face(_message.join(' '), {
        mouth: enableAscii() ? 'u' : '◡',
        eye: enableAscii() ? '^' : '◠'
      })
    logUpdate(text)
    if (!cancelled) await sleep(randomBetween(1000, 1200))
    i++
  }

  process.stdin.off('keypress', done)
  await sleep(75)
  done()
  if (process.stdin.isTTY) process.stdin.setRawMode(false)
  process.stdin.removeAllListeners('keypress')
}

export const label = (
  text: string,
  c = color.bgHex(brand.colors.yellowgreen),
  t = color.white
): string => c(` ${t(text)} `)

export const colored = (
  text: string,
  c = color.hex(brand.colors.yellowgreen)
): string => c(text)

export const prefixed = (text: string, c = brand.colors.yellowgreen): string =>
  `${color.white(moment().format('hh:mm:ss'))} ${color
    .hex(c)
    .bold(`[${brand.adastra}]`)} ${text}`
