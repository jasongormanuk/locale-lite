import {
  createContext,
  useContext,
  useCallback,
  useMemo,
  useSyncExternalStore,
  useEffect,
  Fragment
} from 'react';
import * as localeLite from 'locale-lite';

const LocaleContext = createContext({
  setLanguage: () => {},
});

/**
 * LocaleProvider that reacts to language changes from the core.
 */
export function LocaleProvider({ defaultLang, children }) {
  // Set once on mount
  useEffect(() => {
    localeLite.setCurrentLocale(defaultLang);
  }, [defaultLang]);

  const setLanguage = useCallback((lang) => {
    localeLite.setCurrentLocale(lang);
  }, []);

  const value = useMemo(() => ({ setLanguage }), [setLanguage]);

  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
}

/**
 * Hook to access translated strings and current language.
 */
export function useTranslation() {
  const { setLanguage } = useContext(LocaleContext);

  const lang = useSyncExternalStore(
    localeLite.subscribe,
    localeLite.getCurrentLocale,
    localeLite.getCurrentLocale
  );

  const t = useCallback((key, { components = {}, ...vars } = {}) => {
    const result = localeLite.t(key, { ...vars, components });

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