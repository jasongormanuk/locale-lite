import { writable, derived } from 'svelte/store';
import * as localeLite from 'locale-lite';

const locale = writable(localeLite.getCurrentLocale());

localeLite.subscribe((currentLocale) => {
  locale.set(currentLocale);
});

export function setLanguage(lang) {
  localeLite.setCurrentLocale(lang);
}

export function t(key, options = {}) {
  return derived(locale, () => {
    const result = localeLite.t(key, options);
    return Array.isArray(result) ? result.join('') : result;
  });
}

export { locale };