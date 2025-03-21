export const i18nConfig = {
  locales: ['en', 'uk'],
  defaultLocale: 'uk'
} as const;

export interface LocaleNamespaces {
  common: string | object;
  auth: string | object;
}

export const namespaces = {
  common: 'common',
  auth: 'auth'
} as const satisfies LocaleNamespaces;
