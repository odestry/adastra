import { AbortController } from '@shopify/cli-kit/node/abort';
import ThemeCommand from '../../utilities/theme-command.js';
export default class Dev extends ThemeCommand {
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
    execute(store: string, password: string | undefined, command: string[], controller: AbortController): Promise<any>;
}
