import {cookies} from 'next/headers';
import {getRequestConfig} from 'next-intl/server';
 
export default getRequestConfig(async () => {
  const cookieStore = cookies();
  const cookieLocale = cookieStore.get('locale')?.value;
  const locale = cookieLocale === 'ja' ? 'ja' : 'en';

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
