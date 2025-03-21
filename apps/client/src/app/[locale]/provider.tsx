import React, { Suspense } from 'react';
import ReduxProvider from '~/core/providers/redux-provider';
import I18nProvider from '~/core/providers/i18n-provider';
import { Locale } from '~/shared/types/common.types';
import Loader from '~/shared/components/loader/Loader';
import MuiProvider from '~/core/providers/mui-theme-provider';

interface ProvidersProps {
  children: React.ReactNode;
  locale: Locale;
}

async function AppProvider({ children, locale }: ProvidersProps) {
  return (
    <Suspense fallback={<Loader />}>
      <I18nProvider locale={locale}>
        <ReduxProvider>
          <MuiProvider>{children}</MuiProvider>
        </ReduxProvider>
      </I18nProvider>
    </Suspense>
  );
}

export default AppProvider;
