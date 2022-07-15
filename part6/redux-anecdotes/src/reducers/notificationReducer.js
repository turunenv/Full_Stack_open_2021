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

//taking advantage of closure in JS, this variable will be available for the returned inner function
//timeoutID is the return value of setTimeout
let timeoutID = 0

//dispatch addNotification with message as a parameter, remove after s seconds
export const setNotification = (message, s) => {
  const timeInMilliseconds = s * 1000
  
  return  dispatch => {
    //check if currentTimerId has been set, meaning that a like-button was clicked
    //before the last timer was cleared
    if (timeoutID) {
      //clear the last timer to ensure that the new notification will be displayed for the correct amount time
      clearTimeout(timeoutID)
    }
    dispatch(addNotification(message))

    //save the new timeoutID
    timeoutID = setTimeout(() => {
      dispatch(removeNotification())
      //timer ran until the end in peace, set timeoutID to 0
      timeoutID = 0  
    }, timeInMilliseconds)
  }
}

export const { addNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer