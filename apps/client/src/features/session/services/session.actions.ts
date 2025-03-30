'use server';

import { cookies } from 'next/headers';
import { createService } from '~/core/utils/create-service';
import SessionPayloadSchema from '~/infrastructure/validations/session-payload.schema';
import { decodeToken } from '~/infrastructure/services/token.actions';
import ERRORS from '~/core/constants/errors';
import COOKIES from '~/core/constants/cookies';
import { store } from '~/core/store/redux/store';
import { setSession } from '../store/session.store';
import logger from '~/core/utils/logger';

export const getSessionPayloadFromCookie = createService({
  fn: async () => {
    const cookieStore = await cookies();
    const sessionCookieValue = cookieStore.get(COOKIES.accessToken);
    if (!sessionCookieValue) throw new Error(ERRORS.cookieNotFound(COOKIES.accessToken));
    const payload = await decodeToken(sessionCookieValue.value);
    console.log(payload);
    return SessionPayloadSchema.parse(payload);
  },
  log: false
});

export const logout = async () => {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(COOKIES.accessToken);
    cookieStore.delete(COOKIES.refreshToken);
    store.dispatch(setSession(null));
  } catch (err) {
    logger.error(err);
  }
};
