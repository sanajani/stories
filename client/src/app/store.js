import { configureStore } from '@reduxjs/toolkit'
import adminReducer from '../features/adminSlice'
import updateSliceReducer from '../features/updateSlice'

export const store = configureStore({
    reducer: {
        admin: adminReducer,
        updateMemorySlicer: updateSliceReducer
    }
})