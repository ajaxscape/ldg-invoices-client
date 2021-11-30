import { Toolbar, Typography } from '@mui/material'
import React from 'react'
import { styled } from '@mui/material/styles'

const PREFIX = 'LdgApp-Page-Title'

const classes = {
  root: PREFIX,
  icon: `${PREFIX}-icon`,
  editButton: `${PREFIX}-edit-button`,
}

const Root = styled('div')(({ theme }) => ({
  [`.${classes.root}`]: {
    position: 'relative',
  },
  [`.${classes.icon}`]: {
    marginRight: theme.spacing(1),
  },
  [`.${classes.editButton}`]: {
    right: theme.spacing(1),
    top: theme.spacing(1.5),
    position: 'absolute',
  },
}))

export function PageTitle({ icon, title }) {
  const Icon = icon
  return (
    <Root>
      <Toolbar>
        {!!icon && <Icon fontSize="large" className={classes.icon} />}
        <Typography variant="h4">{title && <>{title}</>}</Typography>
      </Toolbar>
    </Root>
  )
}
