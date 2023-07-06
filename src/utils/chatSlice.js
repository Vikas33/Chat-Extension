import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import DEMO_API from './constants';

export const getReply = createAsyncThunk('getReply', async (message) => {
  const requestAnswer = {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({
      message: message,
    }),
  };

  const data = await fetch(DEMO_API, requestAnswer);
  const json = await data.json();
  return {
    message: json.message,
    from: 'bot',
  };
});

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    chat: [],
    loading: false,
  },
  reducers: {
    updateChat: (state, action) => {
      state.chat = [...state.chat, action.payload];
      state.loading = true;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getReply.fulfilled, (state, action) => {
      state.chat = [...state.chat, action.payload];
      state.loading = false;
      return state;
    });
  },
});

export const { updateChat } = chatSlice.actions;

export default chatSlice.reducer;
