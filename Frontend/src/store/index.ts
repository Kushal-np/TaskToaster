import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import authReducer from './slices/authSlice';
import uiReducer from './slices/uiSlice';
import meetingReducer from './slices/meetingSlice';
import notificationReducer from './slices/notificationSlice';

// This assumes an RTK Query API slice will be created later.
// For now, it's a placeholder.
// import { baseApi } from './api/baseApi';

export const store = configureStore({
  reducer: {
    // [baseApi.reducerPath]: baseApi.reducer,
    auth: authReducer,
    ui: uiReducer,
    liveMeeting: meetingReducer,
    notifications: notificationReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
});

// setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;