import React from 'react';
import { IconButton } from '@mui/material';
import Image from 'next/image';
import instagramIcon from '~/shared/ui/assets/icons/instagram.svg';
import { buttonStyles, iconSize } from './constants';

function Instagram() {
  return (
    <IconButton sx={buttonStyles} title='Instagram'>
      <Image src={instagramIcon} alt='Instagram' width={iconSize} />
    </IconButton>
  );
}

export default Instagram;
