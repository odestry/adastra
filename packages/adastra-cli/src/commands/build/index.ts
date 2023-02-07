import { Command } from '@oclif/core'
import { build } from 'vite'

export default class Build extends Command {
  static description = 'Say Build'

  static examples = [
    `$ adastra build
  launch build (./src/commands/build/index.ts)
`
  ]

  static flags = {}

  static args = {}

  async run(): Promise<void> {
    await build({
      logLevel: 'silent'
    })
    this.log('build adastra complete')
  }
}
