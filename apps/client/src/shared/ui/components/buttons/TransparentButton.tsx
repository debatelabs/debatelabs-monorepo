'use client';

import React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import themeConfig from '~/shared/config/app/theme.config';

export type TextButtonProps = Omit<ButtonProps, 'href'>;

const StyledButton = styled(Button)({
  '&:hover': {
    backgroundColor: themeConfig.colors.highlight.main
  }
});

export default function TransparentButton(props: TextButtonProps) {
  return (
    <StyledButton {...props} disableElevation variant='text'>
      {props.children}
    </StyledButton>
  );
}
