import { createSlice } from '@reduxjs/toolkit'

const topicSlice = createSlice({
  name: 'topics',
  initialState: {
    topics: [
      { id: 1, title: 'shoes' },
      { id: 2, title: 'books' },
      { id: 3, title: 'cups' },
    ],
  },
  reducers: {
    setTopics: (state, action) => {
      state.topics = action.payload.topics
    },
  },
})

export const { setTopics } = topicSlice.actions
export default topicSlice.reducer
