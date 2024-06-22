import Navbar from './layouts/Navbar/Navbar'
import Sidebar from './layouts/Sidebar/Sidebar'
import Table from './layouts/Table/Table'
import { api } from './state/api'

function App() {
  const { data } = api.useGetListQuery()
  console.log('data', data)

  return (
    <div className="app">
      <Navbar></Navbar>
      <Sidebar></Sidebar>
      <Table></Table>
    </div>
  )
}

export default App
