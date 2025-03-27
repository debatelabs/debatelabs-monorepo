'use server';

import { cookies } from 'next/headers';
import { createService } from '~/core/utils/create-service';
import SessionPayloadSchema, {
  SessionPayloadDTO
} from '../validations/session-payload.schema';
import * as jose from 'jose';

export const getJwtPayloadFromCookie = createService({
  fn: async () => {
    const cookieStore = await cookies();
    const sessionCookieValue = cookieStore.get('accessToken');
    if (!sessionCookieValue) throw new Error('Access token cookie not found');
    const payload = jose.decodeJwt<SessionPayloadDTO>(sessionCookieValue.value);
    return SessionPayloadSchema.parse(payload);
  },
  log: false
});
