import ThemeCommand from '../../utilities/theme-command.js';
export default class Check extends ThemeCommand {
    static description: string;
    static flags: any;
    static cli2Flags: string[];
    run(): Promise<void>;
}
