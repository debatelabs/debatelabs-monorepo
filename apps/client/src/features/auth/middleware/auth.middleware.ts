'use server';

import { NextRequest, NextResponse } from 'next/server';
import ROUTES, { AUTH_ROUTES, PUBLIC_ROUTES } from '~/core/constants/routes';
import { checkToken } from '~/infrastructure/services/token.actions';
import { RedirectThrowable } from '~/core/types/common.types';
import COOKIES from '~/core/constants/cookies';
import { i18nConfig } from '~/core/configs/i18n.config';

function getPathname(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const locale = pathname.slice(1, 3) as (typeof i18nConfig.locales)[number];
  const isLocale = i18nConfig.locales.includes(locale);
  return isLocale ? pathname.slice(3) : pathname;
}

export default async function authMiddleware(req: NextRequest, res: NextResponse) {
  const pathname = getPathname(req);
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
