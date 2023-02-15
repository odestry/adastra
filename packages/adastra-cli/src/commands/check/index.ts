import { Flags } from '@oclif/core'
import { execa } from 'execa'

import { log } from '../../utilities/logger'
import { globalFlags, themeFlags } from '../../utilities/flags'
import BaseCommand from '../../utilities/command'

export default class Check extends BaseCommand {
  static description =
    'Validate the theme using theme check same as shopify theme check.'

  static flags = {
    ...globalFlags,
    path: themeFlags.path,
    'auto-correct': Flags.boolean({
      char: 'a',
      required: false,
      description: 'Automatically fix offenses',
      env: 'SHOPIFY_FLAG_AUTO_CORRECT'
    }),
    category: Flags.string({
      char: 'c',
      required: false,
      description: `Only run this category of checks
Runs checks matching all categories when specified more than once`,
      env: 'SHOPIFY_FLAG_CATEGORY'
    }),
    config: Flags.string({
      char: 'C',
      required: false,
      description: `Use the config provided, overriding .theme-check.yml if present
Use :theme_app_extension to use default checks for theme app extensions`,
      env: 'SHOPIFY_FLAG_CONFIG'
    }),
    'exclude-category': Flags.string({
      char: 'x',
      required: false,
      description: `Exclude this category of checks
Excludes checks matching any category when specified more than once`,
      env: 'SHOPIFY_FLAG_EXCLUDE_CATEGORY'
    }),
    'fail-level': Flags.string({
      required: false,
      description: 'Minimum severity for exit with error code',
      env: 'SHOPIFY_FLAG_FAIL_LEVEL',
      options: ['error', 'suggestion', 'style']
    }),
    init: Flags.boolean({
      required: false,
      description: 'Generate a .theme-check.yml file',
      env: 'SHOPIFY_FLAG_INIT'
    }),
    list: Flags.boolean({
      required: false,
      description: 'List enabled checks',
      env: 'SHOPIFY_FLAG_LIST'
    }),
    output: Flags.string({
      char: 'o',
      required: false,
      description: 'The output format to use',
      env: 'SHOPIFY_FLAG_OUTPUT',
      options: ['text', 'json'],
      default: 'text'
    }),
    print: Flags.boolean({
      required: false,
      description: 'Output active config to STDOUT',
      env: 'SHOPIFY_FLAG_PRINT'
    }),
    version: Flags.boolean({
      char: 'v',
      required: false,
      description: 'Print Theme Check version',
      env: 'SHOPIFY_FLAG_VERSION'
    })
  }

  async run(): Promise<void> {
    const { flags } = await this.parse(Check)
    const command = ['theme', 'check', ...this.passThroughFlags(flags)]

    try {
      log('info', 'Running theme check...')
      const { stdout } = await execa('shopify', command)
      log('info', stdout)
    } catch (error) {
      log('error', error as string)
    }
  }
}
