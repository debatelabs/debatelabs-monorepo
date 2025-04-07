import React from 'react';
import leftArrowIcon from '~/shared/ui/assets/icons/left-arrow.svg';
import Image from 'next/image';
import TransparentButton, {
  TextButtonProps
} from '~/shared/ui/components/buttons/TransparentButton';

const leftArrowIconSize = 28;

export default function BackButton({ ...props }: TextButtonProps) {
  return (
    <TransparentButton
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
    </TransparentButton>
  );
}
