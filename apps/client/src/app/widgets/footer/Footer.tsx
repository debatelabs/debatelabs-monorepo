import React from 'react';
import Image from 'next/image';
import debatelabsLogo from '~/app/assets/icons/debatelabs-logo.svg';
import TextLink from '~/core/components/text-link/TextLink';

export default function Footer() {
  return (
    <footer className='w-screen min-h-40 bg-darkLighter px-page pt-12 pb-16 flex flex-col gap-14'>
      <div className='w-full h-full flex justify-between'>
        <div className=''>
          <Image src={debatelabsLogo} alt='DebateLabs' width={105} />
        </div>
        <div className=''>
          <div>
            <h3 className='text-xl'>Інформація</h3>
            <ul className='flex flex-col gap-2 mt-6 text-base'>
              <li>
                <TextLink href='#'>Про нас</TextLink>
              </li>
              <li>
                <TextLink href='#'>Партнерам</TextLink>
              </li>
              <li>
                <TextLink href='#'>Зворотній звʼязок</TextLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className='w-full h-full flex-center justify-between'>
        <p className='text-sm uppercase'>© 2025 DebateLabs</p>
        <p>Українська</p>
      </div>
    </footer>
  );
}
