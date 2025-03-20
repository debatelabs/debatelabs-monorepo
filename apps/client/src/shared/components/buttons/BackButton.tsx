import React from 'react';
import leftArrowIcon from '~/assets/icons/left-arrow.svg';
import { ButtonProps } from '@mui/material/Button';
import Image from 'next/image';
import TextButton from '~/shared/components/buttons/TextButton';

const leftArrowIconSize = 28;

export default function BackButton({ ...props }: ButtonProps) {
  return (
    <TextButton
      startIcon={
        <Image
          src={leftArrowIcon}
          alt='Back'
          width={leftArrowIconSize}
          height={leftArrowIconSize}
        />
      }
      {...props}
    >
      {props.children}
    </TextButton>
  );
}
