import { configureStore } from '@reduxjs/toolkit'
import commonSlice from './common/slice'
import counterSlice from './counter/slice'

export const store = configureStore({
  reducer: {
    common: commonSlice,
    counter: counterSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
