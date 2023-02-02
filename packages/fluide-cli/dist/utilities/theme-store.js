import themeFlags from './theme-flags.js';
import themeConf from './theme-conf.js';
// @ts-expect-error
import { AbortError } from '@shopify/cli-kit/node/error';
// @ts-expect-error
import { outputContent, outputToken } from '@shopify/cli-kit/node/output';
export default function getThemeStore(flags) {
    // eslint-disable-next-line
    const store = flags.store || themeConf().get('themeStore');
    // eslint-disable-next-line
    if (!store) {
        throw new AbortError('A store is required', `Specify the store passing ${
        // eslint-disable-next-line
        outputContent `${outputToken.genericShellCommand(`--${themeFlags.store.name}={your_store_url}`)}`.value} or set the ${
        // eslint-disable-next-line
        outputContent `${outputToken.genericShellCommand(themeFlags.store.env)}`.value} environment variable.`);
    }
    themeConf().set('themeStore', store);
    return store;
}
