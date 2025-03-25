'use server';

import envConfig from '~/core/configs/env.config';
import * as jose from 'jose';
import { SessionPayloadSchemaType } from '~/infrastructure/validations/session-payload.schema';
import { NextRequest } from 'next/server';

export async function validateToken(token: string | undefined) {
  try {
    if (!token) throw new Error('Token is undefined');
    const jwtSecretEncoded = new TextEncoder().encode(envConfig.JWT_SECRET);
    const { payload } = await jose.jwtVerify<SessionPayloadSchemaType>(
      token,
      jwtSecretEncoded
    );
    return payload as SessionPayloadSchemaType;
  } catch (err) {
    return null;
  }
}

export async function verifyAccessTokenFromCookie(req: NextRequest) {
  const accessToken = req.cookies.get('accessToken')?.value;
  return validateToken(accessToken);
}

export async function verifyRefreshTokenFromCookie(req: NextRequest) {
  const refreshToken = req.cookies.get('refreshToken')?.value;
  return validateToken(refreshToken);
}
