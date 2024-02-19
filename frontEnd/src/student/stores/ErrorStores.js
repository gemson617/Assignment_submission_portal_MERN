import { configureStore } from '@reduxjs/toolkit'
import errorReducer from '../states/ErrorSlice'

export const store = configureStore({
  reducer: {
    ErrorSlice: errorReducer,
  },
})