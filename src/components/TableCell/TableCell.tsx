import './TableCell.scss'
import FeedIcon from '@mui/icons-material/Feed'
import DeleteIcon from '@mui/icons-material/Delete'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { deleteTemporaryRow } from '../../store/rowsSlice'

type Props = {
  id?: number
  addRow: (parentId: number | null, nested: number) => void
  deleteRow: (id: number | undefined, nested: number) => void
  nested: number
}

function TableCell({ id, addRow, deleteRow, nested }: Props) {
  const [visibleDelete, setVisibleDelete] = useState(false)
  const isRowCreated = useSelector(
    (state: RootState) => state.rows.isRowCreated
  )
  const dispatch = useDispatch()

  const onMouseOver: React.MouseEventHandler<HTMLDivElement> = () => {
    setVisibleDelete(true)
  }

  const onMouseOut: React.MouseEventHandler<HTMLDivElement> = () => {
    setVisibleDelete(false)
  }

  const handleAddClick = () => {
    if (!isRowCreated) {
      addRow(id ?? null, nested)
    }
  }

  const handleDeleteClick = () => {
    if (id === 112233) {
      dispatch(deleteTemporaryRow())
    } else {
      deleteRow(id, nested)
    }
  }

  return (
    <div className="cell" style={{ marginLeft: `${nested * 20}px` }}>
      <div
        className={`container ${visibleDelete ? '' : 'transparent'}`}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
      >
        <FeedIcon
          onClick={handleAddClick}
          className="icon edit"
          sx={{ color: '#7890B2' }}
        />
        {visibleDelete && (
          <DeleteIcon
            className="icon delete"
            sx={{ color: '#DF4444' }}
            style={{ display: visibleDelete ? 'block' : 'none' }}
            onClick={handleDeleteClick}
          />
        )}
      </div>
    </div>
  )
}

export default TableCell
