import React from 'react'
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
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
  const { menuVisible, setMenuVisible } = useGlobal()
  const { isAuthenticated } = useAuthentication()

  const onMenuClick = () => {
    setMenuVisible(!menuVisible)
  }

  return (
    <Root className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {title}
            {!!process.env.REACT_APP_ENVIRONMENT && (
              <>
                <br />
                <>* TEST ENVIRONMENT *</>
              </>
            )}
          </Typography>
          {isAuthenticated() && (
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={onMenuClick}
              style={{ float: 'right' }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
    </Root>
  )
}
