'use client';

import React, { forwardRef, ForwardedRef } from 'react';
import Input from '~/core/components/Input';
import PasswordInput from '../components/PasswordInput';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { LoginForm as LoginFormType } from '~/core/types/auth.types';
import * as authService from '../services/auth.services';
import { zodResolver } from '@hookform/resolvers/zod';
import createLoginFormSchema from '../validations/login-form.schema';
import { useRouter } from 'next/navigation';
import ROUTES from '~/core/constants/routes';

function LoginForm(_, ref: ForwardedRef<HTMLFormElement>) {
  const { t } = useTranslation();
  const router = useRouter();

  const formHook = useForm<LoginFormType>({
    resolver: zodResolver(createLoginFormSchema(t))
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = formHook;

  const onSubmit = async (data: LoginFormType) => {
    const response = await authService.login({ data });
    if (response.success) router.replace(ROUTES.home);
  };

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
