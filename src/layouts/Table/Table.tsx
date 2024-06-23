import React from 'react'
import './Table.scss'
import { useEffect, useState } from 'react'
import TableRow from '../../components/TableRow/TableRow'
import { useGetListQuery } from '../../store/api/api'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { setList, addEmptyRow } from '../../store/listSlice'
import { RowData } from '../../store/types'

type Props = {}

export default function Table({}: Props) {
  const dispatch = useDispatch()
  const list = useSelector((state: RootState) => state.list.data)
  const { data, error, isLoading, isFetching } = useGetListQuery()
  const [activeRowId, setActiveRowId] = useState<number | null>(null)

  useEffect(() => {
    if (data) {
      dispatch(setList(data))
    }
  }, [data, dispatch])

  const addRow = (parentId: number | null = null) => {
    console.log(parentId)
    // dispatch(addEmptyRow(parentId))
  }

  useEffect(() => {
    if (list) {
      const newRow = list.find((row) => row.isNew)
      if (newRow) {
        setActiveRowId(newRow.id)
      }
    }
  }, [list])

  const renderRows = (rows: RowData[], nested: number = 0) => {
    return rows.map((row) => (
      <React.Fragment key={row.id}>
        <TableRow
          addRow={addRow}
          id={row.id}
          rowName={row.rowName}
          total={row.total}
          salary={row.salary}
          mimExploitation={row.mimExploitation}
          machineOperatorSalary={row.machineOperatorSalary}
          materials={row.materials}
          mainCosts={row.mainCosts}
          supportCosts={row.supportCosts}
          equipmentCosts={row.equipmentCosts}
          overheads={row.overheads}
          estimatedProfit={row.estimatedProfit}
          child={row.child}
          parentId={row.parentId}
          isDisabled={activeRowId !== row.id}
          isNew={row.isNew}
          nested={nested}
          style={{ marginLeft: nested * 20 + 'px' }}
        />
        {row.child && row.child.length > 0 && renderRows(row.child, nested + 1)}
      </React.Fragment>
    ))
  }

  return (
    <div className="table">
      <div className="title">
        <h4>Строительно-монтажные работы</h4>
      </div>
      <div className="table-section">
        <table>
          <thead>
            <tr>
              <th>Уровень</th>
              <th>Наименование работ</th>
              <th>Основная з/п</th>
              <th>Оборудование</th>
              <th>Накладные расходы</th>
              <th>Сметная прибыль</th>
            </tr>
          </thead>
          <tbody>{list && renderRows(list)}</tbody>
        </table>
      </div>
    </div>
  )
}
