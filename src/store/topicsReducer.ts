import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchTopics } from '../http/topicsApi'

export const getTopics = createAsyncThunk(
  'topics/getTopics',
  async () => {
    const data = await fetchTopics()
    return data
  }
)

const topicSlice = createSlice({
  name: 'topics',
  initialState: {
    topics: {
      data: [],
      isLoading: false,
      error: null as any,
    }
  },
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(getTopics.pending, (state) => {
      state.topics.isLoading = true
    })

    builder.addCase(getTopics.fulfilled, (state, action) => {
      state.topics.isLoading = false
      state.topics.data = action.payload
    })

    builder.addCase(getTopics.rejected, (state, action) => {
      state.topics.isLoading = false
      state.topics.error = action.error.message
    })
  },
})

export default topicSlice.reducer