import { Command, Flags } from '@oclif/core'
import { build, loadConfigFromFile, ConfigEnv } from 'vite'

import { log } from '../../utilities/logger'

export default class Build extends Command {
  static description = 'Builds all static files into the theme assets folder.'

  static flags = {
    'log-level': Flags.string({
      required: false,
      description: 'Adjust console output verbosity when building files.',
      env: 'ADASTRA_FLAG_LOG_LEVEL',
      options: ['info', 'silent', 'error', 'warn'],
      default: 'info'
    })
  }

  async run(): Promise<void> {
    const { flags } = await this.parse(Build)
    const configEnv: ConfigEnv = {
      command: 'serve',
      mode: 'production'
    }

    const config = await loadConfigFromFile(configEnv)
    if (config) {
      try {
        await build({
          // @ts-expect-error @todo
          logLevel: flags['log-level']
        })
        log('info', 'Building files for production complete.')
      } catch (error) {
        log('error', error as string)
        this.exit(1)
      }
    } else {
      log('warn', 'No Vite config was found in the theme root folder.')
    }
  }
}
