import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Navbar from './layouts/Navbar/Navbar'
import Sidebar from './layouts/Sidebar/Sidebar'
import Table from './layouts/Table/Table'
import { useGetRowsQuery } from './store/api/api'
import { setRows } from './store/rowsSlice'

function App() {
  const dispatch = useDispatch()
  const { data, error, isLoading } = useGetRowsQuery()

  useEffect(() => {
    if (data) {
      dispatch(setRows(data))
    }
  }, [data, dispatch, isLoading])

  return (
    <div className="app">
      <Navbar />
      <Sidebar />
      <Table />
    </div>
  )
}

export default App
