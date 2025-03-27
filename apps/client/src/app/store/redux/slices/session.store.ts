import { createSlice } from '@reduxjs/toolkit';
import { ISessionStore } from '~/shared/types/session.types';
import { getJwtPayloadFromCookie } from '~/infrastructure/actions/session.actions';

async function getInitialState(): Promise<ISessionStore> {
  const sessionPayloadDTO = await getJwtPayloadFromCookie();
  return {
    isAuthorized: sessionPayloadDTO.success,
    payload: sessionPayloadDTO.success ? sessionPayloadDTO.data : null
  };
}

const sessionSlice = createSlice({
  name: 'session',
  initialState: getInitialState,
  reducers: {}
});

const sessionSliceReducer = sessionSlice.reducer;
export default sessionSliceReducer;
