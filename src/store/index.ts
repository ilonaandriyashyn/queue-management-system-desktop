import { configureStore } from '@reduxjs/toolkit'
import commonSlice from './common/slice'

export const store = configureStore({
  reducer: {
    common: commonSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
