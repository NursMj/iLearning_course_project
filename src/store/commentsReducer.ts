import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchItemComments } from '../http/commentApi'

export const getItemComments = createAsyncThunk(
  'items/getItemComments',
  async (id: number) => {
    const data = await fetchItemComments(id)
    return data
  }
)

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    comments: {
      data: [],
      loading: false,
      error: null as any,
    }
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getItemComments.pending, (state) => {
      state.comments.loading = true
    })

    builder.addCase(getItemComments.fulfilled, (state, action) => {
      state.comments.loading = false
      state.comments.data = action.payload
    })

    builder.addCase(getItemComments.rejected, (state, action) => {
      state.comments.loading = false
      state.comments.error = action.error.message
    })
  },
})

export default commentsSlice.reducer
