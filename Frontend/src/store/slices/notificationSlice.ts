import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface Notification {
  id: string;
  message: string;
  type: 'info' | 'success' | 'error';
  read: boolean;
}

interface NotificationState {
  notifications: Notification[];
}

const initialState: NotificationState = {
  notifications: [],
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Omit<Notification, 'id' | 'read'>>) => {
      state.notifications.unshift({ ...action.payload, id: new Date().toISOString(), read: false });
    },
  },
});

export const { addNotification } = notificationSlice.actions;
export default notificationSlice.reducer;