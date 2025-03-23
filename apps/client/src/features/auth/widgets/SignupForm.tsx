'use client';

import React, { forwardRef, ForwardedRef } from 'react';
import Input from '~/shared/components/Input';
import PasswordInput from '../components/PasswordInput';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { SignupForm as SignupFormType } from '~/shared/types/auth.types';
import authService from '../services/auth.service';

function SignupForm(_props, ref: ForwardedRef<HTMLFormElement>) {
  const { t } = useTranslation('auth');

  const { register, handleSubmit } = useForm<SignupFormType>();

  async function onSubmit(data: SignupFormType) {
    const response = await authService.signup({ data });
    if (!response.success) return;
    console.log(response.data);
  }

  return (
    <form
      ref={ref}
      onSubmit={handleSubmit(onSubmit)}
      className='w-full flex flex-col gap-4'
    >
      <Input label={t('inputs.name')} fullWidth {...register('name')} />
      <Input label={t('inputs.email')} fullWidth {...register('email')} />
      <PasswordInput register={register} confirm />
    </form>
  );
}

export default forwardRef<HTMLFormElement>(SignupForm);
