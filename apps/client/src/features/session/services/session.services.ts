import { createService } from '~/shared/lib/utils/create-service';
import sessionApi from '../api/session.api';
import { decodeToken } from '~/shared/model/services/token.actions';
import SessionPayloadSchema, {
  SessionPayloadDTO
} from '~/features/session/validations/session-payload.schema';
import { setSession } from '../store/session.store';
import { logout } from './session.actions';
import ROUTES from '~/shared/config/constants/routes';
import checkEnvAndRedirectTo from '~/shared/lib/utils/env-based-redirect';
import { BaseDTO } from '~/shared/model/types/application.types';

export const refreshSession = async (): Promise<BaseDTO<SessionPayloadDTO | null>> => {
  const updateToken = createService({
    fn: async () => {
      const response = await sessionApi.refresh();
      const payload = await decodeToken(response.data.accessToken);
      return SessionPayloadSchema.parse(payload);
    },
    errorFn: async () => {
      await logout();
      await checkEnvAndRedirectTo(ROUTES.login);
    }
  });
  const response = await updateToken();
  setSession(response.data);
  return response;
};
