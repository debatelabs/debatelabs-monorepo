'use client';

import React from 'react';
import Image from 'next/image';
import googleIcon from '~/assets/icons/google.svg';
import { Button, ButtonProps, styled } from '@mui/material';
import themeConfig from '~/core/configs/theme.config';

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
      Продовжити через Google
    </StyledButton>
  );
}
