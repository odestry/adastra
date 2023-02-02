export declare const log: (logLevel: 'info' | 'warn' | 'error', msg: string, logger?: Console) => void;
export declare const printUrls: (baseUrl: string, themeId: number, logger?: {
    (...data: any[]): void;
    (message?: any, ...optionalParams: any[]): void;
}, host?: string, port?: number) => void;
export declare const printOtherUrls: (baseUrl: string, themeId: number, logger?: {
    (...data: any[]): void;
    (message?: any, ...optionalParams: any[]): void;
}) => void;
export declare const logInitiateSequence: (baseUrl: string, logger?: {
    (...data: any[]): void;
    (message?: any, ...optionalParams: any[]): void;
}) => void;
export declare const startDevMessage: (baseUrl: string, logger?: {
    (...data: any[]): void;
    (message?: any, ...optionalParams: any[]): void;
}, clearScreen?: () => void) => void;
