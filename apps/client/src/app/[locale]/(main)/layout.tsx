import React from 'react';
import Header from '~/widgets/header/Header';
import Navbar from '~/widgets/navbar/Navbar';

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='px-app-page'>
      <Header />
      <div className='flex'>
        <Navbar />
        <main>{children}</main>
      </div>
    </div>
  );
}

export default AppLayout;
