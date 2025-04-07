import React from 'react';
import Image from 'next/image';
import logo from '~/shared/ui/assets/icons/debatelabs-logo.svg';
import arrow from '~/shared/ui/assets/icons/arrow.svg';
import TransparentButton from '~/shared/ui/components/buttons/TransparentButton';
import '~/shared/ui/styles/app-layout.scss';
import Link from 'next/link';
import ROUTES from '~/shared/config/constants/routes';
import Avatar from '~/shared/ui/components/avatar/Avatar';

interface HeaderProps {
  handleAvatarClick?: () => void;
}

function Header({ handleAvatarClick }: HeaderProps) {
  return (
    <header className='flex items-center justify-between h-app-header'>
      <div className='relative bottom-[1px]'>
        <Link href={ROUTES.about}>
          <Image src={logo} alt='debatelabs' height={42} />
        </Link>
      </div>
      <div className='flex-center'>
        <TransparentButton sx={{ height: 50, gap: 1.3 }} onClick={handleAvatarClick}>
          <Avatar />
          <Image src={arrow} alt='arrow' width={16} />
        </TransparentButton>
      </div>
    </header>
  );
}

export default Header;
