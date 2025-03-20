import React from 'react';
import Image from 'next/image';
import googleIcon from '~/assets/icons/google.svg';

export default function GoogleButton() {
  return (
    <button
      type='button'
      className='bg-light text-dark rounded-2xl w-full flex-center h-14 gap-3'
    >
      <Image src={googleIcon} alt='Google' width={24} height={24} />
      Продовжити через Google
    </button>
  );
}
