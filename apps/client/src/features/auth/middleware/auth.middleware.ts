'use server';

import { NextRequest, NextResponse } from 'next/server';
import { PUBLIC_ROUTES } from '~/shared/constants/routes';
import * as tokenService from '~/features/auth/actions/token.actions';
import { setJwtPayloadToCookie } from '~/infrastructure/actions/session.actions';

export default async function authMiddleware(req: NextRequest, res: NextResponse) {
  const pathname = req.nextUrl.pathname;
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  if (isPublicRoute) return;

  const accessTokenPayload = await tokenService.verifyAccessTokenFromCookie(req);
  if (accessTokenPayload !== null)
    return await setJwtPayloadToCookie(accessTokenPayload, res);

  req.cookies.delete('accessToken');

  const refreshTokenPayload = await tokenService.verifyRefreshTokenFromCookie(req);
  if (refreshTokenPayload !== null) return;

  req.cookies.delete('refreshToken');

  throw new Error('Not Authorized');
}
