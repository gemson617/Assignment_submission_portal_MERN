import { createSlice } from '@reduxjs/toolkit'


const initialState = {

  tokenAlert     :  false, // token not found or 401 alert
  logoutAlert  :  false, // email / password mismatch

}

export const errorSlice = createSlice({
  name: 'ErrorSlices',
  initialState,
    reducers: {

    setTokenAlert: (state, action) =>{
        state.tokenAlert = action.payload
        },

    setLogoutAlert: (state) =>{
        state.logoutAlert = !state.logoutAlert
        },



  },


})

// Action creators are generated for each case reducer function
export const { setTokenAlert, setLogoutAlert} =errorSlice.actions

export default errorSlice.reducer