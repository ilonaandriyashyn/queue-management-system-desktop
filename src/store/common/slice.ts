import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../index'
import { Pages } from '../../helpers/consts'

interface CommonState {
  page: Pages
}

const initialState: CommonState = {
  page: Pages.dashboard
}

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<Pages>) => {
      state.page = action.payload
    }
  }
})

export const { setPage } = commonSlice.actions

export const selectPage = (state: RootState) => state.common.page

export default commonSlice.reducer
