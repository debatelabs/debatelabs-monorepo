import { createInstance, i18n as I18nType } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Locale } from '~/shared/model/types/common.types';
import { i18nConfig, namespaces } from '~/shared/config/app/i18n.config';
import resources from '~/shared/config/constants/locales';

export class I18n {
  private readonly i18nextInstance: I18nType;

  constructor() {
    this.i18nextInstance = this.createI18nInstance();
  }

  private createI18nInstance() {
    const i18next = createInstance();
    i18next.use(initReactI18next);
    return i18next;
  }

  async init(locale: Locale) {
    await this.i18nextInstance.init({
      resources,
      lng: locale,
      fallbackLng: i18nConfig.defaultLocale,
      ns: Object.values(namespaces),
      defaultNS: namespaces.translations,
      supportedLngs: i18nConfig.locales,
      interpolation: {
        escapeValue: false
      },
      react: {
        useSuspense: true
      }
    });
    return this.i18nextInstance;
  }

  get getI18n() {
    return this.i18nextInstance;
  }
}

export const i18nInstance = new I18n();
