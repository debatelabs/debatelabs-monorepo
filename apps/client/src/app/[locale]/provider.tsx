import React, { Suspense } from 'react';
import ReduxProvider from '~/core/providers/redux-provider';
import I18nProvider from '~/core/providers/i18n-provider';
import { Locale } from '~/shared/types/common.types';
import Loader from '~/shared/components/loader/loader';

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
