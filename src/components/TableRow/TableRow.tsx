import React, { useState, useEffect } from 'react'
import './TableRow.scss'
import TableCell from '../TableCell/TableCell'
import { useFocus } from '../../utils/useFocus'
import { RowData, RowToRender } from '../../store/types'
import {
  useAddRowMutation,
  useDeleteRowMutation,
  useUpdateRowMutation,
} from '../../store/api/api'
import { useDispatch } from 'react-redux'
import {
  addEmptyRow,
  resetIsRowCreated,
  deleteTemporaryRow,
} from '../../store/rowsSlice'

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

const TableRow = ({ row, nested }: Props) => {
  const [isDisabled, setIsDisabled] = useState(row.id !== 112233)
  const [rowData, setRowData] = useState(row)
  const [addRowMutation] = useAddRowMutation()
  const [deleteRowMutation] = useDeleteRowMutation()
  const [updateRowMutation] = useUpdateRowMutation()
  const inputRef = useFocus()
  const dispatch = useDispatch()

  useEffect(() => {
    setIsDisabled(row.id !== 112233)
  }, [row.id, row])

  const toggleDisabled = () => setIsDisabled((prevState) => !prevState)

  const handleDeleteRow = async (id: number | undefined, nested: number) => {
    if (id === 112233) {
      dispatch(deleteTemporaryRow())
    } else {
      if (id !== undefined) {
        try {
          await deleteRowMutation({ id }).unwrap()
        } catch (error) {
          console.error('Failed to delete row:', error)
        }
      } else {
        console.error('ID is undefined')
      }
    }
  }

  const handleAddRow = (id: number | null, nested: number) => {
    dispatch(addEmptyRow({ id, nested }))
  }

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && rowData.rowName.trim() !== '') {
      try {
        if (rowData.id === 112233) {
          await addRowMutation(rowData).unwrap()
          dispatch(resetIsRowCreated())
        } else if (rowData.id !== undefined) {
          toggleDisabled()
          await updateRowMutation({ id: rowData.id, ...rowData }).unwrap()
        }
      } catch (error) {
        console.error('Failed to process row:', error)
      }
    }
  }

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
      className={`row ${row.id === 112233 ? 'new-row' : ''} no-select `}
      onDoubleClick={toggleDisabled}
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
