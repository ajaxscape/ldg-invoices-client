import { Grid, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

const PREFIX = 'LdgApp-Menu-Button-Group'

const classes = {
  label: `${PREFIX}-label`,
}

const Root = styled('span')(() => ({
  [`.${classes.label}`]: {
    marginLeft: '0.5em',
    marginTop: '-0.25em',
    marginBottom: '-0.75em',
  },
}))

export default function MenuGroup({ children, label }) {
  return (
    <>
      {!!label && (
        <Grid item xs={12}>
          <Root>
            <Typography variant="h6" className={classes.label} paddingY>
              {label}
            </Typography>
          </Root>
        </Grid>
      )}
      {children}
    </>
  )
}
