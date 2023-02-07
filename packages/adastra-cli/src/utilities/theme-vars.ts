import { loadEnv } from 'vite'
import themeConf from './theme-conf.js'
import themeFlags from './theme-flags.js'
// @ts-expect-error
import { AbortError } from '@shopify/cli-kit/node/error'
// @ts-expect-error
import { outputContent, outputToken } from '@shopify/cli-kit/node/output'

interface themeVars {
  store: string
  password: string
  port: string
}

export default function getThemeVars(flags: {
  mode: string | undefined
  path: string | undefined
  store: string | undefined
  password: string | undefined
  port: string | undefined
}): themeVars {
  let store = flags.store || (themeConf().get('themeStore') as string)

  if (!store) {
    throw new AbortError(
      'A store is required',
      `Specify the store passing ${
        // eslint-disable-next-line
        outputContent`${outputToken.genericShellCommand(
          `--${themeFlags.store.name}={your_store_url}`
        )}`.value
      } or set the ${
        // eslint-disable-next-line
        outputContent`${outputToken.genericShellCommand(
          themeFlags.store.env as string
        )}`.value
      } environment variable.`
    )
  }

  let password = typeof flags?.password !== 'undefined' ? flags.password : ''
  let port = typeof flags?.port !== 'undefined' ? flags.port : '9292'
  const mode = typeof flags?.mode !== 'undefined' ? flags.mode : ''
  const path = typeof flags?.path !== 'undefined' ? flags.path : '.'
  const envars = loadEnv(mode, path, ['VITE_', 'SHOPIFY_'])

  if (envars.SHOPIFY_FLAG_STORE) {
    store = envars.SHOPIFY_FLAG_STORE
    themeConf().set('themeStore', store)
  }

  if (envars.SHOPIFY_CLI_THEME_TOKEN) password = envars.SHOPIFY_CLI_THEME_TOKEN

  if (envars.SHOPIFY_FLAG_PORT) port = envars.SHOPIFY_FLAG_PORT

  return {
    store,
    password,
    port
  }
}
