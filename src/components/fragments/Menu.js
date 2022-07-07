import { ListItemText, MenuItem, MenuList, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import React from 'react'
import { useGlobal } from '../context/GlobalContext'
import { styled } from '@mui/material/styles'
import { useAuthentication } from '../context/AuthenticationContext'

const PREFIX = 'LdgApp-Menu'

const classes = {
  title: `${PREFIX}-title`,
}

const Root = styled('div')(({ theme }) => ({
  [`.${classes.title}`]: {
    marginLeft: theme.spacing(2),
    flexGrow: 1,
  },
}))

export default function Menu() {
  const { menuVisible, setMenuVisible } = useGlobal()
  const { user } = useAuthentication()

  const handleHideMenu = () => {
    if (menuVisible) {
      setMenuVisible(false)
    }
  }

  return (
    <Root>
      <Typography variant="h6" className={classes.title}>
        {user.firstName} {user.lastName}
      </Typography>
      <Typography variant="h6" className={classes.title}>
        {user.role.roleName}
      </Typography>
      <br />
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
    </Root>
  )
}
