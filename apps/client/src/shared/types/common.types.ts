import { i18nConfig } from '~/configs/i18n.config';

export type Locale = (typeof i18nConfig.locales)[number];

export type RootParams = Promise<{
  locale: Locale;
}>;
