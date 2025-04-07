import React from 'react';
import { IconButton } from '@mui/material';
import Image from 'next/image';
import telegramIcon from '~/shared/ui/assets/icons/telegram.svg';
import { buttonStyles, iconSize } from './constants';

function Telegram() {
  return (
    <IconButton sx={buttonStyles} title='Telegram'>
      <Image src={telegramIcon} alt='Telegram' width={iconSize} />
    </IconButton>
  );
}

export default Telegram;
