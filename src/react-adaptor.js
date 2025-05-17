import {
  createContext,
  useContext,
  useCallback,
  useMemo,
  useSyncExternalStore,
  useEffect,
  Fragment
} from "react";
import { getCurrentLocale, setCurrentLocale, subscribe, t as i18nT } from "i18n-lite";

const I18nContext = createContext({
  setLanguage: () => {},
});

/**
 * I18nProvider that reacts to language changes from the core.
 */
export function I18nProvider({ defaultLang, children }) {
  // Set once on mount
  useEffect(() => {
    setCurrentLocale(defaultLang);
  }, [defaultLang]);

  const setLanguage = useCallback((lang) => {
    setCurrentLocale(lang);
  }, []);

  const value = useMemo(() => ({ setLanguage }), [setLanguage]);

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
}

/**
 * Hook to access translated strings and current language.
 */
export function useTranslation() {
  const { setLanguage } = useContext(I18nContext);

  const lang = useSyncExternalStore(
    subscribe,
    getCurrentLocale,
    getCurrentLocale
  );

  const t = useCallback((key, { components = {}, ...vars } = {}) => {
    const result = i18nT(key, { ...vars, components });

    if (Array.isArray(result)) {
      return (
        <>
          {result.map((part, i) => (
            <Fragment key={i}>{part}</Fragment>
          ))}
        </>
      );
    }

    return result;
  }, []);

  return { t, locale: lang, setLanguage };
}