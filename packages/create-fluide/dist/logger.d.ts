import { Writable } from 'stream';

declare const defaultLogDestination: Writable;
interface LogWritable<T> extends Writable {
    write: (chunk: T) => boolean;
}
type LoggerLevel = 'debug' | 'info' | 'warn' | 'error' | 'silent';
type LoggerEvent = 'debug' | 'info' | 'warn' | 'error';
declare let defaultLogLevel: LoggerLevel;
interface LogOptions {
    dest?: LogWritable<LogMessage>;
    level?: LoggerLevel;
}
declare const defaultLogOptions: Required<LogOptions>;
interface LogMessage {
    type: string | null;
    level: LoggerLevel;
    message: string;
    args: any[];
}
declare const levels: Record<LoggerLevel, number>;
/** Full logging API */
declare function log(opts: LogOptions | undefined, level: LoggerLevel, type: string | null, ...args: any[]): void;
/** Emit a message only shown in debug mode */
declare function debug(opts: LogOptions, type: string | null, ...messages: any[]): void;
/** Emit a general info message (be careful using this too much!) */
declare function info(opts: LogOptions, type: string | null, ...messages: any[]): void;
/** Emit a warning a user should be aware of */
declare function warn(opts: LogOptions, type: string | null, ...messages: any[]): void;
/** Emit a fatal error message the user should address. */
declare function error(opts: LogOptions, type: string | null, ...messages: any[]): void;
declare const logger: {
    debug: (...args: any[]) => void;
    info: (...args: any[]) => void;
    warn: (...args: any[]) => void;
    error: (...args: any[]) => void;
};

export { LogMessage, LogOptions, LoggerEvent, LoggerLevel, debug, defaultLogDestination, defaultLogLevel, defaultLogOptions, error, info, levels, log, logger, warn };
