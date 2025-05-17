import { ReactNode, FunctionComponent } from 'react';

export interface UseTranslationResult {
  t(
    key: string,
    options?: {
      components?: Record<string, (children: ReactNode) => ReactNode>;
      [key: string]: any;
    }
  ): ReactNode;
  locale: string | null;
  setLanguage: (lang: string) => void;
}

export interface I18nProviderProps {
  defaultLang: string;
  children: ReactNode;
}

export const I18nProvider: FunctionComponent<I18nProviderProps>;

export function useTranslation(): UseTranslationResult;
