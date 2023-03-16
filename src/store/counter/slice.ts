import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../index'
import { type Counter } from '../../requests/counters'

interface CounterState {
  id: string | null
  name: string | null
}

const initialState: CounterState = {
  id: null,
  name: null
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    updateCounter: (state, action: PayloadAction<Counter>) => action.payload
  }
})

export const { updateCounter } = counterSlice.actions

export const selectCounterName = (state: RootState) => state.counter.name

export default counterSlice.reducer
