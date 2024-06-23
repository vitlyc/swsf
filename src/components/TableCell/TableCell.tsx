import './TableCell.scss'
import FeedIcon from '@mui/icons-material/Feed'
import DeleteIcon from '@mui/icons-material/Delete'
import { useState } from 'react'

type Props = {
  id?: number
  addRow: (parentId: number | null) => void
  deleteRow: () => void
  nested: number
}

function TableCell({ id, addRow, deleteRow, nested }: Props) {
  const [visibleDelete, setVisibleDelete] = useState(false)

  const onMouseOver: React.MouseEventHandler<HTMLDivElement> = () => {
    setVisibleDelete(true)
  }

  const onMouseOut: React.MouseEventHandler<HTMLDivElement> = () => {
    setVisibleDelete(false)
  }

  const handleClick = () => {
    addRow(id ?? null)
  }

  return (
    <div className="cell" style={{ marginLeft: `${nested * 20}px` }}>
      <div
        className={`container ${visibleDelete ? '' : 'transparent'}`}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
      >
        <FeedIcon
          onClick={handleClick}
          className="icon edit"
          sx={{ color: '#7890B2' }}
        />
        {visibleDelete && (
          <DeleteIcon
            className="icon delete"
            sx={{ color: '#DF4444' }}
            style={{ display: visibleDelete ? 'block' : 'none' }}
            onClick={deleteRow}
          />
        )}
      </div>
    </div>
  )
}

export default TableCell
