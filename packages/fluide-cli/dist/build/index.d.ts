import { Command } from '@oclif/core';

declare class Build extends Command {
    static description: string;
    static examples: string[];
    static flags: {};
    static args: {};
    run(): Promise<void>;
}

export { Build as default };
