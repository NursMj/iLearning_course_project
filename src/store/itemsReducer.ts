import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchCollectionItems, fetchLatestItems, fetchOneItem } from '../http/itemApi'

export const getCollectionItems = createAsyncThunk(
  'items/getCollectionItems',
  async (id: number) => {
    const data = await fetchCollectionItems(id)
    return data
  }
)

export const getCurrentItem = createAsyncThunk(
  'items/getCurrentItem',
  async (id: number) => {
    const data = await fetchOneItem(id)
    return data
  }
)

export const getLatestItems = createAsyncThunk(
  'items/getLatestItems',
  async () => {
    const data = await fetchLatestItems()
    return data
  }
)

const itemsSlice = createSlice({
  name: 'items',
  initialState: {
    items: [],
    loading: false,
    error: null as any,
    currentItem: {},
    currentIsLoading: false,
    currentError: null as any,
    latestItems: [],
    latestIsLoading: false,
    latestError: null as any,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCollectionItems.pending, (state) => {
      state.loading = true
    })

    builder.addCase(getCollectionItems.fulfilled, (state, action) => {
      state.loading = false
      state.items = action.payload
    })

    builder.addCase(getCollectionItems.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })

    builder.addCase(getCurrentItem.pending, (state) => {
      state.currentIsLoading = true
    })

    builder.addCase(getCurrentItem.fulfilled, (state, action) => {
      state.currentIsLoading = false
      state.currentItem = action.payload
    })

    builder.addCase(getCurrentItem.rejected, (state, action) => {
      state.currentIsLoading = false
      state.currentError = action.error.message
    })

    builder.addCase(getLatestItems.pending, (state) => {
      state.latestIsLoading = true
    })

    builder.addCase(getLatestItems.fulfilled, (state, action) => {
      state.latestIsLoading = false
      state.latestItems = action.payload
    })

    builder.addCase(getLatestItems.rejected, (state, action) => {
      state.latestIsLoading = false
      state.latestError = action.error.message
    })
  },
})

export default itemsSlice.reducer
