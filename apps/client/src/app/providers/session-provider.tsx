'use client';

import { usePathname } from 'next/navigation';
import React, { useLayoutEffect, useEffect } from 'react';
import { useAppDispatch } from '~/shared/model/hooks/useRedux';
import { getSession, initializeSessionEvents } from '~/features/session';

export default function SessionProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  useEffect(() => {
    initializeSessionEvents();
  }, []);

  useLayoutEffect(() => {
    dispatch(getSession());
  }, [dispatch, pathname]);

  return children;
}
