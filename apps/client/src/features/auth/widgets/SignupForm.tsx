'use client';

import React, { forwardRef, ForwardedRef } from 'react';
import Input from '~/shared/components/Input';
import PasswordInput from '../components/PasswordInput';
import { useTranslation } from 'react-i18next';

function SignupForm(_props, ref: ForwardedRef<HTMLFormElement>) {
  const { t } = useTranslation('auth');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log(true);
  }

  return (
    <form ref={ref} onSubmit={onSubmit} className='w-full flex flex-col gap-4'>
      <Input label={t('inputs.name')} fullWidth />
      <Input label={t('inputs.email')} fullWidth />
      <PasswordInput confirm />
    </form>
  );
}

export default forwardRef<HTMLFormElement>(SignupForm);
