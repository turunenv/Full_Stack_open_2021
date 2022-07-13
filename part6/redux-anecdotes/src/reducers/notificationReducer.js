import { createSlice } from '@reduxjs/toolkit'

const initialState = 'Test Message'

const notificationReducer = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        addNotification: (state, action) => {
            return action.payload
        }
    }
})