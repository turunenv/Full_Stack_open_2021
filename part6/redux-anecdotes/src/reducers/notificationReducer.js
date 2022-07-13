import { createSlice } from '@reduxjs/toolkit'

const initialState = 'Test Message'

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        addNotification: (state, action) => {
            return action.payload
        }
    }
})

export default notificationSlice.reducer