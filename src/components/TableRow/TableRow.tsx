import './TableRow.scss'
import TableCell from '../TableCell/TableCell'
import { RowData } from '../../store/types'
import { useState, useEffect, useRef } from 'react'
import { useAddRowMutation, useDeleteRowMutation } from '../../store/api/api'

type Props = RowData & {
  addRow: (parentId: number | null) => void
  isDisabled: boolean
  nested: number
  style?: React.CSSProperties
}

function TableRow({
  id,
  rowName,
  total,
  salary,
  mimExploitation,
  machineOperatorSalary,
  materials,
  mainCosts,
  supportCosts,
  equipmentCosts,
  overheads,
  estimatedProfit,
  child,
  parentId,
  isDisabled,
  isNew,
  addRow,
  nested,
  style,
}: Props) {
  const [rowData, setRowData] = useState<RowData>({
    id,
    rowName,
    total,
    salary,
    mimExploitation,
    machineOperatorSalary,
    materials,
    mainCosts,
    supportCosts,
    equipmentCosts,
    overheads,
    estimatedProfit,
    child,
    parentId,
    isNew,
  })

  const [addRowMutation] = useAddRowMutation()
  const [deleteRowMutation] = useDeleteRowMutation()
  const inputRef = useRef<HTMLInputElement>(null)
  console.log(nested)

  useEffect(() => {
    if (!isDisabled) {
      setRowData((prev) => ({ ...prev, isNew: false }))
      inputRef.current?.focus()
    }
  }, [isDisabled])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof RowData
  ) => {
    const value =
      e.target.type === 'number' ? Number(e.target.value) : e.target.value
    setRowData({
      ...rowData,
      [field]: value,
    })
  }

  const handleKeyDown = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()

      if (!rowData.rowName) return

      try {
        const res = await addRowMutation({
          id: rowData.id,
          rowName: rowData.rowName,
          total: rowData.total,
          salary: rowData.salary,
          mimExploitation: rowData.mimExploitation,
          machineOperatorSalary: rowData.machineOperatorSalary,
          materials: rowData.materials,
          mainCosts: rowData.mainCosts,
          supportCosts: rowData.supportCosts,
          equipmentCosts: rowData.equipmentCosts,
          overheads: rowData.overheads,
          estimatedProfit: rowData.estimatedProfit,
          child: rowData.child,
          parentId: rowData.parentId,
        })
        console.log(res)
      } catch (error) {
        console.error('Failed to add row:', error)
      }
    }
  }

  const handleDelete = async () => {
    try {
      await deleteRowMutation({ id: rowData.id })
      console.log(`Row with id ${rowData.id} deleted`)
    } catch (error) {
      console.error('Failed to delete row:', error)
    }
  }

  return (
    <tr className={`row ${nested > 0 ? 'child-row' : ''}`} style={style}>
      <td>
        <TableCell
          addRow={() => addRow(id ?? null)}
          id={id}
          deleteRow={handleDelete}
        />
      </td>
      <td>
        <input
          ref={inputRef}
          type="text"
          value={rowData.rowName}
          onChange={(e) => handleChange(e, 'rowName')}
          disabled={isDisabled}
          onKeyDown={handleKeyDown}
          className={nested > 0 ? 'child-input' : ''}
        />
      </td>
      <td>
        <input
          type="number"
          value={rowData.salary}
          onChange={(e) => handleChange(e, 'salary')}
          disabled={isDisabled}
          onKeyDown={handleKeyDown}
        />
      </td>
      <td>
        <input
          type="number"
          value={rowData.equipmentCosts}
          onChange={(e) => handleChange(e, 'equipmentCosts')}
          disabled={isDisabled}
          onKeyDown={handleKeyDown}
        />
      </td>
      <td>
        <input
          type="number"
          value={rowData.overheads}
          onChange={(e) => handleChange(e, 'overheads')}
          disabled={isDisabled}
          onKeyDown={handleKeyDown}
        />
      </td>
      <td>
        <input
          type="number"
          value={rowData.estimatedProfit}
          onChange={(e) => handleChange(e, 'estimatedProfit')}
          disabled={isDisabled}
          onKeyDown={handleKeyDown}
        />
      </td>
    </tr>
  )
}

export default TableRow
