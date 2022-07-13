import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        addFilter: (state, action) => action.payload
    }
})

export const { addFilter } = filterSlice.actions
export default filterSlice.reducer