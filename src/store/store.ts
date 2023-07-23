import { configureStore } from '@reduxjs/toolkit'
import darkModeReducer from './darkModeReducer'
import userReducer from './userReducer'
import collectionsReducer from './collectionsReducer'
import itemsReducer from './itemsReducer'
import topicsReducer from './topicsReducer'
import tagReducer from './tagReducer'
import commentsReducer from './commentsReducer'
import searchResultsReducer from './searchResultsReducer'

const store = configureStore({
  reducer: {
    darkMode: darkModeReducer,
    user: userReducer,
    topics: topicsReducer,
    collections: collectionsReducer,
    items: itemsReducer,
    tags: tagReducer,
    comments: commentsReducer,
    searchResults: searchResultsReducer,
  },
})

export { store }
