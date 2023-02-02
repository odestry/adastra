import { Command } from '@oclif/core';
export default class Create extends Command {
    async run() {
        this.log('hello fluide create ! (./src/commands/create/index.ts)');
    }
}
Create.description = 'Say Create';
Create.examples = [
    `$ fluide create
    create new project (./src/commands/create/index.ts)
`
];
Create.flags = {};
Create.args = {};
