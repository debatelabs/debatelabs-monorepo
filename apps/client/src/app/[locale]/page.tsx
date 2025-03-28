'use client';

import { useTranslation } from 'react-i18next';
import apiClient from '~/core/lib/api-client';
import ContainedButton from '~/core/components/buttons/ContainedButton';
import { useAppSelector } from '~/core/hooks/useRedux';
import { useEffect } from 'react';

export default function Home() {
  const { t } = useTranslation();
  const { payload } = useAppSelector((state) => state.session);

  async function getUser() {
    try {
      console.log(payload);
      const res = await apiClient.get('/user/profile');
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    console.log(payload);
  }, [payload]);

  return (
    <div>
      <ContainedButton onClick={getUser}>{t('common.welcome')}</ContainedButton>
    </div>
  );
}
