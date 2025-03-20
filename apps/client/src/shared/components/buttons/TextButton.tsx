'use client';

import React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import themeConfig from '~/core/configs/theme.config';

const StyledButton = styled(Button)({
  '&:hover': {
    backgroundColor: themeConfig.colors.darkLight
  }
});

export default function TextButton(props: ButtonProps) {
  return (
    <StyledButton {...props} disableElevation variant='text'>
      {props.children}
    </StyledButton>
  );
}
