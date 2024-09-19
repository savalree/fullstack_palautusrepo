import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
      setNotification: (state, action) => {
        console.log('Notif ACTION: ', action)
        console.log('Notif state', state)
        console.log("Notif is", action.payload)
        return action.payload
      }
    }
  })
  
  export const { setNotification } = notificationSlice.actions
  
  export default notificationSlice.reducer