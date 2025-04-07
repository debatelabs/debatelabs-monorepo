'use client';

import React from 'react';
import '~/shared/ui/styles/app-layout.scss';
import NavbarItem from '~/widgets/navbar/NavbarItem';
import ROUTES from '~/shared/config/constants/routes';
import TransparentButton from '~/shared/ui/components/buttons/TransparentButton';
import Image from 'next/image';
import homeIcon from '~/shared/ui/assets/icons/home.svg';
import homeIconFilled from '~/shared/ui/assets/icons/home-filled.svg';
import personalPageIcon from '~/shared/ui/assets/icons/personal-page.svg';
import personalPageIconFilled from '~/shared/ui/assets/icons/personal-page-filled.svg';
import settingsIcon from '~/shared/ui/assets/icons/settings.svg';
import settingsIconFilled from '~/shared/ui/assets/icons/settings-filled.svg';
import menuIcon from '~/shared/ui/assets/icons/menu.svg';
import createRoomIcon from '~/shared/ui/assets/icons/create-room.svg';
import joinRoomIcon from '~/shared/ui/assets/icons/join-room.svg';
import { useTranslation } from 'react-i18next';

function Navbar() {
  const { t } = useTranslation();

  return (
    <nav className='flex flex-col w-[90px] gap-10'>
      <div className='h-app-header flex-center'>
        <TransparentButton sx={{ height: 50 }}>
          <Image src={menuIcon} alt='menu' width={25} height={25} />
        </TransparentButton>
      </div>
      <div className='flex-center flex-col gap-8'>
        <div className='flex-center flex-col gap-1'>
          <NavbarItem
            href={ROUTES.home}
            title={t('common.nav.home')}
            icon={homeIcon}
            filledIcon={homeIconFilled}
          />
          <NavbarItem
            href={ROUTES.dashboard}
            title={t('common.nav.dashboard')}
            icon={personalPageIcon}
            filledIcon={personalPageIconFilled}
          />
          <NavbarItem
            href={ROUTES.settings}
            title={t('common.nav.settings')}
            icon={settingsIcon}
            filledIcon={settingsIconFilled}
          />
        </div>
        <div className='h-[1px] w-1/4 bg-dark-text'></div>
        <div className='flex-center flex-col gap-1'>
          <NavbarItem title={t('common.room.join')} icon={joinRoomIcon} />
          <NavbarItem title={t('common.room.create')} icon={createRoomIcon} />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
