'use client';

import React from 'react';
import TransparentButton from '~/shared/ui/components/buttons/TransparentButton';
import Link from 'next/link';
import Image from 'next/image';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { SxProps, Tooltip } from '@mui/material';
import { usePathname } from 'next/navigation';
import themeConfig from '~/shared/config/app/theme.config';
import getPathnameWithoutLocale from '~/shared/lib/utils/get-pathname-without-locale';

const defaultButtonStyles: SxProps = {
  height: 50,
  '&:hover': {
    backgroundColor: themeConfig.colors.highlight.nav
  }
};

const activeButtonStyles: SxProps = {
  ...defaultButtonStyles,
  backgroundColor: themeConfig.colors.paper.main,
  border: `1px solid ${themeConfig.colors.paper.border}`,
  pointerEvents: 'none'
};

interface NavbarItemProps {
  title: string;
  href?: string;
  icon: StaticImport;
  filledIcon?: StaticImport;
  onClick?: () => void;
}

function NavbarItem({ title, href, icon, filledIcon, onClick }: NavbarItemProps) {
  let pathname = usePathname();
  pathname = getPathnameWithoutLocale(pathname);
  const isActive = pathname === href;

  const handleClick = (e: React.MouseEvent) => {
    if (!href) return e.preventDefault();
    if (onClick) onClick();
  };

  return (
    <Tooltip title={title} placement='right'>
      <Link href={href || '#'} className='w-fit' onClick={handleClick}>
        <TransparentButton
          sx={isActive ? { ...activeButtonStyles } : defaultButtonStyles}
          onClick={onClick}
        >
          {filledIcon && isActive ? (
            <Image src={filledIcon} alt={title.toLowerCase()} width={25} />
          ) : (
            <Image src={icon} alt={title.toLowerCase()} width={25} />
          )}
        </TransparentButton>
      </Link>
    </Tooltip>
  );
}

export default NavbarItem;
