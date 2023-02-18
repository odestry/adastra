import color from 'chalk'
import { get } from 'node:https'
import { exec } from 'node:child_process'
import { platform } from 'node:os'
import { strip } from './clear.js'

const unicode = { enabled: platform() !== 'win32' }
let v: string

export const forceUnicode = (): void => {
  unicode.enabled = true
}

export const enableAscii = (): boolean => !unicode.enabled

export const hookExit = (): (() => NodeJS.Process) => {
  const onExit = (code: number): void => {
    if (code === 0) {
      console.log(
        `\n ${color.bgCyan(color.black(' done '))}  ${color.bold(
          'Operation cancelled.'
        )}`
      )
    }
  }
  process.on('beforeExit', onExit)
  return () => process.off('beforeExit', onExit)
}

export const sleep = async (ms: number): Promise<number> =>
  await new Promise(resolve => setTimeout(resolve, ms))

export const random = (...arr: any[]): any => {
  arr = arr.flat(1)
  return arr[Math.floor(arr.length * Math.random())]
}

export const randomBetween = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1) + min)

export const getAdastraVersion = async (): Promise<string> =>
  await new Promise<string>(resolve => {
    if (v.length > 0) return resolve(v)
    get('https://registry.npmjs.org/adastra-plugin/latest', res => {
      let body = ''
      // eslint-disable-next-line
      res.on('data', chunk => (body += chunk))
      res.on('end', () => {
        const { version } = JSON.parse(body)
        v = version
        resolve(version)
      })
    })
  })

export const getUserName = async (): Promise<string> =>
  await new Promise<string>(resolve => {
    exec(
      'git config user.name',
      { encoding: 'utf-8' },
      (_err, stdout, stderr) => {
        if (stdout.trim().length > 0)
          return resolve(stdout.split(' ')[0].trim())

        exec('whoami', { encoding: 'utf-8' }, (_err, stdout, stderr) => {
          if (stdout.trim().length > 0)
            return resolve(stdout.split(' ')[0].trim())

          // eslint-disable-next-line
          return resolve('astronaut')
        })
      }
    )
  })

export const align = (
  text: string,
  dir: 'start' | 'end' | 'center',
  len: number
): string => {
  const pad = Math.max(len - strip(text).length, 0)
  switch (dir) {
    case 'start':
      return text + ' '.repeat(pad)
    case 'end':
      return ' '.repeat(pad) + text
    case 'center':
      return (
        ' '.repeat(Math.floor(pad / 2)) + text + ' '.repeat(Math.floor(pad / 2))
      )
    default:
      return text
  }
}
