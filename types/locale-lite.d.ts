export type TranslationValue =
  | string
  | ((vars: Record<string, any>) => string | Array<string | any>);

export interface LocaleData {
  [key: string]: TranslationValue | LocaleData;
}

export function subscribe(listener: () => void): () => void;

export function registerLocale(locale: string, data: LocaleData): void;

export function getCurrentLocale(): string | null;

export function setCurrentLocale(locale: string): void;

export function getFallbackLocale(): string | null;

export function setFallbackLocale(locale: string): void;

export function t(
  key: string,
  vars?: Record<string, any>
): string | Array<string | any>;
