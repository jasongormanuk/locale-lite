# locale-lite

A lightweight JS internationalization library.

- Core library is 1.8kb uncompressed, 527 bytes brotli compressed.
- Zero external dependencies

## Simple Setup

```js
/////////////////////////
// Example locale file //
/////////////////////////
export default { // locale files are normal JS files
    title: 'Section title',
  greeting: ({ name }) => `Hello, ${name}`,
  policyNotice: ({ link }) => [
    "Please review our ",
    link("Privacy Policy"), // to allow components to appear in the middle of strings use an array
    " before continuing.",
  ],
  policyLinkURL: 'http://example.com'
};


////////////////////////////////////
// When your application boots up //
////////////////////////////////////
import { registerLocale, subscribe } from 'locale-lite';

import en from './locales/en.js'; // import locale files from elsewhere in your application
import pl from './locales/pl.js';

registerLocale('en', en); // make sure to register the locales
registerLocale('pl', pl);

subscribe((newLocale) => {
    // When a locale changes this function will be notified
    // you can use this to trigger a re-render.
});


//////////////////////////////////////////////////////////
// Reference translations somewhere in your application //
//////////////////////////////////////////////////////////
import { t } from 'locale-lite';

t('title'); // reference a static string for the current locale

t('greeting', { name: 'Alice' }); // inject dynamic data into the value

t('policyNotice', { // pass a function to be called within the current locale
    link: (text) => `<a href="${t('policyLinkURL')}">${text}</a>`
}).join(); // for translations that return an array remember to `.join()` afterwards, or pass to your template / component library to handle.

```



