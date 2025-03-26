import React from 'react';
import leftArrowIcon from '~/app/assets/icons/left-arrow.svg';
import Image from 'next/image';
import TextButton, { TextButtonProps } from '~/shared/components/buttons/TextButton';

const leftArrowIconSize = 28;

export default function BackButton({ ...props }: TextButtonProps) {
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
