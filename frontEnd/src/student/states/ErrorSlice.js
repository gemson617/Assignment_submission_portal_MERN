import { createSlice } from '@reduxjs/toolkit'


const initialState = {

  tokenAlert     :  false, // token not found or 401 alert
  mismatchAlert  :  false, // email / password mismatch

}

export const errorSlice = createSlice({
  name: 'ErrorSlices',
  initialState,
    reducers: {

    setTokenAlert: (state, action) =>{
        state.tokenAlert = action.payload
        },

    setMismatchAlert: (state) =>{
        state.mismatchAlert = !state.mismatchAlert
        },

  },


})

// Action creators are generated for each case reducer function
export const { setTokenAlert, setMismatchAlert} =errorSlice.actions

export default errorSlice.reducer