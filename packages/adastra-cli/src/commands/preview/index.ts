import { Flags } from '@oclif/core'
import { execa } from 'execa'
import color from 'chalk'
import open from 'open'

import { log } from '../../utilities/logger'
import { globalFlags, themeFlags } from '../../utilities/flags'
import BaseCommand from '../../utilities/command'
import { brand } from 'adastra-cli-kit'
import detectURL from '../../utilities/detect-url'

export default class Preview extends BaseCommand {
  static description = 'Opens the preview of your remote theme.'

  static flags = {
    ...globalFlags,
    password: themeFlags.password,
    development: Flags.boolean({
      char: 'd',
      description: 'Delete your development theme.',
      env: 'SHOPIFY_FLAG_DEVELOPMENT',
      default: true
    }),
    editor: Flags.boolean({
      char: 'e',
      description:
        'Open the theme editor for the specified theme in the browser.',
      env: 'SHOPIFY_FLAG_EDITOR'
    }),
    live: Flags.boolean({
      char: 'l',
      description: 'Pull theme files from your remote live theme.',
      env: 'SHOPIFY_FLAG_LIVE'
    }),
    theme: Flags.string({
      char: 't',
      description: 'Theme ID or name of the remote theme.',
      env: 'SHOPIFY_FLAG_THEME_ID'
    }),
    store: themeFlags.store
  }

  async run(): Promise<void> {
    const { flags } = await this.parse(Preview)
    const command = ['theme', 'open', ...this.passThroughFlags(flags)]

    try {
      log('info', 'Opening a theme preview...')
      const { stdout } = await execa('shopify', command)
      log('info', color.hex(brand.colors.yellowgreen)(stdout))
      const url = detectURL(stdout)![0]
      if (url) await open(url)
    } catch (error) {
      log('error', error as string)
    }
  }
}
