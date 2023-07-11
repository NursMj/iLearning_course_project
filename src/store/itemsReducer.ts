import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchItems, fetchOneItem } from '../http/itemApi'

export const fetchAllItems = createAsyncThunk('items/fetchAllItems', async () => {
  const data = await fetchItems()
  return data
})

export const fetchCurrentItem = createAsyncThunk(
  'items/fetchCurrentItem',
  async (id: number) => {
    const data = await fetchOneItem(id)
    return (data)
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
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllItems.pending, (state) => {
      state.loading = true
    })

    builder.addCase(fetchAllItems.fulfilled, (state, action) => {
      state.loading = false
      state.items = action.payload.rows
    })

    builder.addCase(fetchAllItems.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })

    builder.addCase(fetchCurrentItem.pending, (state) => {
      state.currentIsLoading = true
    })

    builder.addCase(fetchCurrentItem.fulfilled, (state, action) => {
      state.currentIsLoading = false
      state.currentItem = action.payload
    })

    builder.addCase(fetchCurrentItem.rejected, (state, action) => {
      state.currentIsLoading = false
      state.currentError = action.error.message
    })
  },
})

export default itemsSlice.reducer
