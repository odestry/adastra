import { T as ThemeCommand } from '../theme-command-cfc054a4.js';
import '@shopify/cli-kit/node/base-command';

declare class Check extends ThemeCommand {
    static description: string;
    static flags: any;
    static cli2Flags: string[];
    run(): Promise<void>;
}

export { Check as default };
