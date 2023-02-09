// @ts-expect-error
import { globalFlags } from '@shopify/cli-kit/node/cli'
// @ts-expect-error
import { execCLI2 } from '@shopify/cli-kit/node/ruby'
// @ts-expect-error
import { AbortController } from '@shopify/cli-kit/node/abort'
import {
  AdminSession,
  ensureAuthenticatedStorefront,
  ensureAuthenticatedThemes
  // @ts-expect-error
} from '@shopify/cli-kit/node/session'
// @ts-expect-error
import { sleep } from '@shopify/cli-kit/node/system'
import { Flags } from '@oclif/core'
import { createServer, loadConfigFromFile, ConfigEnv } from 'vite'
import {
  themeFlags,
  ThemeCommand,
  getThemeVars,
  DevelopmentThemeManager,
  customLogger,
  startDevMessage,
  ensureThemeStore
} from '../../utilities'

export default class Dev extends ThemeCommand {
  static description =
    'Lauches a Vite development server and uploads the current theme as a development theme to the connected store, While running, changes will push to the store in real time.'

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
      default: 'full-page',
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
      description: 'Load environment variables from specific env files.',
      env: 'NODE_ENV'
    })
  }

  static ignoredFiles = [
    'package.json',
    'jsconfig.*',
    'tsconfig.*',
    'src/',
    '.vscode',
    'node_modules'
  ]

  static cli2Flags = [
    'host',
    'live-reload',
    'poll',
    'theme-editor-sync',
    'overwrite-json',
    'port',
    'theme',
    'only',
    'ignore',
    'stable',
    'force'
  ]

  // Tokens are valid for 120m, better to be safe and refresh every 110min
  ThemeRefreshTimeoutInMs = 110 * 60 * 1000

  /**
   * Executes the theme serve command.
   * Every 110 minutes, it will refresh the session token and restart the server.
   */
  async run(): Promise<void> {
    // @ts-expect-error
    let { flags } = await this.parse(Dev)
    // const { store, password, port } = getThemeVars(flags)
    const store = ensureThemeStore(flags)
    const adminSession = await ensureAuthenticatedThemes(
      store,
      flags.password,
      [],
      true
    )
    // @ts-expect-error
    const theme = await new DevelopmentThemeManager(adminSession).findOrCreate()

    flags = {
      ...flags,
      theme: theme.id.toString(),
      'overwrite-json':
        Boolean(flags['theme-editor-sync']) && theme.createdAtRuntime
    }

    const flagsToPass = this.passThroughFlags(flags, {
      allowedFlags: Dev.cli2Flags
    })

    const command = [
      'theme',
      'serve',
      flags.path,
      '--ignore',
      ...Dev.ignoredFiles,
      ...flagsToPass
    ]

    let controller = new AbortController()

    setInterval(() => {
      console.log(
        'Refreshing theme session token and restarting theme server...'
      )
      controller.abort()
      controller = new AbortController()
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      this.execute(adminSession, flags.password, command, controller)
    }, this.ThemeRefreshTimeoutInMs)

    const configEnv: ConfigEnv = {
      command: 'serve',
      mode: flags.mode as string
    }

    const config = await loadConfigFromFile(configEnv)

    if (config) {
      const server = await createServer({
        customLogger: customLogger()
      })
      await server.listen()
    }

    startDevMessage(store, theme.id.toString())

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.execute(adminSession, flags.password, command, controller)
  }

  async execute(
    adminSession: AdminSession,
    password: string | undefined,
    command: string[],
    controller: AbortController
  ) {
    await sleep(3)
    const storefrontToken = await ensureAuthenticatedStorefront([], password)
    return execCLI2(command, {
      adminSession,
      storefrontToken,
      signal: controller.signal
    })
  }
}
