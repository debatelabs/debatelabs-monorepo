import { configureStore } from '@reduxjs/toolkit';
import sessionSliceReducer from '~/app/store/redux/slices/session.store';

export const store = configureStore({
  reducer: {
    session: sessionSliceReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
