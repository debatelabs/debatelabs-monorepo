'use client';

import React, { useRef } from 'react';
import ExternalAuthSection from '../components/ExternalAuthSection';
import ContainedButton from '~/shared/components/buttons/ContainedButton';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import ROUTES from '~/shared/constants/routes';

interface AuthContentProps {
  children: React.ReactElement<HTMLFormElement>;
  type: 'login' | 'signup';
}

export default function AuthContent({ children, type }: AuthContentProps) {
  const { t } = useTranslation();
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmitForm = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    formRef.current.dispatchEvent(
      new Event('submit', { cancelable: true, bubbles: true })
    );
  };

  return (
    <div className='flex-center flex-col gap-14'>
      <div className='flex-center flex-col relative'>
        <h2 className='bg-dark text-3xl absolute z-10 px-7 -top-5'>
          {type && t(`auth.${type}Title`)}
        </h2>
        <div className='w-[500px] h-fit border-4 border-primary flex-center flex-col rounded-[4px] px-16 py-14'>
          <div className='w-full flex-center flex-col gap-6'>
            <ExternalAuthSection />
            <div className='flex-center relative w-1/2'>
              <div className='w-full h-[1px] absolute bg-secondary'></div>
              <span className='bg-dark z-10 relative px-4'>{t('auth.or')}</span>
            </div>
            {React.cloneElement(children, { ref: formRef })}
          </div>
        </div>
        <div className='absolute -bottom-[18px] bg-dark px-7'>
          <ContainedButton onClick={handleSubmitForm}>
            {type && t(`auth.${type}`)}
          </ContainedButton>
        </div>
      </div>
      <p>
        <span className='mr-2'>
          {t(`auth.${type === 'login' ? 'noAccount' : 'existingAccount'}`)}
        </span>
        <Link href={ROUTES[type === 'login' ? 'signup' : 'login']}>
          <span className='text-primary cursor-pointer'>
            {type === 'login' && t('auth.signup')}
            {type === 'signup' && t('auth.login')}
          </span>
        </Link>
      </p>
    </div>
  );
}
