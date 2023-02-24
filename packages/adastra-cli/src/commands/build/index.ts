import { Command, Flags } from '@oclif/core'
import { build } from 'vite'

import { log } from '../../utilities/logger'

export default class Build extends Command {
  static description = 'Builds all static files into the theme assets folder.'

  static flags = {
    'no-minify': Flags.boolean({
      required: false,
      char: 'u',
      description:
        'Removes static files minification, then outputs them in the theme assets folder',
      env: 'ADASTRA_FLAG_NO_MINIFY',
      default: false
    }),
    'log-level': Flags.string({
      required: false,
      description: 'Adjust console output verbosity when building files',
      env: 'ADASTRA_FLAG_LOG_LEVEL',
      options: ['info', 'silent', 'error', 'warn'],
      default: 'info'
    })
  }

  async run(): Promise<void> {
    const { flags } = await this.parse(Build)
    try {
      await build({
        // @ts-expect-error @todo
        logLevel: flags['log-level'],
        build: {
          minify: flags['no-minify'] ? false : 'esbuild'
        }
      })
      log('info', 'Building files for production complete')
    } catch (error) {
      log('error', error as string)
      this.exit(1)
    }
  }
}
