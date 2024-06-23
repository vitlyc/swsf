import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RowData } from './types'

interface RowsState {
  data: RowData[] | null
}

const initialState: RowsState = {
  data: null,
}

const removeRowById = (rows: RowData[], id: number): RowData[] => {
  return rows.filter((row) => {
    if (row.id === id) {
      return false
    }
    if (row.child) {
      row.child = removeRowById(row.child, id)
    }
    return true
  })
}

const rowsSlice = createSlice({
  name: 'rows',
  initialState,
  reducers: {
    setRows: (state, action: PayloadAction<RowData[]>) => {
      state.data = action.payload
    },
    addRow: () => {},
    editRow: () => {},
    deleteRow: (state, action: PayloadAction<number>) => {
      if (state.data) {
        state.data = removeRowById(state.data, action.payload)
      }
    },
  },
})

export const { setRows, addRow, editRow, deleteRow } = rowsSlice.actions
export default rowsSlice.reducer
