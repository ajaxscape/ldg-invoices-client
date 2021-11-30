import { ListItemText, MenuItem, MenuList } from '@mui/material'
import { Link } from 'react-router-dom'
import React from 'react'
import { useGlobal } from '../context/GlobalContext'

export default function Menu() {
  const { menuVisible, setMenuVisible } = useGlobal()

  const handleHideMenu = () => {
    if (menuVisible) {
      setMenuVisible(false)
    }
  }
  return (
    <MenuList variant="selectedMenu" onClick={handleHideMenu}>
      <MenuItem
        id="home-button"
        button="true"
        tabIndex={0}
        component={Link}
        to="/Home"
      >
        <ListItemText>Home</ListItemText>
      </MenuItem>
      <MenuItem
        id="logout-link"
        button="true"
        tabIndex={0}
        component={Link}
        to="/Logout"
      >
        <ListItemText>Logout</ListItemText>
      </MenuItem>
    </MenuList>
  )
}
