'use client';

import React from 'react';
import Image from 'next/image';
import googleIcon from '~/app/assets/icons/google.svg';
import { Button, ButtonProps, styled } from '@mui/material';
import themeConfig from '~/shared/configs/theme.config';
import { useTranslation } from 'react-i18next';

const googleIconSize = 32;

const StyledButton = styled(Button)({
  backgroundColor: themeConfig.colors.light,
  color: themeConfig.colors.dark,
  width: '100%',
  minHeight: 55,
  '&:hover': {
    backgroundColor: `${themeConfig.colors.light}d8`
  }
});

export default function GoogleButton({ ...props }: ButtonProps) {
  const { t } = useTranslation();

  return (
    <StyledButton
      {...props}
      disableElevation
      variant='text'
      startIcon={
        <Image
          src={googleIcon}
          alt='Google'
          width={googleIconSize}
          height={googleIconSize}
        />
      }
    >
      {t('auth.continueWithGoogle')}
    </StyledButton>
  );
}
