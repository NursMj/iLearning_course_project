import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchTags } from '../http/tagApi'

export const getTags = createAsyncThunk(
  'items/getTags',
  async () => {
    const data = await fetchTags()
    return data
  }
)

const tagsSlice = createSlice({
  name: 'tags',
  initialState: {
    tags: {
      data: [],
      isLoading: false,
      error: null as any,
    }
  },
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(getTags.pending, (state) => {
      state.tags.isLoading = true
    })

    builder.addCase(getTags.fulfilled, (state, action) => {
      state.tags.isLoading = false
      state.tags.data = action.payload
    })

    builder.addCase(getTags.rejected, (state, action) => {
      state.tags.isLoading = false
      state.tags.error = action.error.message
    })
  },
})

export default tagsSlice.reducer