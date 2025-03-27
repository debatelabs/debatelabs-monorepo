'use client';

import React, { forwardRef, ForwardedRef } from 'react';
import Input from '~/shared/components/Input';
import PasswordInput from '../components/PasswordInput';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { SignupForm as SignupFormType } from '~/shared/types/auth.types';
import * as authService from '../services/auth.services';
import createSignupFormSchema from '../validations/signup-form.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import ROUTES from '~/shared/constants/routes';
import { useRouter } from 'next/navigation';

function SignupForm(_, ref: ForwardedRef<HTMLFormElement>) {
  const { t } = useTranslation();
  const router = useRouter();

  const formHook = useForm<SignupFormType>({
    resolver: zodResolver(createSignupFormSchema(t))
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = formHook;

  const onSubmit = async (data: SignupFormType) => {
    const response = await authService.signup({ data });
    if (response.success) router.replace(ROUTES.home);
  };

  return (
    <form
      ref={ref}
      onSubmit={handleSubmit(onSubmit)}
      className='w-full flex flex-col gap-4'
    >
      <Input
        label={t('auth.inputs.name')}
        fullWidth
        {...register('name')}
        error={!!errors.name?.message}
        helperText={errors.name?.message}
      />
      <Input
        label={t('auth.inputs.email')}
        fullWidth
        {...register('email')}
        error={!!errors.email?.message}
        helperText={errors.email?.message}
      />
      <PasswordInput formHook={formHook} confirm />
    </form>
  );
}

export default forwardRef<HTMLFormElement>(SignupForm);
