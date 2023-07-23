import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  check,
  fetchAllUsers,
  updateUserDarkMode,
  updateUserLanguage,
} from '../http/userApi'
import { showErrorToast } from '../utils/showToest'

export const getAllUsers = createAsyncThunk('user/getAllUsers', async () => {
  const data = await fetchAllUsers()
  return data
})

export const checkUser = createAsyncThunk('user/checkUser', async () => {
  const data = await check()
  return data
})

const userSlice: any = createSlice({
  name: 'user',
  initialState: {
    user: {
      data: {} as any,
      isLoading: true,
      error: null as any,
      isAuth: false,
      darkMode: false,
      language: 'en',
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
      state.user.darkMode = action.payload.darkMode
      state.user.language = action.payload.language
    },
    setIsAuth: (state, action) => {
      state.user.isAuth = action.payload
    },
    setDarkMode: (state) => {
      if (state.user.isAuth)
        updateUserDarkMode({
          id: state.user.data.id,
          darkMode: !state.user.darkMode,
        })
      state.user.darkMode = !state.user.darkMode
      console.log(state.user.darkMode)
    },
    setLanguage: (state, action) => {
      if (state.user.isAuth)
        updateUserLanguage({
          id: state.user.data.id,
          language: action.payload,
        })
      state.user.language = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(checkUser.pending, (state) => {
      state.user.isLoading = true
    })

    builder.addCase(checkUser.fulfilled, (state, action: any) => {
      state.user.isLoading = false
      state.user.data = action.payload
      state.user.isAuth = true
      state.user.darkMode = action.payload.darkMode
      state.user.language = action.payload.language
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

export const { setUser, setIsAuth, setDarkMode, setLanguage } =
  userSlice.actions
export default userSlice.reducer
