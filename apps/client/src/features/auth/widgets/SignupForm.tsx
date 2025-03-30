'use client';

import React from 'react';
import Input from '~/core/components/input/Input';
import PasswordInput from '../components/PasswordInput';
import { useTranslation } from 'react-i18next';
import { UseFormReturn } from 'react-hook-form';
import { SignupForm as SignupFormType } from '~/core/types/auth.types';
import * as authService from '../services/auth.services';
import createSignupFormSchema from '../validations/signup-form.schema';
import AuthFormContainer from '../components/AuthFormContainer';

function SignupFormContent({ formHook }: { formHook?: UseFormReturn<SignupFormType> }) {
  const { t } = useTranslation();

  if (!formHook) return null;

  const {
    register,
    formState: { errors }
  } = formHook;

  return (
    <>
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
    </>
  );
}

export default function SignupForm() {
  return (
    <AuthFormContainer
      type='signup'
      createSchemaFn={createSignupFormSchema}
      service={authService.signup}
    >
      <SignupFormContent />
    </AuthFormContainer>
  );
}
