'use client';

import React from 'react';
import BackButton from '~/shared/components/buttons/BackButton';
import { useTranslation } from 'react-i18next';
import ROUTES from '~/core/constants/routes';
import Link from 'next/link';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();

  return (
    <div>
      <div className='p-9'>
        <Link href={ROUTES.home}>
          <BackButton>{t('backToHomePage')}</BackButton>
        </Link>
      </div>
      <div className='w-screen min-h-[80vh] flex-center'>{children}</div>
    </div>
  );
}
