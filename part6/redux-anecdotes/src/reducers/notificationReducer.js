import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        addNotification: (state, action) => {
            return action.payload
        },
        removeNotification: (state, action) => {
            return ''
        }
    }
})

//dispatch addNotification with message as a parameter, remove after s seconds
export const setNotification = (message, s) => {
  const timeInMilliseconds = s * 1000

  return  dispatch => {
    dispatch(addNotification(message))
    setTimeout(() => dispatch(removeNotification()), timeInMilliseconds)
  }
}

export const { addNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer