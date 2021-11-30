import { Button, Grid } from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { Link } from 'react-router-dom'
import React from 'react'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { styled } from '@mui/material/styles'

const PREFIX = 'LdgApp-Nav-Buttons'

const classes = {
  root: `${PREFIX}-root`,
  continueButton: `${PREFIX}-continue-button`,
}

const Root = styled('div')(({ theme }) => ({
  [`.${classes.continueButton}`]: {
    float: 'right',
  },
}))

export function NavButtons({
  backTo,
  continueTo,
  backLabel = 'Back',
  continueLabel = 'Continue',
  continueToDisabled,
}) {
  return (
    <Grid item xs={12}>
      <Root>
        {!!backTo && (
          <Button
            startIcon={<ArrowBackIosIcon />}
            id="back-button"
            variant="contained"
            color="primary"
            component={Link}
            tabIndex={0}
            to={backTo}
            fullWidth={!continueTo}
            size="large"
          >
            {backLabel}
          </Button>
        )}
        {!!continueTo && (
          <Button
            className={!!backTo && classes.continueButton}
            endIcon={<ArrowForwardIosIcon />}
            id="continue-button"
            variant="contained"
            color="secondary"
            component={Link}
            tabIndex={0}
            to={continueTo}
            fullWidth={!backTo}
            size="large"
            disabled={continueToDisabled}
          >
            {continueLabel}
          </Button>
        )}
      </Root>
    </Grid>
  )
}
