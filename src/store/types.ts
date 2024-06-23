export interface RowData {
  id?: number
  parentId?: number | null
  child?: RowData[]
  equipmentCosts: number
  estimatedProfit: number
  machineOperatorSalary: number
  mainCosts: number
  materials: number
  mimExploitation: number
  overheads: number
  rowName: string
  salary: number
  supportCosts: number
}

export interface RowToRender {
  // id?:number
  rowName: string
  salary: number
  equipmentCosts: number
  overheads: number
  estimatedProfit: number
}
