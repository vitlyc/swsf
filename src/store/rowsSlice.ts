import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RowData } from './types'

interface RowsState {
  data: RowData[] | null
  isRowCreated: boolean
}

const initialState: RowsState = {
  data: null,
  isRowCreated: false,
}

const updateRowById = (
  rows: RowData[],
  id: number,
  updatedData: Partial<RowData>
): RowData[] => {
  return rows.map((row) => {
    if (row.id === id) {
      return { ...row, ...updatedData }
    }
    if (row.child) {
      return { ...row, child: updateRowById(row.child, id, updatedData) }
    }
    return row
  })
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

const addRowToParent = (rows: RowData[], newRow: RowData): RowData[] => {
  return rows.map((row) => {
    if (row.id === newRow.parentId) {
      return {
        ...row,
        child: [...(row.child || []), newRow],
      }
    }

    if (row.child) {
      return {
        ...row,
        child: addRowToParent(row.child, newRow),
      }
    }
    return row
  })
}

const replaceRowById = (rows: RowData[], newRow: RowData): RowData[] => {
  return rows.map((row) => {
    if (row.id === 112233) {
      return newRow
    }
    if (row.child) {
      return {
        ...row,
        child: replaceRowById(row.child, newRow),
      }
    }
    return row
  })
}

const rowsSlice = createSlice({
  name: 'rows',
  initialState,
  reducers: {
    setRows: (state, action: PayloadAction<RowData[]>) => {
      state.data = action.payload
    },

    addNewRow: (state, action: PayloadAction<{ newRow: RowData }>) => {
      const { newRow } = action.payload

      if (state.data) {
        state.data = replaceRowById(state.data, newRow)
      } else {
        state.data = [newRow]
      }
      state.isRowCreated = false
    },

    addEmptyRow: (
      state,
      action: PayloadAction<{ id: number | null; nested: number }>
    ) => {
      if (!state.isRowCreated) {
        const newRow: RowData = {
          id: 112233, // Temporary ID for the new row
          parentId: action.payload.id,
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
        if (state.data) {
          if (newRow.parentId === null) {
            state.data = [...state.data, newRow]
          } else {
            state.data = addRowToParent(state.data, newRow)
          }
        } else {
          state.data = [newRow]
        }
        state.isRowCreated = true
      }
    },

    updateRow: (
      state,
      action: PayloadAction<{ id: number; updatedData: Partial<RowData> }>
    ) => {
      if (state.data) {
        state.data = updateRowById(
          state.data,
          action.payload.id,
          action.payload.updatedData
        )
      }
    },

    deleteRow: (state, action: PayloadAction<number>) => {
      if (state.data) {
        state.data = removeRowById(state.data, action.payload)
        state.isRowCreated = false
      }
    },

    deleteTemporaryRow: (state) => {
      if (state.data) {
        state.data = removeRowById(state.data, 112233)
        state.isRowCreated = false
      }
    },

    resetIsRowCreated: (state) => {
      state.isRowCreated = false
    },
  },
})

export const {
  setRows,
  addNewRow,
  addEmptyRow,
  updateRow,
  deleteRow,
  deleteTemporaryRow,
  resetIsRowCreated,
} = rowsSlice.actions
export default rowsSlice.reducer
