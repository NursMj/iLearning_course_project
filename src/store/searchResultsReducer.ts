import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchSearchResults } from '../http/searchApi'

export const getSearchResults = createAsyncThunk(
  'searchResults/getSearchResults',
  async (searchText: string) => {
    const data = await fetchSearchResults(searchText)
    return data
  }
)

const searchResultsSlice = createSlice({
  name: 'searchResults',
  initialState: {
    searchResults: {
      collections: [],
      items: [],
      isLoading: false,
      error: null as any,
    }
  },
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(getSearchResults.pending, (state) => {
      state.searchResults.isLoading = true
    })

    builder.addCase(getSearchResults.fulfilled, (state, action) => {
      state.searchResults.isLoading = false
      state.searchResults.collections = action.payload.collections
      state.searchResults.items = action.payload.items
    })

    builder.addCase(getSearchResults.rejected, (state, action) => {
      state.searchResults.isLoading = false
      state.searchResults.error = action.error.message
    })
  },
})

export default searchResultsSlice.reducer