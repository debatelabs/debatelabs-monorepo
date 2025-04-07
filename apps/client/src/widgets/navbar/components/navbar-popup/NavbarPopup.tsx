import React from 'react';
import { Drawer } from '@mui/material';
import TransparentButton from '~/shared/ui/components/buttons/TransparentButton';
import Image from 'next/image';
import menuIcon from '~/shared/ui/assets/icons/menu.svg';
import MainNavList from '~/widgets/navbar/components/main-nav-list/MainNavList';
import logo from '~/shared/ui/assets/icons/debatelabs-logo.svg';
import { useTranslation } from 'react-i18next';
import TextLink from '~/shared/ui/components/text-link/TextLink';
import ROUTES from '~/shared/config/constants/routes';
import Telegram from '~/shared/ui/components/socials-buttons/Telegram';
import Instagram from '~/shared/ui/components/socials-buttons/Instagram';
import Link from 'next/link';
import themeConfig from '~/shared/config/app/theme.config';

interface NavbarPopupProps {
  open: boolean;
  onClose: () => void;
}

function NavbarPopup({ open, onClose }: NavbarPopupProps) {
  const { t } = useTranslation();

  return (
    <Drawer
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            borderRight: `1px solid ${themeConfig.colors.dark.lighter.border}`
          }
        }
      }}
    >
      <aside className='flex flex-col items-start gap-10 px-4'>
        <div className='h-app-header flex-center gap-10'>
          <TransparentButton sx={{ height: 50 }} onClick={onClose}>
            <Image src={menuIcon} alt='menu' width={25} />
          </TransparentButton>
          <Link href={ROUTES.about}>
            <Image src={logo} alt='debatelabs' height={50} priority />
          </Link>
        </div>

        <MainNavList onClick={onClose} />

        <div className='w-full flex-center'>
          <div className='h-[1px] w-11/12 bg-dark-text'></div>
        </div>

        <section className='flex-center flex-col gap-1 w-full'>
          <div className='w-11/12 flex flex-col gap-7'>
            <ul className='flex flex-col gap-3'>
              <li>
                <TextLink href={ROUTES.about}>{t('common.aboutUs')}</TextLink>
              </li>
              <li>
                <TextLink href={ROUTES.sponsorship}>{t('common.sponsorship')}</TextLink>
              </li>
              <li>
                <TextLink href={ROUTES.contacts}>{t('common.contacts')}</TextLink>
              </li>
            </ul>
            <div className='flex'>
              <Telegram />
              <Instagram />
            </div>
            <p className='text-dark-lighter-text text-sm uppercase my-4'>
              © 2025 DebateLabs
            </p>
          </div>
        </section>
      </aside>
    </Drawer>
  );
}

export default NavbarPopup;
