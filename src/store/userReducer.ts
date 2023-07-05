import { createSlice } from '@reduxjs/toolkit'


const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuth: true,
    user: {}
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user
    },
    setIsAuth: (state) => {
      state.isAuth = !state.isAuth
    }
  },
});

export const { setUser, setIsAuth  } = userSlice.actions
export default userSlice.reducer