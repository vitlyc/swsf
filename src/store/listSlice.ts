import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RowData } from './types'

interface ListState {
  data: RowData[] | null
}

const initialState: ListState = {
  data: null,
}

// Функция для поиска объекта по parentId в дереве
const findRowById = (rows: RowData[], parentId: number): RowData | null => {
  for (let row of rows) {
    if (row.id === parentId) {
      return row
    }
    if (row.child && row.child.length > 0) {
      const result = findRowById(row.child, parentId)
      if (result) return result
    }
  }
  return null
}

const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    setList: (state, action: PayloadAction<RowData[]>) => {
      state.data = action.payload
    },
    addEmptyRow: (state, action: PayloadAction<number | null>) => {
      const parentId = action.payload
      const newRow: RowData = {
        id: Date.now(),
        rowName: '',
        total: 0,
        salary: 0,
        mimExploitation: 0,
        machineOperatorSalary: 0,
        materials: 0,
        mainCosts: 0,
        supportCosts: 0,
        equipmentCosts: 0,
        overheads: 0,
        estimatedProfit: 0,
        child: [],
        parentId: parentId,
        isNew: true,
      }

      if (parentId === null) {
        // Добавление строки на верхний уровень
        if (state.data) {
          state.data.push(newRow)
        } else {
          state.data = [newRow]
        }
      } else if (state.data) {
        // Поиск родительского элемента и добавление новой строки в его child
        const parentRow = findRowById(state.data, parentId)
        if (parentRow) {
          if (!parentRow.child) {
            parentRow.child = [] // Initialize child array if undefined
          }
          parentRow.child.push(newRow)
        }
      }
    },
  },
})

export const { setList, addEmptyRow } = listSlice.actions
export default listSlice.reducer
