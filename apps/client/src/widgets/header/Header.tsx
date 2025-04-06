import React from 'react';
import Image from 'next/image';
import menuIcon from '~/shared/ui/assets/icons/menu.svg';
import logo from '~/shared/ui/assets/icons/debatelabs-logo.svg';
import user from '~/shared/ui/assets/icons/user.svg';
import arrow from '~/shared/ui/assets/icons/arrow.svg';
import TransparentButton from '~/shared/ui/components/buttons/TransparentButton';

const headerElemStyles = {
  height: 50
};

function Header() {
  return (
    <header className='flex items-center justify-between h-[90px]'>
      <div className='flex-center gap-5 h-full'>
        <TransparentButton sx={{ height: headerElemStyles.height }}>
          <Image src={menuIcon} alt='menu' width={25} height={25} />
        </TransparentButton>
        <Image src={logo} alt='debatelabs' height={42} />
      </div>
      <div className='flex-center'>
        <TransparentButton sx={{ height: headerElemStyles.height, gap: 1.3 }}>
          <Image src={user} alt='profile' width={32} />
          <Image src={arrow} alt='arrow' width={16} />
        </TransparentButton>
      </div>
    </header>
  );
}

export default Header;
