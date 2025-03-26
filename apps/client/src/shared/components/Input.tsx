'use client';

import React from 'react';
import { styled } from '@mui/material/styles';
import { TextField, TextFieldProps } from '@mui/material';
import themeConfig from '~/shared/configs/theme.config';

const StyledTextField = styled(TextField)({
  '& input': {
    marginBottom: 3,
    borderColor: themeConfig.colors.secondary
  }
});

export default function Input({ variant = 'standard', ...props }: TextFieldProps) {
  return <StyledTextField spellCheck={false} variant={variant} {...props} />;
}
