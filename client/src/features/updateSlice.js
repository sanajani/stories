import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    updatePostValues : null
}

const updatePostSlicer = createSlice({
    name:'updateMemory',
    initialState,
    reducers:{
        updateMemorySlice : (state,action) => {
            state.updatePostValues = (action.payload)
        },
        initialStateUpdateMemorySlice:(state) => {
            state.updatePostValues = {}
        }
    }
})

export const {updateMemorySlice, initialStateUpdateMemorySlice} = updatePostSlicer.actions

export default updatePostSlicer.reducer