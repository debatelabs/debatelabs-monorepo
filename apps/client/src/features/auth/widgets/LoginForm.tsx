'use client';

import React, { forwardRef, ForwardedRef } from 'react';
import Input from '~/shared/components/Input';
import PasswordInput from '../components/PasswordInput';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { LoginForm as LoginFormType } from '~/shared/types/auth.types';
import authService from '../services/auth.service';

function LoginForm(_props, ref: ForwardedRef<HTMLFormElement>) {
  const { t } = useTranslation('auth');

  const { register, handleSubmit } = useForm<LoginFormType>();

  async function onSubmit(data: LoginFormType) {
    const response = await authService.login({ data });
    if (!response.success) return;
    console.log(response.data);
  }

  return (
    <form
      ref={ref}
      onSubmit={handleSubmit(onSubmit)}
      className='w-full flex flex-col gap-4'
    >
      <Input label={t('inputs.email')} fullWidth {...register('email')} />
      <PasswordInput register={register} />
    </form>
  );
}

export default forwardRef<HTMLFormElement>(LoginForm);
