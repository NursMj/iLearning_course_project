import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchItems, fetchLatestItems, fetchOneItem } from '../http/itemApi'
import getItemsData from '../utils/getItemsData'

export const getCollectionItems = createAsyncThunk(
  'items/getCollectionItems',
  async (id: any) => {
    const data = await fetchItems({ collectionId: id })
    return data
  }
)

export const getTagItems = createAsyncThunk(
  'items/getTagItems',
  async (id: any) => {
    const data = await fetchItems({ tagId: id })
    return data
  }
)

export const getCurrentItem = createAsyncThunk(
  'items/getCurrentItem',
  async (id: number, { getState }) => {
    const state: any = getState()
    const data = await fetchOneItem(id)
    const myLike = data.Likes.find(
      (l: any) => l.UserId === state.user.user.data.id
    )
    return { ...data, myLike }
  }
)

export const getLatestItems = createAsyncThunk(
  'items/getLatestItems',
  async () => {
    const data = await fetchLatestItems()
    return data
  }
)

const itemsSlice: any = createSlice({
  name: 'items',
  initialState: {
    items: {
      data: [],
      loading: false,
      error: null as any,
      tag: {},
    },
    currentItem: {
      data: {},
      isLoading: false,
      error: null as any,
      tags: [],
    },
    latestItems: {
      data: [],
      isLoading: false,
      error: null as any,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCollectionItems.pending, (state) => {
      state.items.loading = true
    })

    builder.addCase(getCollectionItems.fulfilled, (state, action) => {
      state.items.loading = false
      state.items.data = getItemsData(action.payload)
    })

    builder.addCase(getCollectionItems.rejected, (state, action) => {
      state.items.loading = false
      state.items.error = action.error.message
    })

    builder.addCase(getTagItems.pending, (state) => {
      state.items.loading = true
    })

    builder.addCase(getTagItems.fulfilled, (state, action) => {
      state.items.loading = false
      state.items.data = getItemsData(action.payload.Items)
      console.log(state.items.data)
      state.items.tag = { id: action.payload.id, name: action.payload.name }
    })

    builder.addCase(getTagItems.rejected, (state, action) => {
      state.items.loading = false
      state.items.error = action.error.message
    })

    builder.addCase(getCurrentItem.pending, (state) => {
      state.currentItem.isLoading = true
    })

    builder.addCase(getCurrentItem.fulfilled, (state, action) => {
      state.currentItem.isLoading = false
      state.currentItem.data = getItemsData([action.payload])[0]
      console.log(state.currentItem.data)
      state.currentItem.tags = action.payload.Tags
    })

    builder.addCase(getCurrentItem.rejected, (state, action) => {
      state.currentItem.isLoading = false
      state.currentItem.error = action.error.message
    })

    builder.addCase(getLatestItems.pending, (state) => {
      state.latestItems.isLoading = true
    })

    builder.addCase(getLatestItems.fulfilled, (state, action) => {
      state.latestItems.isLoading = false
      state.latestItems.data = getItemsData(action.payload)
      console.log(state.items.data)
    })

    builder.addCase(getLatestItems.rejected, (state, action) => {
      state.latestItems.isLoading = false
      state.latestItems.error = action.error.message
    })
  },
})

export default itemsSlice.reducer
