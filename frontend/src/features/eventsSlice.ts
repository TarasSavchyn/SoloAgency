import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ServerErrorResponse } from '../types/ServerErrorResponse';
import { Event, PreparedEventRequestData } from '../types/Event';
import { parseErrors } from '../helpers/parseErrors';
import { addEventRequest, getEvents } from '../api/events';

export type EventsState = {
  event: Event | null;
  isEventRequestInProgress: boolean;
  eventRequestErrors: ServerErrorResponse | null;
  events: Event[] | null;
  areEventsLoading: boolean;
  eventsErrors: ServerErrorResponse | null;
};

const initialState: EventsState = {
  event: null,
  isEventRequestInProgress: false,
  eventRequestErrors: null,
  events: null,
  areEventsLoading: false,
  eventsErrors: null,
};

export const add = createAsyncThunk(
  'add/events',
  async (data: PreparedEventRequestData) => {
    const response = await addEventRequest(data);

    return response;
  },
);

export const init = createAsyncThunk('fetch/events', async () => {
  const response = await getEvents();

  return response;
});

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    clearEventRequestData: state => {
      state.event = null;
      state.eventRequestErrors = null;
    },
  },

  extraReducers: builder => {
    builder.addCase(add.pending, state => {
      state.isEventRequestInProgress = true;
    });

    builder.addCase(add.fulfilled, (state, action) => {
      state.isEventRequestInProgress = false;
      state.event = action.payload;
    });

    builder.addCase(add.rejected, (state, action) => {
      state.isEventRequestInProgress = false;
      state.eventRequestErrors = parseErrors(action.error.message);
    });

    builder.addCase(init.pending, state => {
      state.areEventsLoading = true;
      state.eventsErrors = null;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.areEventsLoading = false;
      state.events = action.payload;
    });

    builder.addCase(init.rejected, (state, action) => {
      state.areEventsLoading = false;
      state.eventsErrors = parseErrors(action.error.message);
    });
  },
});

export const { clearEventRequestData } = eventsSlice.actions;
export default eventsSlice.reducer;
