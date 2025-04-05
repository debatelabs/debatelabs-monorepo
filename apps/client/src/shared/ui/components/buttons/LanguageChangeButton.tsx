'use client';

import Image from 'next/image';
import langIcon from '~/shared/ui/assets/icons/language.svg';
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { i18nConfig, languages } from '~/shared/config/app/i18n.config';
import { usePathname, useRouter } from 'next/navigation';
import TextButton from '~/shared/ui/components/buttons/TextButton';
import { styled } from '@mui/material';

const StyledTextButton = styled(TextButton)({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '9px',
  fontSize: '16px',
  cursor: 'pointer'
});

export const LanguageChangeButton = () => {
  const { i18n } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const selectRef = useRef<HTMLSelectElement>(null);
  const locale = i18n.language;

  const handleChangeLang = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    const preparedPathname = pathname === '/' ? '' : pathname;
    if (locale === i18nConfig.defaultLocale)
      return router.push(`/${newLocale}` + preparedPathname);
    router.push(`/${newLocale}` + pathname.slice(3, preparedPathname.length));
  };

  return (
    <StyledTextButton onClick={() => selectRef.current?.showPicker()}>
      <Image src={langIcon} alt='lang' height={16} />
      <span>{languages[locale]}</span>

      <select
        className='visually-hidden left-[15%]'
        ref={selectRef}
        value={locale}
        onInput={handleChangeLang}
      >
        {Object.entries(languages).map(([key, value]) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </select>
    </StyledTextButton>
  );
};
