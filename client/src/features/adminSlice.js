import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    admin: null
}

const adminReducer = createSlice({
    name: 'admin',
    initialState,
    reducers:{
        addAdmin: (state,action) => {
            localStorage.setItem('profile',JSON.stringify(action.payload))        
            state.admin = action.payload
        },
        removeAdmin: (state,action) => {
            localStorage.clear()
            state.admin = null
        },
    }
})

export const {addAdmin, removeAdmin} = adminReducer.actions
export default adminReducer.reducer
// export 