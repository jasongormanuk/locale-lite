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

export interface LocaleProviderProps {
  defaultLang: string;
  children: ReactNode;
}

export const LocaleProvider: FunctionComponent<LocaleProviderProps>;

export function useTranslation(): UseTranslationResult;
