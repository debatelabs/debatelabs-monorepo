'use server';

import { NextRequest, NextResponse } from 'next/server';
import ROUTES, { AUTH_ROUTES, PUBLIC_ROUTES } from '~/core/constants/routes';
import { checkToken } from '~/infrastructure/services/token.actions';
import { RedirectThrowable } from '~/core/types/common.types';
import COOKIES from '~/core/constants/cookies';

export default async function authMiddleware(req: NextRequest, res: NextResponse) {
  const pathname = req.nextUrl.pathname;
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
  const isAuthRoute = AUTH_ROUTES.includes(pathname);

  if (isPublicRoute) return;

  const isValidAccessToken = await checkToken({
    tokenName: COOKIES.accessToken,
    req,
    isAuthRoute
  });
  if (isValidAccessToken) return;

  const isValidRefreshToken = await checkToken({
    tokenName: COOKIES.refreshToken,
    req,
    isAuthRoute
  });
  if (isValidRefreshToken) return;

  res.cookies.delete(COOKIES.accessToken);
  res.cookies.delete(COOKIES.refreshToken);

  if (isAuthRoute) return;
  throw { redirect: ROUTES.login } as RedirectThrowable;
}
