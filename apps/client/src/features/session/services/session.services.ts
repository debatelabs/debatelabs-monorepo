import { createService } from '~/core/utils/create-service';
import sessionApi from '../api/session.api';
import { decodeToken } from '~/infrastructure/services/token.actions';
import SessionPayloadSchema from '~/infrastructure/validations/session-payload.schema';
import { setSession } from '../store/session.store';
import { logout } from './session.actions';

export const refreshSession = async () => {
  const updateToken = createService({
    fn: async () => {
      const response = await sessionApi.refresh();
      const payload = await decodeToken(response.data.accessToken);
      return SessionPayloadSchema.parse(payload);
    },
    errorFn: async () => {
      await logout();
    }
  });
  const response = await updateToken();
  setSession(response.data);
  return response;
};
