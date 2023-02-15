import { Command, Flags } from '@oclif/core'
import { build } from 'vite'

import { log } from '../../utilities/logger'

export default class Build extends Command {
  static description = 'Builds all static files into the theme assets folder.'

  static flags = {
    minify: Flags.boolean({
      required: false,
      char: 'm',
      description:
        'Minifies static files for production using Esbuild, then outputs them in the theme assets folder',
      env: 'ADASTRA_FLAG_MINIFY',
      default: false
    }),
    sourcemap: Flags.boolean({
      required: false,
      description:
        'Generate production source maps, the sourcemap will be appended to the resulting output file as a data URI.',
      env: 'ADASTRA_FLAG_SOURCEMAP',
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
        // @ts-expect-error
        logLevel: flags['log-level'],
        build: {
          minify: flags.minify ? 'esbuild' : false,
          sourcemap: flags.sourcemap
        }
      })
      log('info', 'Building files for production complete')
    } catch (error) {
      log('error', error as string)
    }
  }
}
