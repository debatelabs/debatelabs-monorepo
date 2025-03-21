import React, { useState } from 'react';
import Input from '~/shared/components/Input';
import { IconButton, InputAdornment } from '@mui/material';
import eyeIcon from '~/assets/icons/eye.svg';
import closedEyeIcon from '~/assets/icons/closed-eye.svg';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

const showPaswIconConfig = {
  alt: 'change visibility',
  size: 25
};

interface PasswordInputProps {
  confirm?: boolean;
}

export default function PasswordInput({ confirm = false }: PasswordInputProps) {
  const { t } = useTranslation('auth');

  const [isPaswShown, setIsPaswShown] = useState(false);
  function handleClickShowPassword() {
    setIsPaswShown((prev) => !prev);
  }

  return (
    <>
      <Input
        fullWidth
        type={isPaswShown ? 'text' : 'password'}
        label={t('inputs.password')}
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
          fullWidth
          type={isPaswShown ? 'text' : 'password'}
          label={t('inputs.confirmPassword')}
        />
      )}
    </>
  );
}
