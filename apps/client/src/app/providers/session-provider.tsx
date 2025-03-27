'use client';

import React, { useLayoutEffect } from 'react';
import { useAppDispatch } from '~/app/hooks/useRedux';
import { fetchSession } from '~/app/store/redux/slices/session.store';

export default function SessionProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    dispatch(fetchSession());
  }, [dispatch]);

  return children;
}
