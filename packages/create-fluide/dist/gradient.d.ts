import { Ora } from 'ora';

declare const rocketAscii = "\u25A0\u25A0\u25B6";
/**
 * Generate loading spinner with rocket flames!
 * @param text display text next to rocket
 * @returns Ora spinner for running .stop()
 */
declare function loadWithRocketGradient(text: string): Promise<Ora>;

export { loadWithRocketGradient, rocketAscii };
