import React, { useState } from 'react'
import './TableRow.scss'
import TableCell from '../TableCell/TableCell'
import { useFocus } from '../../utils/useFocus'
import { RowData, RowToRender } from '../../store/types'
import { useAddRowMutation, useDeleteRowMutation } from '../../store/api/api'
import { useDispatch } from 'react-redux'
import { addEmptyRow } from '../../store/rowsSlice'

type Props = {
  row: RowData
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
  const [isDisabled, setIsDisabled] = useState(row.id !== 112233)
  const [rowData, setRowData] = useState(row)
  const [addRowMutation] = useAddRowMutation()
  const [deleteRowMutation] = useDeleteRowMutation()
  const inputRef = useFocus()
  const dispatch = useDispatch()

  const handleDoubleClick = () => {
    setIsDisabled((prevState) => !prevState)
  }

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
  ) => {
    const value =
      key === 'rowName' ? e.target.value : parseFloat(e.target.value)
    setRowData((prevState) => ({
      ...prevState,
      [key]: value,
    }))
  }

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
            value={rowData[key]}
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
