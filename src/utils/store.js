import { configureStore } from '@reduxjs/toolkit';
import chatSlice from './chatSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, chatSlice);

export const store = configureStore({
  reducer: {
    chat: persistedReducer,
  },
});

export const persistor = persistStore(store);
