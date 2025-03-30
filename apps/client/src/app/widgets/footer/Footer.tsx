'use client';

import React from 'react';
import Image from 'next/image';
import debatelabsLogo from '~/app/assets/icons/debatelabs-logo.svg';
import telegramIcon from '~/app/assets/icons/telegram.svg';
import instagramIcon from '~/app/assets/icons/instagram.svg';
import TextLink from '~/core/components/text-link/TextLink';
import { IconButton } from '@mui/material';
import { LanguageChangeButton } from '~/core/components/buttons/LanguageChangeButton';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className='w-screen min-h-40 bg-dark-lighter px-page pt-12 pb-16 flex flex-col gap-14'>
      <div className='w-full h-full flex justify-between'>
        <div>
          <Image src={debatelabsLogo} alt='DebateLabs' width={105} />
        </div>
        <div className='flex min-w-fit w-2/6 justify-between gap-12'>
          <div>
            <h3 className='text-xl'>{t('common.info')}</h3>
            <ul className='flex flex-col gap-2 mt-6 text-base'>
              <li>
                <TextLink href='#'>{t('common.aboutUs')}</TextLink>
              </li>
              <li>
                <TextLink href='#'>{t('common.sponsorship')}</TextLink>
              </li>
              <li>
                <TextLink href='#'>{t('common.support')}</TextLink>
              </li>
            </ul>
          </div>
          <div className='flex flex-col justify-end'>
            <IconButton sx={{ height: 40, width: 40 }} title='Telegram'>
              <Image src={telegramIcon} alt='Telegram' width={20} />
            </IconButton>
            <IconButton sx={{ height: 40, width: 40 }} title='Instagram'>
              <Image src={instagramIcon} alt='Instagram' width={20} />
            </IconButton>
          </div>
        </div>
      </div>
      <div className='w-full h-full flex-center justify-between'>
        <p className='text-dark-textLighter text-xs uppercase'>© 2025 DebateLabs</p>
        <LanguageChangeButton />
      </div>
    </footer>
  );
}
