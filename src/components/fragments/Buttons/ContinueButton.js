import { Button, Grid } from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { Link } from 'react-router-dom'
import React from 'react'

export function ContinueButton({ to, fullWidth = true }) {
  return (
    <Grid item xs={12}>
      <Button
        startIcon={<ArrowForwardIosIcon />}
        id="continue-button"
        variant="contained"
        color="secondary"
        component={Link}
        tabIndex={0}
        to={to}
        fullWidth={fullWidth}
        size="large"
      >
        Continue
      </Button>
    </Grid>
  )
}
