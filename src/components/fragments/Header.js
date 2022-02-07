import React, { useEffect, useState } from 'react'
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import ErrorIcon from '@mui/icons-material/Error'
import MenuIcon from '@mui/icons-material/Menu'
import CloudOffIcon from '@mui/icons-material/CloudOff'
import SyncIcon from '@mui/icons-material/Sync'
import { useAuthentication } from '../context/AuthenticationContext'
import { useGlobal } from '../context/GlobalContext'
import { styled } from '@mui/material/styles'

const PREFIX = 'LdgApp-Header'

const classes = {
  root: `${PREFIX}-root`,
  menuButton: `${PREFIX}-menu-button`,
  title: `${PREFIX}-title`,
}

const Root = styled('div')(({ theme }) => ({
  [`&.${classes.root}`]: {
    flexGrow: 1,
    marginBottom: '1em',
  },
  [`.${classes.menuButton}`]: {
    marginLeft: theme.spacing(2),
  },
  [`.${classes.title}`]: {
    flexGrow: 1,
  },
}))

export default function Header({ title }) {
  const { menuVisible, setMenuVisible, syncing, error } = useGlobal()
  const [health, setHealth] = useState(true)
  const { isAuthenticated } = useAuthentication()
  const apiUrl = process.env.REACT_APP_API

  useEffect(() => {
    let timeout

    const checkHealth = async () => {
      try {
        const response = await fetch(`${apiUrl}/health`)
        console.log(response)
        const result = await response.json()
        setHealth(result.ok ?? false)
      } catch {
        setHealth(false)
      } finally {
        timeout = setTimeout(checkHealth, 10000)
      }
    }
    checkHealth()
    return () => clearTimeout(timeout)
  }, [])

  const onMenuClick = () => {
    setMenuVisible(!menuVisible)
  }

  return (
    <Root className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
          {isAuthenticated() && (
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={onMenuClick}
              style={{ float: 'right' }}
            >
              {error ? (
                <ErrorIcon />
              ) : syncing ? (
                <SyncIcon />
              ) : health ? (
                <MenuIcon />
              ) : (
                <CloudOffIcon />
              )}
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
    </Root>
  )
}
