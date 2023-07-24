import { createSlice } from '@reduxjs/toolkit'

const dataViewSlice = createSlice({
  name: 'dataView',
  initialState: {
    isItemTable: true,
  },
  reducers: {
    setIsItemTable: (state) => {
      state.isItemTable = !state.isItemTable
    },
  },
})

export const { setIsItemTable } = dataViewSlice.actions
export default dataViewSlice.reducer
