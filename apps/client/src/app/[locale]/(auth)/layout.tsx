'use client';

import React from 'react';
import BackButton from '~/core/components/buttons/BackButton';
import { useTranslation } from 'react-i18next';
import ROUTES from '~/core/constants/routes';
import Link from 'next/link';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();

  return (
    <main className='px-page'>
      <div className='py-9'>
        <Link href={ROUTES.home}>
          <BackButton>{t('common.backToHomePage')}</BackButton>
        </Link>
      </div>
      <div className='w-full min-h-[80vh] flex-center'>{children}</div>
    </main>
  );
}
