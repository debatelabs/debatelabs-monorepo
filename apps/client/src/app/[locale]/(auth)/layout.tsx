'use client';

import React, { useLayoutEffect } from 'react';
import BackButton from '~/core/components/buttons/BackButton';
import { useTranslation } from 'react-i18next';
import ROUTES from '~/core/constants/routes';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();
  const router = useRouter();

  useLayoutEffect(() => {
    // TODO: check if user is logged in
    //  if isAuthorized === true in redux slice
    // router.replace(ROUTES.home);
  }, [router]);

  return (
    <div>
      <div className='p-9'>
        <Link href={ROUTES.home}>
          <BackButton>{t('common.backToHomePage')}</BackButton>
        </Link>
      </div>
      <div className='w-screen min-h-[80vh] flex-center'>{children}</div>
    </div>
  );
}
