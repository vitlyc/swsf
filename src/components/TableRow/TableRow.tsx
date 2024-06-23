import React, { useState, useEffect, useRef } from 'react'
import './TableRow.scss'
import TableCell from '../TableCell/TableCell'
import { RowData, RowToRender } from '../../store/types'
import { useAddRowMutation, useDeleteRowMutation } from '../../store/api/api'
import { useDispatch } from 'react-redux'
import { editRow, deleteRow } from '../../store/rowsSlice'

type Props = {
  row: RowData
  // addRow: (parentId: number | null) => void
  nested: number
}
const rowKeys: Array<keyof RowToRender> = [
  'rowName',
  'salary',
  'equipmentCosts',
  'overheads',
  'estimatedProfit',
]

function TableRow({ row, nested }: Props) {
  const [isDisabled, setIsDisabled] = useState(false)
  const [addRowMutation] = useAddRowMutation()
  const [deleteRowMutation] = useDeleteRowMutation()
  const inputRef = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch()

  const handleDoubleClick = () => {}
  const handleMouseUp = () => {}

  const handleDeleteRow = (id: number | undefined, nested: number) => {
    if (id !== undefined) {
      deleteRowMutation({ id })
    } else {
      console.error('ID is undefined')
    }
  }

  const handleAddRow = (parentId: number | null, nested: number) => {
    // addRowMutation({ parentId })
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {}
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof RowToRender
  ) => {}
  return (
    <tr
      className={`row `}
      onDoubleClick={handleDoubleClick}
      onMouseUp={handleMouseUp}
    >
      <td>
        <TableCell
          id={row.id}
          deleteRow={handleDeleteRow}
          addRow={handleAddRow}
          nested={nested}
        />
      </td>
      {rowKeys.map((key) => (
        <td key={key}>
          <input
            ref={key === 'rowName' ? inputRef : null}
            type={key === 'rowName' ? 'text' : 'number'}
            value={row[key]}
            onChange={(e) => handleChange(e, key)}
            disabled={isDisabled}
            onKeyDown={handleKeyDown}
          />
        </td>
      ))}
    </tr>
  )
}

export default TableRow
