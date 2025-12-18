import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IAgendaItem } from '../../types';

interface LiveMeetingState {
  currentMeetingId: string | null;
  currentAgendaItemId: string | null;
  currentAgendaItem: IAgendaItem | null;
  timerStatus: 'stopped' | 'running' | 'paused';
  elapsedTime: number;
}

const initialState: LiveMeetingState = {
  currentMeetingId: null,
  currentAgendaItemId: null,
  currentAgendaItem: null,
  timerStatus: 'stopped',
  elapsedTime: 0,
};

const meetingSlice = createSlice({
  name: 'liveMeeting',
  initialState,
  reducers: {
    startMeeting: (state, action: PayloadAction<string>) => {
      state.currentMeetingId = action.payload;
    },
  },
});

export const { startMeeting } = meetingSlice.actions;
export default meetingSlice.reducer;