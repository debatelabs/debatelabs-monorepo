'use client';

import React from 'react';
import BackButton from '~/shared/components/buttons/BackButton';
import { useTranslation } from 'react-i18next';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();

  return (
    <div>
      <div className='p-9'>
        <BackButton>{t('backToHomePage')}</BackButton>
      </div>
      <div className='w-screen min-h-[80vh] flex-center'>{children}</div>
    </div>
  );
}
