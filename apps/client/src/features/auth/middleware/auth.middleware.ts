'use server';

import { NextRequest, NextResponse } from 'next/server';
import ROUTES, { AUTH_ROUTES, PUBLIC_ROUTES } from '~/shared/config/constants/routes';
import { checkToken } from '~/shared/model/services/token.actions';
import { RedirectThrowable } from '~/shared/model/types/common.types';
import COOKIES from '~/shared/config/constants/cookies';
import getPathnameWithoutLocale from '~/shared/lib/utils/get-pathname-without-locale';

export default async function authMiddleware(req: NextRequest, res: NextResponse) {
  const pathname = getPathnameWithoutLocale(req.nextUrl.pathname);
  const isPublicRoute = Object.values(PUBLIC_ROUTES).includes(pathname);
  const isAuthRoute = Object.values(AUTH_ROUTES).includes(pathname);

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
