declare const welcome: string[];
declare const getName: () => Promise<string>;
declare const getVersion: () => Promise<string>;
declare const banner: (version: string) => Promise<void>;
declare const info: (prefix: string, text: string) => Promise<void>;
declare function error(prefix: string, text: string): Promise<void>;
declare function typescriptByDefault(): Promise<void>;
declare function nextSteps({ projectDir, devCmd }: {
    projectDir: string;
    devCmd: string;
}): Promise<void>;

export { banner, error, getName, getVersion, info, nextSteps, typescriptByDefault, welcome };
