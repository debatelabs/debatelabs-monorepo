import React, { Suspense } from "react";
import ReduxProvider from "~/components/providers/redux-provider";
import I18nProvider from "~/components/providers/i18n-provider";
import { Locale } from "~/types/common.types";
import Loader from "~/components/ui/loader/loader";

interface ProvidersProps {
  children: React.ReactNode;
  locale: Locale;
}

async function AppProvider({ children, locale }: ProvidersProps) {
  return (
    <Suspense fallback={<Loader />}>
      <I18nProvider locale={locale}>
        <ReduxProvider>{children}</ReduxProvider>
      </I18nProvider>
    </Suspense>
  );
}

export default AppProvider;
