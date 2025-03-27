'use client';

import React, { useLayoutEffect } from 'react';
import { useAppDispatch } from '~/core/hooks/useRedux';
import { fetchSession } from '~/features/session';

export default function SessionProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    dispatch(fetchSession());
  }, [dispatch]);

  return children;
}
