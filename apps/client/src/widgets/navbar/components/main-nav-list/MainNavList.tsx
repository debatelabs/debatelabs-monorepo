'use client';

import React from 'react';
import NavbarItem from '~/widgets/navbar/components/navbar-item/NavbarItem';
import ROUTES from '~/shared/config/constants/routes';
import homeIcon from '~/shared/ui/assets/icons/home.svg';
import homeIconFilled from '~/shared/ui/assets/icons/home-filled.svg';
import personalPageIcon from '~/shared/ui/assets/icons/personal-page.svg';
import personalPageIconFilled from '~/shared/ui/assets/icons/personal-page-filled.svg';
import settingsIcon from '~/shared/ui/assets/icons/settings.svg';
import settingsIconFilled from '~/shared/ui/assets/icons/settings-filled.svg';
import joinRoomIcon from '~/shared/ui/assets/icons/join-room.svg';
import createRoomIcon from '~/shared/ui/assets/icons/create-room.svg';
import { useTranslation } from 'react-i18next';

interface NavListProps {
  minimized?: boolean;
  onClick?: () => void;
}

function MainNavList({ minimized = false, onClick }: NavListProps) {
  const { t } = useTranslation();

  return (
    <nav className='flex flex-col gap-8'>
      <section className='flex flex-col gap-1'>
        <NavbarItem
          href={ROUTES.home}
          title={t('common.nav.home')}
          icon={homeIcon}
          filledIcon={homeIconFilled}
          minimized={minimized}
          onClick={onClick}
        />
        <NavbarItem
          href={ROUTES.dashboard}
          title={t('common.nav.dashboard')}
          icon={personalPageIcon}
          filledIcon={personalPageIconFilled}
          minimized={minimized}
          onClick={onClick}
        />
        <NavbarItem
          href={ROUTES.settings}
          title={t('common.nav.settings')}
          icon={settingsIcon}
          filledIcon={settingsIconFilled}
          minimized={minimized}
          onClick={onClick}
        />
      </section>

      <div className='w-full flex-center'>
        <div className={`h-[1px] ${minimized ? 'w-2/5' : 'w-11/12'} bg-dark-text`}></div>
      </div>

      <section className='flex flex-col gap-1'>
        <NavbarItem
          title={t('common.room.join')}
          icon={joinRoomIcon}
          minimized={minimized}
          onClick={() => {
            onClick && onClick();
          }}
        />
        <NavbarItem
          title={t('common.room.create')}
          icon={createRoomIcon}
          minimized={minimized}
          onClick={() => {
            onClick && onClick();
          }}
        />
      </section>
    </nav>
  );
}

export default MainNavList;
