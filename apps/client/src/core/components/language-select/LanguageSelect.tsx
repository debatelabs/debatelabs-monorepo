'use client';

import Image from 'next/image';
import langIcon from '~/app/assets/icons/language.svg';
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { i18nConfig, languages } from '~/core/configs/i18n.config';
import { usePathname, useRouter } from 'next/navigation';

export const LanguageSelect = () => {
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
    <div
      className='relative flex-center gap-2 text-base cursor-pointer px-6 py-2.5 hover:bg-dark-highlight rounded-full'
      onClick={() => selectRef.current?.showPicker()}
    >
      <Image src={langIcon} alt='lang' height={16} />
      <span>{languages[locale]}</span>

      <select
        className='visually-hidden left-[20%]'
        ref={selectRef}
        defaultValue={locale}
        onInput={handleChangeLang}
      >
        {Object.entries(languages).map(([key, value]) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
};
