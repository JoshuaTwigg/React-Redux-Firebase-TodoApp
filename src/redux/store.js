import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counter'
import taskReducer from "./taskSlice"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    tasks: taskReducer
  },
})