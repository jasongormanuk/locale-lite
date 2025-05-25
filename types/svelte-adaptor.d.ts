import type { Writable, Readable } from 'svelte/store';

/**
 * A writable store that holds the current language code.
 */
export declare const locale: Writable<string | null>;

/**
 * Updates the current locale used by the system.
 */
export declare function setLanguage(lang: string): void;

/**
 * Returns a derived store that updates when the locale changes.
 */
export declare function t(
  key: string,
  options?: {
    components?: Record<string, (text: string) => any>;
    [key: string]: any;
  }
): Readable<string>;