import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // Supported locales
  locales: ['en', 'ja'],

  // English is the default
  defaultLocale: 'en',

  // ✅ This hides /en but keeps /ja
  localePrefix: 'as-needed'
});

export const config = {
  // Match all pathnames except for:
  // - /api, /trpc, /_next, /_vercel
  // - files with an extension (e.g. favicon.ico)
  matcher: ['/((?!api|trpc|_next|_vercel|.*\\..*).*)']
};