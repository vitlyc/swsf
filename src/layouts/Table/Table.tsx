import './Table.scss'

type Props = {}

export default function Table({}: Props) {
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
            <tr>
              <td>1</td>
              <td>Южная строительная площадка</td>
              <td>20 348</td>
              <td>1 750</td>
              <td>108,07</td>
              <td>1 209 122,5</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Фундаментальные работы</td>
              <td>20 348</td>
              <td>1 750</td>
              <td>108,07</td>
              <td>1 209 122,5</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Статья работы № 1</td>
              <td>20 348</td>
              <td>1 750</td>
              <td>108,07</td>
              <td>189 122,5</td>
            </tr>
            <tr>
              <td>4</td>
              <td>Статья работы № 2</td>
              <td>38 200</td>
              <td>1 200</td>
              <td>850</td>
              <td>1 020 000</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
