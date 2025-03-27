'use server';

import sessionMapper from '~/infrastructure/mappers/session.mapper';
import { NextResponse } from 'next/server';
import { sessionCookie } from '~/shared/constants/cookies';
import { cookies } from 'next/headers';
import { createService } from '~/shared/utils/create-service';
import SessionPayloadSchema, {
  SessionPayloadSchemaType
} from '~/infrastructure/validations/session-payload.schema';

export async function setJwtPayloadToCookie(
  accessTokenPayload: SessionPayloadSchemaType,
  res: NextResponse
) {
  const sessionPayloadDTO = sessionMapper.toPayloadDTO(accessTokenPayload);
  res.cookies.set(
    sessionCookie.name,
    JSON.stringify(sessionPayloadDTO),
    sessionCookie.options
  );
}

export const getJwtPayloadFromCookie = createService({
  fn: async () => {
    const cookieStore = await cookies();
    const sessionCookieValue = cookieStore.get(sessionCookie.name);
    if (!sessionCookieValue) throw new Error('Session cookie not found');
    const payload = JSON.parse(sessionCookieValue.value) as unknown;
    const validPayload = SessionPayloadSchema.parse(payload);
    return sessionMapper.toPayloadDTO(validPayload);
  },
  log: false
});
