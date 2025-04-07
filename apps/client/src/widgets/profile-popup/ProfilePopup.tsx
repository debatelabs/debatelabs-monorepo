'use client';

import React from 'react';
import { useAppSelector } from '~/shared/model/hooks/useRedux';
import TransparentButton from '~/shared/ui/components/buttons/TransparentButton';
import Image from 'next/image';
import toDashboardIcon from '~/shared/ui/assets/icons/user-to-personal-page.svg';
import editProfileIcon from '~/shared/ui/assets/icons/user-settings.svg';
import exitIcon from '~/shared/ui/assets/icons/exit.svg';
import { LanguageChangeButton } from '~/shared/ui/components/buttons/LanguageChangeButton';
import themeConfig from '~/shared/config/app/theme.config';
import Avatar from '~/shared/ui/components/avatar/Avatar';
import { useTranslation } from 'react-i18next';
import ROUTES from '~/shared/config/constants/routes';
import Link from 'next/link';
import { logout } from '~/features/session';
import { useRouter } from 'next/navigation';

const iconSize = 20;

function ProfilePopup() {
  const router = useRouter();
  const { payload } = useAppSelector((state) => state.session);
  const { t } = useTranslation();

  const handleLogout = async () => {
    const success = await logout();
    if (success) router.replace(ROUTES.about);
  };

  return (
    <div className='bg-dark-lighter-main border border-dark-lighter-border w-[380px] px-4 py-3 rounded-3xl flex flex-col gap-4'>
      <section className='flex items-center gap-4'>
        <div className='h-[68px]'>
          <Avatar className='!h-full !text-3xl' />
        </div>
        <div className='flex flex-col gap-0.5'>
          <span className='text-2xl'>{payload?.name}</span>
          <span className='text-sm text-dark-lighter-text'>{payload?.email}</span>
        </div>
      </section>
      <div className='h-[1px] w-full bg-dark-text'></div>
      <section>
        <Link href={ROUTES.dashboard}>
          <TransparentButton
            sx={{ justifyContent: 'start' }}
            fullWidth
            startIcon={
              <Image
                src={toDashboardIcon}
                alt={t('common.toPersonalDashboard')}
                height={iconSize}
              />
            }
          >
            {t('common.toPersonalDashboard')}
          </TransparentButton>
        </Link>
        <Link href={ROUTES.settings}>
          <TransparentButton
            sx={{ justifyContent: 'start' }}
            fullWidth
            startIcon={
              <Image
                src={editProfileIcon}
                alt={t('common.editProfile')}
                height={iconSize}
              />
            }
          >
            {t('common.editProfile')}
          </TransparentButton>
        </Link>
      </section>
      <div className='h-[1px] w-full bg-dark-text'></div>
      <section className='flex items-center justify-between'>
        <TransparentButton
          sx={{ color: themeConfig.colors.alert }}
          startIcon={<Image src={exitIcon} alt={t('common.logout')} height={iconSize} />}
          onClick={handleLogout}
        >
          {t('common.logout')}
        </TransparentButton>
        <LanguageChangeButton />
      </section>
    </div>
  );
}

export default ProfilePopup;
