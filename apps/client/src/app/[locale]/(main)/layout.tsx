import React from 'react';
import Header from '~/widgets/header';
import Navbar from '~/widgets/navbar';
import '~/shared/ui/styles/app-layout.scss';
import ProfilePopup from '~/widgets/profile-popup';

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex'>
      <Navbar />
      <div className='px-app-page flex-1'>
        <Header profilePopup={<ProfilePopup />} />
        <main className='flex-1'>{children}</main>
      </div>
    </div>
  );
}

export default AppLayout;
