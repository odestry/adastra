/** The `isBrowser` utility is a function that returns a boolean indicating
 * if the code was run in the browser.
 */
export const isBrowser = (): boolean => typeof document !== "undefined";
