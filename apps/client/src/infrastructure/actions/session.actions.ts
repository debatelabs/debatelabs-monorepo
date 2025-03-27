'use server';

import sessionMapper from '~/infrastructure/mappers/session.mapper';
import { cookies } from 'next/headers';
import { createService } from '~/shared/utils/create-service';
import SessionPayloadSchema, {
  SessionPayloadSchemaType
} from '~/infrastructure/validations/session-payload.schema';
import * as jose from 'jose';

export const getJwtPayloadFromCookie = createService({
  fn: async () => {
    const cookieStore = await cookies();
    const sessionCookieValue = cookieStore.get('accessToken');
    if (!sessionCookieValue) throw new Error('Access token cookie not found');
    const payload = jose.decodeJwt<SessionPayloadSchemaType>(sessionCookieValue.value);
    const validPayload = SessionPayloadSchema.parse(payload);
    return sessionMapper.toPayloadDTO(validPayload);
  },
  log: false
});
