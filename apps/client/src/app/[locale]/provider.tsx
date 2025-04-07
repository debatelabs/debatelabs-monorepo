import React, { Suspense } from 'react';
import ReduxProvider from '~/app/providers/redux-provider';
import I18nProvider from '~/app/providers/i18n-provider';
import { Locale } from '~/shared/model/types/common.types';
import Loader from '~/shared/ui/components/loader/Loader';
import MuiProvider from '~/app/providers/mui-theme-provider';
import SessionProvider from '~/app/providers/session-provider';

interface ProvidersProps {
  children: React.ReactNode;
  locale: Locale;
}

async function AppProvider({ children, locale }: ProvidersProps) {
  return (
    <Suspense fallback={<Loader />}>
      <I18nProvider locale={locale}>
        <ReduxProvider>
          <SessionProvider>
            <MuiProvider>{children}</MuiProvider>
          </SessionProvider>
        </ReduxProvider>
      </I18nProvider>
    </Suspense>
  );
}

export default AppProvider;
