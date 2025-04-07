import { SessionPayloadDTO } from '~/features/session/validations/session-payload.schema';

export interface ISessionStore {
  isAuthorized: boolean;
  payload: SessionPayloadDTO | null;
}
