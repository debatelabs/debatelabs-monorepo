import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getJwtPayloadFromCookie } from '~/infrastructure/actions/session.actions';
import { ISessionStore } from '~/shared/types/session.types';

export const fetchSession = createAsyncThunk('session/fetchSession', async () => {
  const sessionPayloadDTO = await getJwtPayloadFromCookie();
  return sessionPayloadDTO;
});

const initialState: ISessionStore = {
  isAuthorized: false,
  payload: null
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSession.fulfilled, (state, action) => {
      state.isAuthorized = action.payload.success;
      state.payload = action.payload.success ? action.payload.data : null;
    });
    builder.addCase(fetchSession.rejected, (state, action) => {
      console.error('Failed to fetch session:', action.error);
      state.isAuthorized = false;
      state.payload = null;
    });
  }
});

export default sessionSlice.reducer;
