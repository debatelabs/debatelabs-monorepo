'use client';

import React from 'react';
import Image from 'next/image';
import googleIcon from '~/shared/ui/assets/icons/google.svg';
import { Button, ButtonProps, styled } from '@mui/material';
import themeConfig from '~/shared/config/app/theme.config';
import { useTranslation } from 'react-i18next';
import { GOOGLE_API_ROUTES } from '~/shared/config/constants/api-routes';

const googleIconSize = 32;

const StyledButton = styled(Button)({
  backgroundColor: themeConfig.colors.light,
  color: themeConfig.colors.dark.main,
  width: '100%',
  minHeight: 55,
  borderRadius: 16,
  '&:hover': {
    backgroundColor: `${themeConfig.colors.light}d8`
  }
});

export default function GoogleButton({ ...props }: ButtonProps) {
  const { t } = useTranslation();

  const handleClick = async () => {
    window.location.replace(GOOGLE_API_ROUTES.auth);
  };

  return (
    <StyledButton
      {...props}
      onClick={handleClick}
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
