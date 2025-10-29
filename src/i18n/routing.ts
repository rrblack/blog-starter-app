import {defineRouting} from 'next-intl/routing';
 
export const routing = defineRouting({
  locales: ['en', 'ja'],
  defaultLocale: 'en',
  localePrefix: 'never',
  localeDetection: true,
  localeCookie: {
    // Custom cookie name
    name: 'USER_LOCALE',
    // Expire in one year
    maxAge: 60 * 60 * 24 * 365
  }
});