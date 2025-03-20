import React from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className='w-screen h-screen flex-center'>{children}</div>
    </div>
  );
}
