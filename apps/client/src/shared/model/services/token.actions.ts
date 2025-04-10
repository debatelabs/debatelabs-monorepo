'use server';

import envConfig from '~/shared/config/app/env.config';
import * as jose from 'jose';
import ROUTES from '~/shared/config/constants/routes';
import { RedirectThrowable } from '~/shared/model/types/common.types';
import { NextRequest } from 'next/server';
import ERRORS from '~/shared/config/constants/errors';
import { IAccessToken } from '~/shared/model/types/token.types';

export async function validateToken(token: string | undefined) {
  try {
    if (!token) throw new Error(ERRORS.undefinedToken);
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
  isAuthRoute
}: {
  tokenName: string;
  req: NextRequest;
  isAuthRoute: boolean;
}) => {
  const token = req.cookies.get(tokenName)?.value;
  const tokenPayload = await validateToken(token);
  if (tokenPayload === null) return false;
  if (isAuthRoute) throw { redirect: ROUTES.home } as RedirectThrowable;
  return true;
};

export const decodeToken = async (token: string | undefined) => {
  if (!token) throw new Error(ERRORS.undefinedToken);
  return jose.decodeJwt<IAccessToken>(token);
};
