'use server';

import envConfig from '~/core/configs/env.config';
import * as jose from 'jose';
import ROUTES from '~/core/constants/routes';
import { RedirectThrowable } from '~/core/types/common.types';
import { NextRequest, NextResponse } from 'next/server';

export async function validateToken(token: string | undefined) {
  try {
    if (!token) throw new Error('Token is undefined');
    const jwtSecretEncoded = new TextEncoder().encode(envConfig.JWT_SECRET);
    const { payload } = await jose.jwtVerify(token, jwtSecretEncoded, {
      algorithms: ['HS256']
    });
    return payload;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export const checkToken = async ({
  tokenName,
  req,
  res,
  isAuthRoute
}: {
  tokenName: string;
  req: NextRequest;
  res: NextResponse;
  isAuthRoute: boolean;
}) => {
  const token = req.cookies.get(tokenName)?.value;
  const tokenPayload = await validateToken(token);
  if (tokenPayload === null) {
    res.cookies.delete(tokenName);
    return false;
  }
  if (isAuthRoute) throw { redirect: ROUTES.home } as RedirectThrowable;
  return true;
};
