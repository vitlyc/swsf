import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.scss'

import ReplyIcon from '@mui/icons-material/Reply'
import AppsIcon from '@mui/icons-material/Apps'

type Props = {}

export default function Navbar({}: Props) {
  const [activePage, setActivePage] = useState(null)

  return (
    <div className="navbar">
      <div className="buttons">
        <AppsIcon />
        <ReplyIcon />
      </div>
      <div className="links">
        <h4>Просмотр</h4>
        <h4>Управление</h4>
      </div>
    </div>
  )
}
