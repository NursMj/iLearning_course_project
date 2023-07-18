import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { check, fetchAllUsers } from '../http/userApi'
import { showErrorToast } from '../utils/showToest'

export const getAllUsers = createAsyncThunk('items/getAllUsers', async () => {
  const data = await fetchAllUsers()
  return data
})

export const checkUser = createAsyncThunk('items/checkUser', async () => {
  const data = await check()
  return data
})

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {
      data: {} as any,
      isLoading: true,
      error: null as any,
      isAuth: false,
    },
    allUsers: {
      data: [],
      isLoading: false,
      error: null as any,
    },
  },
  reducers: {
    setUser: (state, action) => {
      state.user.data = action.payload
    },
    setIsAuth: (state, action) => {
      state.user.isAuth = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(checkUser.pending, (state) => {
      state.user.isLoading = true
    })

    builder.addCase(checkUser.fulfilled, (state, action) => {
      state.user.isLoading = false
      state.user.data = action.payload
      state.user.isAuth = true
    })

    builder.addCase(checkUser.rejected, (state, action: any) => {
      state.user.isLoading = false
      state.user.error = action.error.message
      state.user.data = {}
      state.user.isAuth = false
    })

    builder.addCase(getAllUsers.pending, (state) => {
      state.allUsers.isLoading = false
    })

    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.allUsers.isLoading = false
      state.allUsers.data = action.payload
    })

    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.allUsers.isLoading = false
      state.allUsers.error = action.error.message
      showErrorToast(action.error)
    })
  },
})

export const { setUser, setIsAuth } = userSlice.actions
export default userSlice.reducer
