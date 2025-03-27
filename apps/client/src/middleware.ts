import { i18nRouter } from 'next-i18n-router';
import { i18nConfig } from '~/shared/configs/i18n.config';
import { NextRequest, NextResponse } from 'next/server';
import authMiddleware from '~/features/auth/middleware/auth.middleware';
import ROUTES from '~/shared/constants/routes';
import { RedirectThrowable } from '~/shared/types/common.types';

export async function middleware(req: NextRequest) {
  try {
    let res = i18nRouter(req, i18nConfig);

    await authMiddleware(req, res);

    return res;
  } catch (err) {
    console.error(err);
    const checkRedirectThrowable = err && typeof err === 'object' && 'redirect' in err;
    const route = checkRedirectThrowable
      ? (err as RedirectThrowable).redirect
      : ROUTES.login;
    const redirectTo = new URL(route, req.url);
    return NextResponse.redirect(redirectTo);
  }
}

export const config = {
  matcher: '/((?!api|static|.*\\..*|_next).*)'
};
