export interface RowData {
  id: number
  rowName: string
  total?: number
  salary: number
  mimExploitation?: number
  machineOperatorSalary?: number
  materials?: number
  mainCosts?: number
  supportCosts?: number
  equipmentCosts: number
  overheads: number
  estimatedProfit: number
  child?: RowData[]
  parentId: number | null
  isNew?: boolean
}
