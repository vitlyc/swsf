import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RowData } from './types'

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
      if (state.data) {
        state.data.push(newRow)
      } else {
        state.data = [newRow]
      }
    },
  },
})

export const { setList, addEmptyRow } = listSlice.actions
export default listSlice.reducer
