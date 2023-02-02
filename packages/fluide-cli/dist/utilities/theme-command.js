// @ts-expect-error
import Command from '@shopify/cli-kit/node/base-command';
export default class ThemeCommand extends Command {
    passThroughFlags(flags, { allowedFlags }) {
        const passThroughFlags = [];
        for (const [label, value] of Object.entries(flags)) {
            if (!(allowedFlags ?? []).includes(label)) {
                continue;
            }
            else if (typeof value === 'boolean') {
                passThroughFlags.push(`--${label}`);
            }
            else if (Array.isArray(value)) {
                value.forEach((element) => passThroughFlags.push(`--${label}`, `${element}`));
            }
            else {
                passThroughFlags.push(`--${label}`, `${value}`);
            }
        }
        return passThroughFlags;
    }
}
