'use client';

import { usePathname } from 'next/navigation';
import React, { useLayoutEffect } from 'react';
import { useAppDispatch } from '~/core/hooks/useRedux';
import { getSession } from '~/features/session';

export default function SessionProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  useLayoutEffect(() => {
    dispatch(getSession());
  }, [dispatch, pathname]);

  return children;
}
