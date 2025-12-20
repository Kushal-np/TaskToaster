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
    setCurrentAgendaItem: (state, action: PayloadAction<IAgendaItem>) => {
      state.currentAgendaItem = action.payload;
      state.currentAgendaItemId = action.payload._id;
    },
    startTimer: (state) => {
      state.timerStatus = 'running';
    },
    pauseTimer: (state) => {
      state.timerStatus = 'paused';
    },
    stopTimer: (state) => {
      state.timerStatus = 'stopped';
      state.elapsedTime = 0;
    },
    updateElapsedTime: (state, action: PayloadAction<number>) => {
      state.elapsedTime = action.payload;
    },
  },
});

export const { 
  startMeeting, 
  setCurrentAgendaItem, 
  startTimer, 
  pauseTimer, 
  stopTimer, 
  updateElapsedTime 
} = meetingSlice.actions;

export default meetingSlice.reducer;