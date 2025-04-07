'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import logo from '~/shared/ui/assets/icons/debatelabs-logo.svg';
import arrow from '~/shared/ui/assets/icons/arrow.svg';
import TransparentButton from '~/shared/ui/components/buttons/TransparentButton';
import '~/shared/ui/styles/app-layout.scss';
import Link from 'next/link';
import ROUTES from '~/shared/config/constants/routes';
import Avatar from '~/shared/ui/components/avatar/Avatar';
import { ClickAwayListener } from '@mui/material';
import { usePathname } from 'next/navigation';

interface HeaderProps {
  profilePopup: React.ReactNode;
}

function Header({ profilePopup }: HeaderProps) {
  const pathname = usePathname();
  const [profilePopupOpened, setProfilePopupOpened] = useState(false);
  const toggleProfilePopup = () => setProfilePopupOpened((prev) => !prev);
  const closeProfilePopup = () => setProfilePopupOpened(false);

  useEffect(() => {
    closeProfilePopup();
  }, [pathname]);

  return (
    <header className='flex items-center justify-between h-app-header'>
      <div className='relative bottom-[1px]'>
        <Link href={ROUTES.about}>
          <Image src={logo} alt='debatelabs' height={42} priority />
        </Link>
      </div>
      <div className='flex-center relative'>
        <TransparentButton sx={{ height: 50, gap: 1.3 }} onClick={toggleProfilePopup}>
          <Avatar />
          <Image src={arrow} alt='arrow' width={16} />
        </TransparentButton>
        {profilePopupOpened && profilePopup && (
          <ClickAwayListener onClickAway={closeProfilePopup}>
            <div className='absolute top-full right-0'>{profilePopup}</div>
          </ClickAwayListener>
        )}
      </div>
    </header>
  );
}

export default Header;
