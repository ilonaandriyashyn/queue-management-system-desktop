import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../index'
import { PAGES, type PagesType } from '../../helpers/consts'

interface CommonState {
  page: PagesType
}

const initialState: CommonState = {
  page: PAGES.DASHBOARD.name
}

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<PagesType>) => {
      state.page = action.payload
    }
  }
})

export const { setPage } = commonSlice.actions

export const selectPage = (state: RootState) => state.common.page

export default commonSlice.reducer
