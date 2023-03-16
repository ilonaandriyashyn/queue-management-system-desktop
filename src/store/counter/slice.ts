import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../index'
import { type Counter } from '../../requests/counters'
import { type Services } from '../../types'

interface CounterState {
  counter: Counter
  services: Services
}

const initialState: CounterState = {
  counter: {
    id: '',
    name: ''
  },
  services: []
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    updateCounter: (state, action: PayloadAction<Counter>) => {
      state.counter = action.payload
    },
    updateServices: (state, action: PayloadAction<Services>) => {
      state.services = action.payload
    }
  }
})

export const { updateCounter, updateServices } = counterSlice.actions

export const selectCounter = (state: RootState) => state.counter.counter
export const selectCounterId = (state: RootState) => state.counter.counter.id
export const selectCounterServices = (state: RootState) => state.counter.services

export default counterSlice.reducer
