import React, { useState, useEffect, useRef } from 'react'
import './TableRow.scss'
import TableCell from '../TableCell/TableCell'
import { RowData, RowToRender } from '../../store/types'
import { useAddRowMutation, useDeleteRowMutation } from '../../store/api/api'
import { useDispatch } from 'react-redux'
import { addEmptyRow } from '../../store/rowsSlice'

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
  const [isDisabled, setIsDisabled] = useState(true)
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

  const addRow = (id: number | null, nested: number) => {
    dispatch(addEmptyRow({ id, nested }))
    console.log('id:', id, 'nested:', nested)
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
          addRow={addRow}
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
