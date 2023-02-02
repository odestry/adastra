import { Command } from '@oclif/core';
export default class Create extends Command {
    static description: string;
    static examples: string[];
    static flags: {};
    static args: {};
    run(): Promise<void>;
}
