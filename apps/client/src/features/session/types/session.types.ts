import { SessionPayloadDTO } from '../validations/session-payload.schema';

export interface ISessionStore {
  isAuthorized: boolean;
  payload: SessionPayloadDTO | null;
}
