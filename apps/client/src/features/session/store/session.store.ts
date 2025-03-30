import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getSessionPayloadFromCookie } from '../services/session.actions';
import { ISessionStore } from '~/features/session/types/session.types';
import { SessionPayloadDTO } from '~/infrastructure/validations/session-payload.schema';

export const getSession = createAsyncThunk('session/getSession', () => {
  return getSessionPayloadFromCookie();
});

const initialState: ISessionStore = {
  isAuthorized: false,
  payload: null
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setSession: (
      state: ISessionStore,
      { payload }: PayloadAction<SessionPayloadDTO | null>
    ) => {
      state.isAuthorized = payload !== null;
      state.payload = payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getSession.fulfilled, (state, action) => {
      state.isAuthorized = action.payload.success;
      state.payload = action.payload.success ? action.payload.data : null;
    });
    builder.addCase(getSession.rejected, (state, action) => {
      console.error(action.error);
      state.isAuthorized = false;
      state.payload = null;
    });
  }
});

export const { setSession } = sessionSlice.actions;

export default sessionSlice.reducer;
