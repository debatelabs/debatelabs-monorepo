'use client';

import React, { useLayoutEffect } from 'react';
import { useAppDispatch } from '~/core/hooks/useRedux';
import { getSession } from '~/features/session';

export default function SessionProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    dispatch(getSession());
  }, [dispatch]);

  return children;
}
