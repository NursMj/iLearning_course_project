import darkModeReducer from './darkModeReducer'
import userReducer from './userReducer'
import collectionsReducer from './collectionsReducer'
import topicsReducer from './topicsReducer'
import { configureStore } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const persistedDarkModeReducer = persistReducer(persistConfig, darkModeReducer)

export const store = configureStore({
  reducer: {
    darkMode: persistedDarkModeReducer,
    user: userReducer,
    topics: topicsReducer,
    collections: collectionsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export let persistor = persistStore(store)
