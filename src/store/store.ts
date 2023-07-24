import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userReducer'
import collectionsReducer from './collectionsReducer'
import itemsReducer from './itemsReducer'
import topicsReducer from './topicsReducer'
import tagReducer from './tagReducer'
import commentsReducer from './commentsReducer'
import searchResultsReducer from './searchResultsReducer'
import dataViewReducer from './dataViewReducer'

const store = configureStore({
  reducer: {
    user: userReducer,
    topics: topicsReducer,
    collections: collectionsReducer,
    items: itemsReducer,
    tags: tagReducer,
    comments: commentsReducer,
    searchResults: searchResultsReducer,
    dataView: dataViewReducer,
  },
})

export { store }
