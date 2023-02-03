import { Command } from '@oclif/core';

declare class Create extends Command {
    static description: string;
    static examples: string[];
    static flags: {};
    static args: {};
    run(): Promise<void>;
}

export { Create as default };
