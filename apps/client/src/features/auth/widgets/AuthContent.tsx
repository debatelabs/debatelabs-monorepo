'use client';

import React from 'react';
import ExternalAuthSection from '../components/ExternalAuthSection';
import { useTranslation } from 'react-i18next';
import ROUTES from '~/core/constants/routes';
import TextLink from '~/core/components/text-link/TextLink';

interface AuthContentProps {
  children: React.ReactElement<HTMLFormElement>;
  type: 'login' | 'signup';
}

export default function AuthContent({ children, type }: AuthContentProps) {
  const { t } = useTranslation();

  return (
    <div className='flex-center flex-col gap-14'>
      <div className='flex-center flex-col relative'>
        <h2 className='bg-dark-main text-3xl absolute z-10 px-7 -top-5'>
          {type && t(`auth.${type}Title`)}
        </h2>
        <div className='w-[500px] h-fit border-4 border-primary-main flex-center flex-col rounded-[4px] px-16 py-14'>
          <div className='w-full flex-center flex-col gap-6'>
            <ExternalAuthSection />
            <div className='flex-center relative w-1/2'>
              <div className='w-full h-[1px] absolute bg-secondary'></div>
              <span className='bg-dark-main z-10 relative px-4'>{t('auth.or')}</span>
            </div>
            {children}
          </div>
        </div>
      </div>
      <p>
        <span className='mr-2'>
          {t(`auth.${type === 'login' ? 'noAccount' : 'existingAccount'}`)}
        </span>
        <TextLink
          href={ROUTES[type === 'login' ? 'signup' : 'login']}
          className='text-primary-main hover:!text-primary-main'
        >
          {type === 'login' ? t('auth.signup') : t('auth.login')}
        </TextLink>
      </p>
    </div>
  );
}
