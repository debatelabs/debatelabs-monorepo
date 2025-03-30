import { i18nConfig } from '~/core/configs/i18n.config';

export type Locale = (typeof i18nConfig.locales)[number];

export interface ServiceActionProps<T> {
  data: T;
  params?: Record<string, unknown>;
}

export interface RedirectThrowable {
  redirect: string;
}
