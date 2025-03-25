export interface SessionPayloadDTO {
  id: number;
  name: string;
}

export interface ISessionStore {
  isAuthorized: boolean;
  payload: SessionPayloadDTO | null;
}
