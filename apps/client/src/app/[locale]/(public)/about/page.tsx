'use client';

import React from 'react';
import ContainedButton from '~/shared/ui/components/buttons/ContainedButton';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import ROUTES from '~/shared/config/constants/routes';

function AboutPage() {
  const { t } = useTranslation();

  return (
    <div className='flex justify-between'>
      <span>Landing Page</span>
      <Link href={ROUTES.login}>
        <ContainedButton>{t('auth.login')}</ContainedButton>
      </Link>
    </div>
  );
}

export default AboutPage;
