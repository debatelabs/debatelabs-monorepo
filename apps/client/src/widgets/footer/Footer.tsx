'use client';

import React from 'react';
import Image from 'next/image';
import debatelabsLogo from '~/shared/ui/assets/icons/debatelabs-logo.svg';
import TextLink from '~/shared/ui/components/text-link/TextLink';
import { LanguageChangeButton } from '~/shared/ui/components/buttons/LanguageChangeButton';
import { useTranslation } from 'react-i18next';
import ROUTES from '~/shared/config/constants/routes';
import Instagram from '~/shared/ui/components/socials-buttons/Instagram';
import Telegram from '~/shared/ui/components/socials-buttons/Telegram';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className='w-screen min-h-40 bg-dark-lighter-main px-public-page pt-12 pb-16 flex flex-col gap-14'>
      <div className='w-full h-full flex justify-between'>
        <div>
          <Image src={debatelabsLogo} alt='DebateLabs' width={105} />
        </div>
        <div className='flex min-w-fit w-2/6 justify-between gap-12'>
          <div>
            <h3 className='text-xl'>{t('common.info')}</h3>
            <ul className='flex flex-col gap-2 mt-6 text-base'>
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
          </div>
          <div className='flex flex-col justify-end'>
            <Telegram />
            <Instagram />
          </div>
        </div>
      </div>
      <div className='w-full h-full flex-center justify-between'>
        <p className='text-dark-lighter-text text-sm uppercase'>© 2025 DebateLabs</p>
        <LanguageChangeButton />
      </div>
    </footer>
  );
}
