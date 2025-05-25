import { Accessor } from 'solid-js';

export declare const locale: Accessor<string | null>;

export declare function setLanguage(lang: string): void;

/**
 * Create a reactive translation accessor.
 */
export declare function t(
  key: string,
  options?: {
    components?: Record<string, (text: string) => any>;
    [key: string]: any;
  }
): Accessor<string>;