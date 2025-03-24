import { i18nRouter } from 'next-i18n-router';
import { i18nConfig } from '~/core/configs/i18n.config';
import { NextRequest, NextResponse } from 'next/server';
import authMiddleware from '~/features/auth/middleware/auth.middleware';
import ROUTES from '~/core/constants/routes';

export async function middleware(req: NextRequest) {
  try {
    let res = NextResponse.next();

    await authMiddleware(req, res);

    res = i18nRouter(req, i18nConfig);

    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.redirect(new URL(ROUTES.login, req.url));
  }
}

export const config = {
  matcher: '/((?!api|static|.*\\..*|_next).*)'
};
