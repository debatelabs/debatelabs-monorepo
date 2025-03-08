"use client";

import React, { useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import { i18nInstance } from "~/lib/i18n";
import { Locale } from "~/types/common.types";
import { i18n as I18nType } from "i18next";
import Loader from "~/components/ui/loader/loader";

interface I18nProviderProps {
  children: React.ReactNode;
  locale: Locale;
}

function I18nProvider({ children, locale }: I18nProviderProps) {
  const [i18n, setI18n] = useState<I18nType | null>(null);

  useEffect(() => {
    async function initI18n() {
      const i18n = await i18nInstance.init(locale);
      setI18n(i18n);
    }

    void initI18n();
  }, [locale]);

  if (!i18n) return <Loader />;
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}

export default I18nProvider;
