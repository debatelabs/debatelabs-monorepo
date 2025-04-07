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
  justifyContent: 'start',
  gap: 1.2,
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
  minimized?: boolean;
}

function NavbarItem({
  title,
  href,
  icon,
  filledIcon,
  onClick,
  minimized = false
}: NavbarItemProps) {
  let pathname = usePathname();
  pathname = getPathnameWithoutLocale(pathname);
  const isActive = pathname === href;

  const handleClick = (e: React.MouseEvent) => {
    if (!href) return e.preventDefault();
    if (onClick) onClick();
  };

  const renderIcon = () => {
    if (filledIcon && isActive)
      return <Image src={filledIcon} alt={title.toLowerCase()} width={25} />;
    return <Image src={icon} alt={title.toLowerCase()} width={25} />;
  };

  return (
    <Tooltip
      disableHoverListener={!minimized}
      disableFocusListener={!minimized}
      disableTouchListener={!minimized}
      title={title}
      placement='right'
    >
      <Link
        href={href || '#'}
        className={minimized ? 'w-fit' : 'w-full'}
        onClick={handleClick}
      >
        <TransparentButton
          sx={isActive ? { ...activeButtonStyles } : defaultButtonStyles}
          onClick={onClick}
          startIcon={!minimized && renderIcon()}
          fullWidth={!minimized}
        >
          {minimized ? renderIcon() : title}
        </TransparentButton>
      </Link>
    </Tooltip>
  );
}

export default NavbarItem;
