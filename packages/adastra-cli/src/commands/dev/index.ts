import { Flags } from '@oclif/core'
import { execa } from 'execa'
import { createServer, loadConfigFromFile, ConfigEnv } from 'vite'
import { log } from '../../utilities/logger'
import { globalFlags, themeFlags } from '../../utilities/flags'
import BaseCommand from '../../utilities/command'
import { loadWithRocketGradient } from 'adastra-cli-kit'

export default class Dev extends BaseCommand {
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
    password: themeFlags.password
  }

  static ignoredFiles = [
    'assets/adastra.manifest.json',
    'package.json',
    'package-lock.json',
    'jsconfig.*',
    'tsconfig.*',
    './*.config.*',
    'src/',
    'test/',
    'node_modules'
  ]

  async run(): Promise<void> {
    let { flags } = await this.parse(Dev)

    if (!flags.ignore) {
      flags = {
        ...flags,
        ignore: Dev.ignoredFiles
      }
    }

    const configEnv: ConfigEnv = {
      command: 'serve',
      mode: 'development'
    }

    const config = await loadConfigFromFile(configEnv)
    const command = ['theme', 'dev', ...this.passThroughFlags(flags)]

    try {
      const launch = await loadWithRocketGradient(
        'Initiating server launch sequence...'
      )

      if (config) {
        const server = await createServer()
        await server.listen()
        launch.text =
          'Vite development server launched, wait for Shopify development server to launch...'
        launch.succeed()
      } else {
        launch.text = 'Wait for Shopify development server to launch...'
        launch.succeed()
        log('warn', 'No Vite config was found in the theme root folder.')
      }

      await execa('shopify', command, {
        stdio: 'inherit'
      })
    } catch (error) {
      log('error', error as string)
      this.exit(1)
    }
  }
}
