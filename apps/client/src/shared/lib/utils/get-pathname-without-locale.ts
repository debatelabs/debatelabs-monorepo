import { i18nConfig } from '~/shared/config/app/i18n.config';

export default function getPathnameWithoutLocale(pathname: string) {
  const locale = pathname.slice(1, 3) as (typeof i18nConfig.locales)[number];
  const isLocale = i18nConfig.locales.includes(locale);
  const result = isLocale ? pathname.slice(3) : pathname;
  return result || '/';
}
