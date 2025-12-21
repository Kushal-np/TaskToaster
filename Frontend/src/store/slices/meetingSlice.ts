// src/store/slices/meetingSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IAgendaItem as IAgendaItemOriginal } from '../../types/agenda.types';
import type { IAgendaItem as IMeetingAgendaItem } from '../../types/meeting.types';

// Convert meeting agenda item to store agenda item type
const mapAgendaItem = (item: IMeetingAgendaItem): IAgendaItemOriginal => ({
  ...item,
  assignedTo: typeof item.assignedTo === 'string'
    ? item.assignedTo
    : item.assignedTo?.name || 'Unassigned', // Always string for RoleDisplay and slice
});

export interface IAgendaItem extends IAgendaItemOriginal {}

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
    setCurrentAgendaItem: (state, action: PayloadAction<IMeetingAgendaItem>) => {
      const mapped = mapAgendaItem(action.payload);
      state.currentAgendaItem = mapped;
      state.currentAgendaItemId = mapped._id;
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
