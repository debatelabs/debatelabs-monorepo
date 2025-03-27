'use client';

import { Button, ButtonProps, styled } from '@mui/material';
import React from 'react';

const StyledButton = styled(Button)({
  borderRadius: '100px',
  minWidth: '100px'
});

export default function ContainedButton({ children, ...props }: ButtonProps) {
  return (
    <StyledButton variant='contained' {...props}>
      {children}
    </StyledButton>
  );
}
