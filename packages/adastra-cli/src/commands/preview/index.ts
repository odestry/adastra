import { Flags } from '@oclif/core'
import { execa } from 'execa'
import open from 'open'
import { build } from 'vite'

import { log } from '../../utilities/logger'
import { globalFlags, themeFlags } from '../../utilities/flags'
import BaseCommand from '../../utilities/command'
import { colored, loadWithRocketGradient, prefixed } from 'adastra-cli-kit'

import detectURL from '../../utilities/detect-url'

export default class Preview extends BaseCommand {
  static description = 'Opens a preview of your remote development theme.'

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
      const opening = await loadWithRocketGradient('Opening a theme preview...')
      // await build({ logLevel: 'silent' })
      const { stdout } = await execa('shopify', command)
      const url = detectURL(stdout)![0]
      if (url) await open(url)
      opening.text = prefixed(colored(stdout))
      opening.succeed()
    } catch (error) {
      log('error', error as string)
    }
  }
}
