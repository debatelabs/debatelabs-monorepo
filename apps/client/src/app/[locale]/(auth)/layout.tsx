import React from 'react';
import BackButton from '~/shared/components/buttons/BackButton';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className='p-9'>
        <BackButton>Назад на головну сторінку</BackButton>
      </div>
      <div className='w-screen min-h-[80vh] flex-center'>{children}</div>
    </div>
  );
}
