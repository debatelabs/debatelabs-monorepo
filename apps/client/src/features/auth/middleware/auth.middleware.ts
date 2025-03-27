'use server';

import { NextRequest, NextResponse } from 'next/server';
import ROUTES, { AUTH_ROUTES, PUBLIC_ROUTES } from '~/shared/constants/routes';
import { checkToken } from '~/features/auth/actions/token.actions';
import { RedirectThrowable } from '~/shared/types/common.types';

export default async function authMiddleware(req: NextRequest, res: NextResponse) {
  const pathname = req.nextUrl.pathname;
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
  const isAuthRoute = AUTH_ROUTES.includes(pathname);

  if (isPublicRoute) return;

  const isValidAccessToken = await checkToken({
    tokenName: 'accessToken',
    req,
    res,
    isAuthRoute
  });
  if (isValidAccessToken) return;

  const isValidRefreshToken = await checkToken({
    tokenName: 'refreshToken',
    req,
    res,
    isAuthRoute
  });
  if (isValidRefreshToken) return;

  if (isAuthRoute) return;
  throw { redirect: ROUTES.login } as RedirectThrowable;
}
