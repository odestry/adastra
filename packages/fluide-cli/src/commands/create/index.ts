import { Command } from '@oclif/core'

export default class Create extends Command {
  static description = 'Say Create'

  static examples = [
    `$ fluide create
    create new project (./src/commands/create/index.ts)
`
  ]

  static flags = {}

  static args = {}

  async run(): Promise<void> {
    this.log('hello fluide create ! (./src/commands/create/index.ts)')
  }
}
