'use server';

import { cookies } from 'next/headers';
import { createService } from '~/shared/lib/utils/create-service';
import SessionPayloadSchema from '~/features/session/validations/session-payload.schema';
import { decodeToken } from '~/shared/model/services/token.actions';
import ERRORS from '~/shared/config/constants/errors';
import COOKIES from '~/shared/config/constants/cookies';
import { store } from '~/shared/model/store/redux/store';
import { setSession } from '../store/session.store';
import logger from '~/shared/lib/utils/logger';

export const getSessionPayloadFromCookie = createService({
  fn: async () => {
    const cookieStore = await cookies();
    const sessionCookieValue = cookieStore.get(COOKIES.accessToken);
    if (!sessionCookieValue) throw new Error(ERRORS.cookieNotFound(COOKIES.accessToken));
    const payload = await decodeToken(sessionCookieValue.value);
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
