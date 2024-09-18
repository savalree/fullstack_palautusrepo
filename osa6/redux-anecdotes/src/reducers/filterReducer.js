import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState: 'NONE',
  reducers: {
    setFilter: (state, action) => {
      console.log('FILTER ACTION: ', action)
      console.log('filter state', state)
      console.log("filter is", action.payload)
      return action.payload
    }
  }
})

export const { setFilter } = filterSlice.actions

export default filterSlice.reducer
  