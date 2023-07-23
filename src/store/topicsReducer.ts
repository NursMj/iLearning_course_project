import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { deleteTopic, fetchTopics } from '../http/topicsApi'
import { showSuccessToast } from '../utils/showToest'

export const getTopics = createAsyncThunk(
  'topics/getTopics',
  async () => {
    const data = await fetchTopics()
    return data
  }
)

export const removeTopic = createAsyncThunk(
  'topics/removeTopic',
  async (id: number) => {
    const res = await deleteTopic(id)
    return res
  }
)

const topicSlice = createSlice({
  name: 'topics',
  initialState: {
    topics: {
      data: [],
      isLoading: false,
      error: null as any,
    },
    topicDelete: {
      isLoading: false,
      error: null as any,
    },
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

    builder.addCase(removeTopic.pending, (state) => {
      state.topicDelete.isLoading = true
    })

    builder.addCase(removeTopic.fulfilled, (state, action) => {
      state.topicDelete.isLoading = false
      showSuccessToast(action.payload.message)
    })

    builder.addCase(removeTopic.rejected, (state, action) => {
      state.topicDelete.isLoading = false
      state.topicDelete.error = action.error.message
    })
  },
})

export default topicSlice.reducer