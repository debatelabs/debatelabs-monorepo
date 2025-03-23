'use client';

import React, { forwardRef, ForwardedRef } from 'react';
import Input from '~/shared/components/Input';
import PasswordInput from '../components/PasswordInput';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { LoginForm as LoginFormType } from '~/shared/types/auth.types';
import authService from '../services/auth.service';
import { zodResolver } from '@hookform/resolvers/zod';
import createLoginFormSchema from '../validations/login-form.schema';

function LoginForm(_, ref: ForwardedRef<HTMLFormElement>) {
  const { t } = useTranslation();

  const formHook = useForm<LoginFormType>({
    resolver: zodResolver(createLoginFormSchema(t))
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = formHook;

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
      <Input
        label={t('auth.inputs.email')}
        fullWidth
        {...register('email')}
        error={!!errors.email?.message}
        helperText={errors.email?.message}
      />
      <PasswordInput formHook={formHook} />
    </form>
  );
}

export default forwardRef<HTMLFormElement>(LoginForm);
