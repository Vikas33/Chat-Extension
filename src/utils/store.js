import { configureStore } from '@reduxjs/toolkit';
import chatSlice from './chatSlice';

const store = configureStore({
  reducer: {
    chat: chatSlice,
  },
});
store.subscribe(() => {
  const { chat } = store.getState().chat;
  localStorage.setItem('chat', JSON.stringify(chat));
});
export default store;
