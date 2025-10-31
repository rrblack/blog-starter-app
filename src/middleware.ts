// app/[locale]/proxy.ts (or middleware.ts if you're using Edge Runtime)
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default function middleware(request: Request) {
  try {
    return createMiddleware(routing)(request);
  } catch (err) {
    console.error("500 error triggered in /about");
    console.error("Request details:", {
      url: request.url,
      method: request.method,
      headers: Object.fromEntries(request.headers),
    });
    throw err; // rethrow so Next.js can handle it
  }
}