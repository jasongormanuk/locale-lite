import { createSignal, createMemo } from 'solid-js';
import * as localeLite from 'locale-lite';

const [locale, setLocale] = createSignal(localeLite.getCurrentLocale());

localeLite.subscribe((currentLocale) => {
  setLocale(currentLocale);
});

export function setLanguage(lang) {
  localeLite.setCurrentLocale(lang);
}

export function t(key, options = {}) {
  return createMemo(() => {
    locale();
    const result = localeLite.t(key, options);
    return Array.isArray(result) ? result.join('') : result;
  });
}

export { locale };