import { exec } from 'node:child_process'
import { get } from 'node:https'
import stripAnsi from 'strip-ansi'
import color from 'chalk'
import { COLORS } from 'adastra-branding'
import { label, sleep } from 'adastra-cli-kit'

export const getName = async (): Promise<string> => {
  return await new Promise(resolve => {
    exec('git config user.name', { encoding: 'utf-8' }, (_1, gitName) => {
      if (gitName.trim()) {
        return resolve(gitName.split(' ')[0].trim())
      }
      exec('whoami', { encoding: 'utf-8' }, (_3, whoami) => {
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
    console.log(
      `${color.hex(COLORS.yellowGreen)('◼')}  ${color.hex(COLORS.yellowGreen)(
        prefix
      )}`
    )
    console.log(`${' '.repeat(3)}${color.dim(text)}\n`)
  } else {
    console.log(
      `${color.hex(COLORS.yellowGreen)('◼')}  ${color.hex(COLORS.yellowGreen)(
        prefix
      )} ${color.dim(text)}\n`
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
    `\n ${color.bgHex(COLORS.yellowGreen)(
      ` ${color.white('next')} `
    )}  ${color.bold('Liftoff confirmed. Explore your Shopify theme!')}`
  )

  await sleep(100)
  if (projectDir !== '') {
    const enter = [
      `\n${prefix}Enter your theme directory using`,
      color.hex(COLORS.yellowGreen)(`cd ./${projectDir}`, '')
    ]
    const len = enter[0].length + stripAnsi(enter[1]).length
    console.log(enter.join(len > max ? '\n' + prefix : ' '))
  }
  console.log(
    `${prefix}Run ${color.hex(COLORS.yellowGreen)(
      devCmd
    )} to start the dev server. ${color.hex(COLORS.yellowGreen)(
      'CTRL+C'
    )} to stop.`
  )
  await sleep(100)
  console.log(
    `${prefix}Add frameworks like ${color.hex(COLORS.yellowGreen)(
      'React'
    )} or ${color.hex(COLORS.yellowGreen)('Tailwind')} by checking ${color.hex(
      COLORS.yellowGreen
    )('adastra examples')}.`
  )
  await sleep(100)
  console.log(
    `\n${prefix}Stuck? Join us at ${color.hex(COLORS.yellowGreen)(
      'https://help.odestry.com'
    )}`
  )
  await sleep(200)
}
