import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RowData } from '../types'

interface ListState {
  data: RowData[] | null
}

const initialState: ListState = {
  data: null,
}

const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    addList: (state, action: PayloadAction<RowData>) => {
      if (state.data) {
        state.data.push(action.payload)
      } else {
        state.data = [action.payload]
      }
    },
    setList: (state, action: PayloadAction<RowData[]>) => {
      state.data = action.payload
    },
  },
})

export const { addList, setList } = listSlice.actions
export default listSlice.reducer
