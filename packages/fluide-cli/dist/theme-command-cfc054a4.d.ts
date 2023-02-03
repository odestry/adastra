import Command from '@shopify/cli-kit/node/base-command';

interface FlagValues {
    [key: string]: boolean | string | string[] | number | undefined;
}
interface PassThroughFlagsOptions {
    allowedFlags?: string[];
}
declare abstract class ThemeCommand extends Command {
    passThroughFlags(flags: FlagValues, { allowedFlags }: PassThroughFlagsOptions): string[];
}

export { ThemeCommand as T };
