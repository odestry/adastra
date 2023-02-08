import { AbortController } from '@shopify/cli-kit/node/abort';
import { AdminSession } from '@shopify/cli-kit/node/session';
import { T as ThemeCommand } from '../theme-command-cfc054a4.js';
import '@shopify/cli-kit/node/base-command';

declare class Dev extends ThemeCommand {
    static description: string;
    static flags: any;
    static ignoredFiles: string[];
    static cli2Flags: string[];
    ThemeRefreshTimeoutInMs: number;
    /**
     * Executes the theme serve command.
     * Every 110 minutes, it will refresh the session token and restart the server.
     */
    run(): Promise<void>;
    execute(adminSession: AdminSession, password: string | undefined, command: string[], controller: AbortController): Promise<any>;
}

export { Dev as default };
