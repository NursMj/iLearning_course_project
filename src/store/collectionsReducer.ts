import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  fetchUserCollections,
  fetchLargestCollections,
  fetchOneCollection,
} from '../http/collectionApi'

export const getUserCollections = createAsyncThunk(
  'collections/getUserCollections',
  async (userId: number) => {
    const data = await fetchUserCollections(userId)
    return data
  }
)

export const getLargestCollections = createAsyncThunk(
  'collections/getLargestCollections',
  async () => {
    const data = await fetchLargestCollections()
    return data
  }
)

export const getCurrentCollection = createAsyncThunk(
  'collections/getCurrentCollection',
  async (id: number) => {
    const data = await fetchOneCollection(id)
    return data
  }
)

const collectionsSlice = createSlice({
  name: 'collections',
  initialState: {
    collections: {
      data: [],
      owner: {} as any,
      isLoading: false,
      error: null as any,
    },
    currentCollection: {
      data: {},
      isLoading: false,
      error: null as any,
    },
    largestCollections: {
      data: [],
      isLoading: false,
      error: null as any,
    }
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserCollections.pending, (state) => {
      state.collections.isLoading = true
    })

    builder.addCase(getUserCollections.fulfilled, (state, action) => {
      state.collections.isLoading = false
      state.collections.data = action.payload.Collections
      state.collections.owner = Object.assign({}, action.payload)
      delete state.collections.owner.Collections
    })

    builder.addCase(getUserCollections.rejected, (state, action) => {
      state.collections.isLoading = false
      state.collections.error = action.error.message
    })

    builder.addCase(getCurrentCollection.pending, (state) => {
      state.currentCollection.isLoading = true
    })

    builder.addCase(getCurrentCollection.fulfilled, (state, action) => {
      state.currentCollection.isLoading = false
      state.currentCollection.data = action.payload
    })

    builder.addCase(getCurrentCollection.rejected, (state, action) => {
      state.currentCollection.isLoading = false
      state.currentCollection.error = action.error.message
    })

    builder.addCase(getLargestCollections.pending, (state) => {
      state.largestCollections.isLoading = true
    })

    builder.addCase(getLargestCollections.fulfilled, (state, action) => {
      state.largestCollections.isLoading = false
      state.largestCollections.data = action.payload
    })

    builder.addCase(getLargestCollections.rejected, (state, action) => {
      state.largestCollections.isLoading = false
      state.largestCollections.error = action.error.message
    })
  },
})

export default collectionsSlice.reducer
