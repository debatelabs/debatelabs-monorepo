'use client';

import React, { useState } from 'react';
import Input from '~/shared/components/Input';
import { IconButton, InputAdornment } from '@mui/material';
import eyeIcon from '~/app/assets/icons/eye.svg';
import closedEyeIcon from '~/app/assets/icons/closed-eye.svg';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { Path, UseFormReturn } from 'react-hook-form';
import { PasswordFormValues } from '~/shared/types/auth.types';

const showPaswIconConfig = {
  alt: 'change visibility',
  size: 25
};

interface PasswordInputProps<T extends PasswordFormValues> {
  formHook: UseFormReturn<T>;
  confirm?: boolean;
}

export default function PasswordInput<T extends PasswordFormValues>({
  formHook,
  confirm = false
}: PasswordInputProps<T>) {
  const { t } = useTranslation();
  const {
    register,
    formState: { errors }
  } = formHook;

  const [isPaswShown, setIsPaswShown] = useState(false);
  function handleClickShowPassword() {
    setIsPaswShown((prev) => !prev);
  }

  return (
    <>
      <Input
        {...register('password' as Path<T>)}
        error={!!errors.password?.message}
        helperText={
          typeof errors.password?.message === 'string' ? errors.password.message : ''
        }
        fullWidth
        type={isPaswShown ? 'text' : 'password'}
        label={t('auth.inputs.password')}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton onClick={handleClickShowPassword} sx={{ height: 30 }}>
                  {isPaswShown ? (
                    <Image
                      src={eyeIcon}
                      alt={showPaswIconConfig.alt}
                      width={showPaswIconConfig.size}
                      height={showPaswIconConfig.size}
                    />
                  ) : (
                    <Image
                      src={closedEyeIcon}
                      alt={showPaswIconConfig.alt}
                      width={showPaswIconConfig.size}
                      height={showPaswIconConfig.size}
                    />
                  )}
                </IconButton>
              </InputAdornment>
            )
          }
        }}
      />
      {confirm && (
        <Input
          {...register('confirmPassword' as Path<T>)}
          fullWidth
          type={isPaswShown ? 'text' : 'password'}
          label={t('auth.inputs.confirmPassword')}
          error={!!errors.confirmPassword?.message}
          helperText={
            typeof errors.confirmPassword?.message === 'string'
              ? errors.confirmPassword.message
              : ''
          }
        />
      )}
    </>
  );
}
