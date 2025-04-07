'use client';

import React from 'react';
import { useAppSelector } from '~/shared/model/hooks/useRedux';
import Image from 'next/image';
import user from '~/shared/ui/assets/icons/user.svg';

interface AvatarProps {
  className?: string;
}

function Avatar({ className = '' }: AvatarProps) {
  const { payload } = useAppSelector((state) => state.session);

  return payload ? (
    <div
      className={`rounded-full  bg-paper-main h-[43px] aspect-square flex-center ${className}`}
    >
      <span className='relative bottom-[1px]'>
        {payload?.name.slice(0, 1).toUpperCase()}
      </span>
    </div>
  ) : (
    <Image src={user} alt='profile' width={33} />
  );
}

export default Avatar;
