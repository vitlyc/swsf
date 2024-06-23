import React from 'react'
import './Table.scss'
import TableRow from '../../components/TableRow/TableRow'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { useGetRowsQuery } from '../../store/api/api'
import { RowData } from '../../store/types'

type Props = {}

export default function Table({}: Props) {
  const { error, isLoading } = useGetRowsQuery()
  const rows = useSelector((state: RootState) => state.rows.data)

  const renderRows = (rows: RowData[], nested: number = 1) => {
    return rows.map((row, index) => (
      <React.Fragment key={row.id || index}>
        <TableRow key={row.id || index} row={row} nested={nested} />
        {row.child && row.child.length > 0 && renderRows(row.child, nested + 1)}
      </React.Fragment>
    ))
  }
  // console.log('Table', rows)

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
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={6}>Loading...</td>
              </tr>
            )}
            {error && (
              <tr>
                <td colSpan={6}>Error loading data</td>
              </tr>
            )}
            {rows && renderRows(rows)}
          </tbody>
        </table>
      </div>
    </div>
  )
}
