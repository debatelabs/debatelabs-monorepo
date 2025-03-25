'use server';

import SessionMapper from '~/infrastructure/mappers/session.mapper';
import { NextResponse } from 'next/server';
import { sessionCookie } from '~/core/constants/cookies';
import { cookies } from 'next/headers';
import { tryCatch } from '~/infrastructure/utils/try-catch-decorator';
import SessionPayloadSchema, {
  SessionPayloadSchemaType
} from '~/infrastructure/validations/session-payload.schema';
import applicationMapper from '~/infrastructure/mappers/application.mapper';

export async function setJwtPayloadToCookie(
  accessTokenPayload: SessionPayloadSchemaType,
  res: NextResponse
) {
  const sessionMapper = new SessionMapper();
  const sessionPayloadDTO = sessionMapper.toPayloadDTO(accessTokenPayload);
  res.cookies.set(
    sessionCookie.name,
    JSON.stringify(sessionPayloadDTO),
    sessionCookie.options
  );
}

export const getJwtPayloadFromCookie = tryCatch(
  async () => {
    const cookieStore = await cookies();
    const sessionCookieValue = cookieStore.get(sessionCookie.name);
    if (!sessionCookieValue) throw new Error('Session cookie not found');
    const payload = JSON.parse(sessionCookieValue.value) as unknown;
    const validPayload = SessionPayloadSchema.parse(payload);
    const sessionMapper = new SessionMapper();
    const sessionPayloadDTO = sessionMapper.toPayloadDTO(validPayload);
    return applicationMapper.toSuccessDTO(sessionPayloadDTO);
  },
  { log: false }
);
