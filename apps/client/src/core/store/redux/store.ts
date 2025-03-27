import { configureStore } from '@reduxjs/toolkit';
import sessionSliceReducer from '~/features/session/store/session.store';

export const store = configureStore({
  reducer: {
    session: sessionSliceReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
