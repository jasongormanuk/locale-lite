let currentLocale = null;
let fallbackLocale = null;
const cache = {};

const ERROR_PREFIX = 'locale-lite:';

const listeners = new Set();

export function subscribe(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
}

function notify() {
    for (const fn of listeners) {
        fn(getCurrentLocale());
    }
}

export function registerLocale(locale, data) {
  const cleanLocale = locale.toLowerCase();
  cache[cleanLocale] = data;
}

export function getCurrentLocale() {
  return currentLocale;
}

export function setCurrentLocale(locale) {
  const cleanLocale = locale.toLowerCase();

  if (!cache[cleanLocale]) {
    console.warn(`${ERROR_PREFIX} Locale '${locale}' not found, make sure to register it first.`);
    return;
  }
  currentLocale = locale;

  notify();
}

export function getFallbackLocale() {
  return fallbackLocale;
}

export function setFallbackLocale(locale) {
  const cleanLocale = locale.toLowerCase();

  if (!cache[cleanLocale]) {
    console.warn(`${ERROR_PREFIX} Fallback locale '${locale}' not found, make sure to register it first.`);
    return;
  }
  fallbackLocale = locale;
}

function getNested(obj, path) {
  const keys = path.split('.');
  let current = obj;

  for(let i = 0; i < keys.length; i++) {
    if (current === null || typeof current !== 'object') return undefined;
    current = current[keys[i]];
    if (current === undefined) return undefined;
  }

  return current;
}

export function t(key, vars = {}) {
  const current = cache[currentLocale] ?? {};
  const fallback = cache[fallbackLocale] ?? {};

  let entry = getNested(current, key);

  if (entry === undefined) {
    entry = getNested(fallback, key);
  }

  if (typeof entry === 'function') {
    return entry(vars);
  }

  return entry ?? key;
}
