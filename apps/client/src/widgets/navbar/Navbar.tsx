'use client';

import React, { useState } from 'react';
import '~/shared/ui/styles/app-layout.scss';
import TransparentButton from '~/shared/ui/components/buttons/TransparentButton';
import Image from 'next/image';
import menuIcon from '~/shared/ui/assets/icons/menu.svg';
import NavbarPopup from '~/widgets/navbar/components/navbar-popup/NavbarPopup';
import MainNavList from '~/widgets/navbar/components/main-nav-list/MainNavList';

function Navbar() {
  const [open, setOpen] = useState(false);
  const togglePopup = (state: boolean) => () =>
    setOpen((prev) => (state !== undefined ? state : !prev));

  return (
    <>
      <aside className='flex flex-col px-[15px] gap-10'>
        <div className='h-app-header flex-center'>
          <TransparentButton sx={{ height: 50 }} onClick={togglePopup(true)}>
            <Image src={menuIcon} alt='menu' width={25} />
          </TransparentButton>
        </div>
        <MainNavList minimized />
      </aside>

      <NavbarPopup open={open} onClose={togglePopup(false)} />
    </>
  );
}

export default Navbar;
