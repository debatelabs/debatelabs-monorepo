import React from 'react';
import Image from 'next/image';
import menuIcon from '~/shared/ui/assets/icons/menu.svg';
import logo from '~/shared/ui/assets/icons/debatelabs-logo.svg';
import user from '~/shared/ui/assets/icons/user.svg';
import arrow from '~/shared/ui/assets/icons/arrow.svg';

function Header() {
  return (
    <header className='flex items-center justify-between h-[90px]'>
      <div className='flex-center gap-10'>
        <Image src={menuIcon} alt='menu' width={24} />
        <Image src={logo} alt='debatelabs' width={95} />
      </div>
      <div className='flex-center gap-2'>
        <Image src={user} alt='profile' width={32} />
        <Image src={arrow} alt='arrow' width={16} />
      </div>
    </header>
  );
}

export default Header;
