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
import darkModeReducer from './darkModeReducer'
import userReducer from './userReducer'
import collectionsReducer from './collectionsReducer'
import itemsReducer from './itemsReducer'
import topicsReducer from './topicsReducer'
import tagReducer from './tagReducer'
import commentsReducer from './commentsReducer'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const persistedDarkModeReducer = persistReducer(persistConfig, darkModeReducer)

const store = configureStore({
  reducer: {
    darkMode: persistedDarkModeReducer,
    user: userReducer,
    topics: topicsReducer,
    collections: collectionsReducer,
    items: itemsReducer,
    tags: tagReducer,
    comments: commentsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export let persistor = persistStore(store)
export { store }
