import React from 'react';
import Header from '~/widgets/header';
import Navbar from '~/widgets/navbar';
import '~/shared/ui/styles/app-layout.scss';

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex'>
      <Navbar />
      <div className='px-app-page flex-1'>
        <Header />
        <main className='flex-1'>{children}</main>
      </div>
    </div>
  );
}

export default AppLayout;
