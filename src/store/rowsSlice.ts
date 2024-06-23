import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RowData } from './types'

interface RowsState {
  data: RowData[] | null
  emptyRowCreated: boolean
}

const initialState: RowsState = {
  data: null,
  emptyRowCreated: false,
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
const createNewRow = (parentId: number | null): RowData => {
  return {
    id: Date.now(), //vremennoe ID
    parentId: parentId,
    child: [],
    equipmentCosts: 0,
    estimatedProfit: 0,
    machineOperatorSalary: 0,
    mainCosts: 0,
    materials: 0,
    mimExploitation: 0,
    overheads: 0,
    rowName: '',
    salary: 0,
    supportCosts: 0,
  }
}

const rowsSlice = createSlice({
  name: 'rows',
  initialState,
  reducers: {
    setRows: (state, action: PayloadAction<RowData[]>) => {
      state.data = action.payload
    },
    addRow: () => {},
    addEmptyRow: (
      state,
      action: PayloadAction<{ id: number | null; nested: number }>
    ) => {
      const newRow = createNewRow(action.payload.id)
      const addRowToParent = (rows: RowData[]): boolean => {
        for (let row of rows) {
          if (row.id === action.payload.id) {
            row.child = row.child || []
            row.child.push(newRow)
            return true
          }
          if (row.child && addRowToParent(row.child)) {
            return true
          }
        }
        return false
      }
      if (state.data) {
        if (action.payload.id === null) {
          state.data.push(newRow)
        } else {
          addRowToParent(state.data)
        }
      } else {
        state.data = [newRow]
      }
    },

    editRow: () => {},
    deleteRow: (state, action: PayloadAction<number>) => {
      if (state.data) {
        state.data = removeRowById(state.data, action.payload)
      }
    },
  },
})

export const { setRows, addRow, addEmptyRow, editRow, deleteRow } =
  rowsSlice.actions
export default rowsSlice.reducer
