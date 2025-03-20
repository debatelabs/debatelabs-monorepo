import React from 'react';
import Image from 'next/image';
import googleIcon from '~/assets/icons/google.svg';

const googleIconSize = 32;

export default function GoogleButton() {
  return (
    <button
      type='button'
      className='bg-light text-dark rounded-2xl w-full flex-center h-14 gap-3'
    >
      <Image
        src={googleIcon}
        alt='Google'
        width={googleIconSize}
        height={googleIconSize}
      />
      Продовжити через Google
    </button>
  );
}
