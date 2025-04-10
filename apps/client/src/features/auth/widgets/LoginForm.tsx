'use client';

import React from 'react';
import Input from '~/shared/ui/components/input/Input';
import PasswordInput from '../components/PasswordInput';
import { useTranslation } from 'react-i18next';
import { UseFormReturn } from 'react-hook-form';
import * as authService from '../services/auth.services';
import createLoginFormSchema from '../validations/login-form.schema';
import AuthFormContainer from '../components/AuthFormContainer';
import { LoginForm as LoginFormType } from '~/features/auth/types/auth.types';

function LoginFormContent({ formHook }: { formHook?: UseFormReturn<LoginFormType> }) {
  const { t } = useTranslation();

  if (!formHook) return null;

  const {
    register,
    formState: { errors }
  } = formHook;

  return (
    <>
      <Input
        label={t('auth.inputs.email')}
        fullWidth
        {...register('email')}
        error={!!errors.email?.message}
        helperText={errors.email?.message}
      />
      <PasswordInput formHook={formHook} />
    </>
  );
}

export default function LoginForm() {
  return (
    <AuthFormContainer
      type='login'
      createSchemaFn={createLoginFormSchema}
      service={authService.login}
    >
      <LoginFormContent />
    </AuthFormContainer>
  );
}
