import { createSlice } from '@reduxjs/toolkit'


const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState: {
    darkMode: false
  },
  reducers: {
    setUnsetDarkMode: (state) => {
      state.darkMode = !state.darkMode
    }
  },
});

export const { setUnsetDarkMode  } = darkModeSlice.actions
export default darkModeSlice.reducer