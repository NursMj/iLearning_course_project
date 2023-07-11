import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchCollections, fetchOneCollection } from '../http/collectionApi'

export const fetchData = createAsyncThunk('collections/fetchData', async () => {
  const data = await fetchCollections()
  return data
})

export const fetchCurrent = createAsyncThunk(
  'collections/fetchCurrent',
  async (id: number) => {
    const data = await fetchOneCollection(id)
    return (data)
  }
)

const collectionsSlice = createSlice({
  name: 'collections',
  initialState: {
    collections: [],
    loading: false,
    error: null as any,
    currentCollection: {},
    currentIsLoading: false,
    currentError: null as any,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.loading = true
    })

    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.loading = false
      state.collections = action.payload.rows
    })

    builder.addCase(fetchData.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })

    builder.addCase(fetchCurrent.pending, (state) => {
      state.currentIsLoading = true
    })

    builder.addCase(fetchCurrent.fulfilled, (state, action) => {
      state.currentIsLoading = false
      state.currentCollection = action.payload
    })

    builder.addCase(fetchCurrent.rejected, (state, action) => {
      state.currentIsLoading = false
      state.currentError = action.error.message
    })
  },
})

export default collectionsSlice.reducer
