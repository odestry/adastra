import { exec } from 'node:child_process'
import { get } from 'node:https'
import stripAnsi from 'strip-ansi'
import color from 'chalk'
import { COLORS } from 'adastra-branding'
import { label, sleep } from 'adastra-cli-kit'

export const getName = async (): Promise<string> => {
  return await new Promise(resolve => {
    exec('git config user.name', { encoding: 'utf-8' }, (_1, gitName, _2) => {
      // eslint-disable-next-line
      if (gitName.trim()) {
        return resolve(gitName.split(' ')[0].trim())
      }
      exec('whoami', { encoding: 'utf-8' }, (_3, whoami, _4) => {
        // eslint-disable-next-line
        if (whoami.trim()) {
          return resolve(whoami.split(' ')[0].trim())
        }
        return resolve('astronaut')
      })
    })
  })
}

let v: string
export const getVersion = async (): Promise<string> => {
  return await new Promise<string>(resolve => {
    // eslint-disable-next-line
    if (v) return resolve(v)
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
}

export const banner = async (version: string): Promise<void> => {
  return console.log(
    `\n${label('adastra')}  ${color
      .hex(COLORS.yellowGreen)
      .bold(`v${version}`)} ${color.bold(
      'Launch sequence initiated. 3, 2, 1 Liftoff!'
    )}\n`
  )
}

export const info = async (prefix: string, text: string): Promise<void> => {
  await sleep(100)
  if (process.stdout.columns < 80) {
    console.log(`${color.cyan('◼')}  ${color.cyan(prefix)}`)
    console.log(`${' '.repeat(3)}${color.dim(text)}\n`)
  } else {
    console.log(
      `${color.cyan('◼')}  ${color.cyan(prefix)} ${color.dim(text)}\n`
    )
  }
}

export async function error(prefix: string, text: string): Promise<void> {
  if (process.stdout.columns < 80) {
    console.log(`${' '.repeat(5)} ${color.red('▲')}  ${color.red(prefix)}`)
    console.log(`${' '.repeat(9)}${color.dim(text)}`)
  } else {
    console.log(
      `${' '.repeat(5)} ${color.red('▲')}  ${color.red(prefix)} ${color.dim(
        text
      )}`
    )
  }
}

export async function typescriptByDefault(): Promise<void> {
  await info(
    'Cool!',
    'Adastra comes with TypeScript support enabled by default.'
  )
  console.log(
    `${' '.repeat(3)}${color.dim(
      "We'll default to the most relaxed settings for you."
    )}`
  )
  await sleep(300)
}

export async function nextSteps({
  projectDir,
  devCmd
}: {
  projectDir: string
  devCmd: string
}): Promise<void> {
  const max = process.stdout.columns
  const prefix = max < 80 ? ' ' : ' '.repeat(9)
  await sleep(200)
  console.log(
    `\n ${color.bgCyan(` ${color.black('next')} `)}  ${color.bold(
      'Liftoff confirmed. Explore your theme!'
    )}`
  )

  await sleep(100)
  if (projectDir !== '') {
    const enter = [
      `\n${prefix}Enter your theme directory using`,
      color.cyan(`cd ./${projectDir}`, '')
    ]
    const len = enter[0].length + stripAnsi(enter[1]).length
    console.log(enter.join(len > max ? '\n' + prefix : ' '))
  }
  console.log(
    `${prefix}Run ${color.cyan(devCmd)} to start the dev server. ${color.cyan(
      'CTRL+C'
    )} to stop.`
  )
  await sleep(100)
  console.log(
    `${prefix}Add frameworks like ${color.cyan('preact')} or ${color.cyan(
      'tailwind'
    )} by checking ${color.cyan('adastra examples')}.`
  )
  await sleep(100)
  console.log(
    `\n${prefix}Stuck? Join us at ${color.cyan(
      'https://support.adastra.build/'
    )}`
  )
  await sleep(200)
}
