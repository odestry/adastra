import { Flags } from '@oclif/core'
// @ts-expect-error
import { globalFlags } from '@shopify/cli-kit/node/cli'
// @ts-expect-error
import { execCLI2 } from '@shopify/cli-kit/node/ruby'
// @ts-expect-error
import { AbortController } from '@shopify/cli-kit/node/abort'

import {
  ensureAuthenticatedStorefront,
  ensureAuthenticatedThemes
  // @ts-expect-error
} from '@shopify/cli-kit/node/session'
// @ts-expect-error
import { sleep } from '@shopify/cli-kit/node/system'
// @ts-expect-error
import { outputDebug } from '@shopify/cli-kit/node/output'
import { createServer } from 'vite'
import themeFlags from '../../utilities/theme-flags.js'
import ThemeCommand from '../../utilities/theme-command.js'
import color from 'chalk'
import { customLogger, logInitiateSequence } from '../../utilities/logger.js'
import { brand } from '@fluide/cli-kit'
import getThemeVars from '../../utilities/theme-vars.js'

export default class Dev extends ThemeCommand {
  static description = color.hex(brand.colors.yellowgreen)(
    'Uploads the current theme as a development theme to the connected store, then prints theme editor and preview URLs to your terminal. While running, changes will push to the store in real time.'
  )

  static flags = {
    ...globalFlags,
    path: themeFlags.path,
    host: Flags.string({
      description:
        'Set which network interface the web server listens on. The default value is 127.0.0.1.',
      env: 'SHOPIFY_FLAG_HOST'
    }),
    'live-reload': Flags.string({
      description: `The live reload mode switches the server behavior when a file is modified:
- hot-reload Hot reloads local changes to CSS and sections (default)
- full-page  Always refreshes the entire page
- off        Deactivate live reload`,
      default: 'hot-reload',
      options: ['hot-reload', 'full-page', 'off'],
      env: 'SHOPIFY_FLAG_LIVE_RELOAD'
    }),
    poll: Flags.boolean({
      description: 'Force polling to detect file changes.',
      env: 'SHOPIFY_FLAG_POLL'
    }),
    'theme-editor-sync': Flags.boolean({
      char: 'e',
      description: 'Synchronize Theme Editor updates in the local theme files.',
      env: 'SHOPIFY_FLAG_THEME_EDITOR_SYNC'
    }),
    port: Flags.string({
      description: 'Local port to serve theme preview from.',
      env: 'SHOPIFY_FLAG_PORT'
    }),
    store: themeFlags.store,
    theme: Flags.string({
      char: 't',
      description: 'Theme ID or name of the remote theme.',
      env: 'SHOPIFY_FLAG_THEME_ID'
    }),
    only: Flags.string({
      char: 'o',
      multiple: true,
      description: 'Hot reload only files that match the specified pattern.',
      env: 'SHOPIFY_FLAG_ONLY'
    }),
    ignore: Flags.string({
      char: 'x',
      multiple: true,
      description:
        'Skip hot reloading any files that match the specified pattern.',
      env: 'SHOPIFY_FLAG_IGNORE'
    }),
    stable: Flags.boolean({
      hidden: true,
      description:
        'Performs the upload by relying in the legacy upload approach (slower, but it might be more stable in some scenarios)',
      env: 'SHOPIFY_FLAG_STABLE'
    }),
    force: Flags.boolean({
      hidden: true,
      char: 'f',
      description:
        'Proceed without confirmation, if current directory does not seem to be theme directory.',
      env: 'SHOPIFY_FLAG_FORCE'
    }),
    password: themeFlags.password,
    mode: Flags.string({
      char: 'm',
      description: 'Loaded env variables from specific env files.',
      env: 'NODE_ENV'
    })
  }

  static ignoredFiles = [
    'package.json',
    'jsconfig.json',
    'src/',
    'tsconfig*.json',
    '.vscode',
    'node_modules'
  ]

  static cli2Flags = [
    'host',
    'live-reload',
    'poll',
    'theme-editor-sync',
    'port',
    'theme',
    'only',
    'ignore',
    'stable',
    'force'
  ]

  // Tokens are valid for 120m, better to be safe and refresh every 110min
  ThemeRefreshTimeoutInMs = 24 * 110 * 60 * 1000

  /**
   * Executes the theme serve command.
   * Every 110 minutes, it will refresh the session token and restart the server.
   */
  async run(): Promise<void> {
    // @ts-expect-error
    const { flags } = await this.parse(Dev)

    const flagsToPass = this.passThroughFlags(flags, {
      allowedFlags: Dev.cli2Flags
    })

    const { store, password, port } = getThemeVars(flags)

    const command = [
      'theme',
      'serve',
      flags.path,
      '--ignore',
      ...Dev.ignoredFiles,
      ...flagsToPass,
      '--port',
      port
    ]

    let controller = new AbortController()

    const server = await createServer({
      customLogger: customLogger(store),
      server: {
        port: +port - 1
      }
    })

    setInterval(() => {
      outputDebug(
        'Refreshing theme session token and restarting theme server...'
      )
      controller.abort()
      controller = new AbortController()

      this.execute(store, password, command, controller).then(
        async () => await server.restart()
      )
    }, this.ThemeRefreshTimeoutInMs)

    logInitiateSequence(store)

    await server.listen()
    await this.execute(store, password, command, controller)
  }

  async execute(
    store: string,
    password: string | undefined,
    command: string[],
    controller: AbortController
  ) {
    await sleep(2)
    const adminSession = await ensureAuthenticatedThemes(
      store,
      password,
      [],
      true
    )
    const storefrontToken = await ensureAuthenticatedStorefront([], password)
    return execCLI2(command, {
      adminSession,
      storefrontToken,
      signal: controller.signal
    })
  }
}
