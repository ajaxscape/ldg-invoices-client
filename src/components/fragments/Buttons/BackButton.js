import { Button, Grid } from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { Link } from 'react-router-dom'
import React from 'react'

export function BackButton({ to, fullWidth = true }) {
  return (
    <Grid item xs={12}>
      <Button
        startIcon={<ArrowBackIosIcon />}
        id="back-button"
        variant="contained"
        color="primary"
        component={Link}
        tabIndex={0}
        to={to}
        fullWidth={fullWidth}
        size="large"
      >
        Back
      </Button>
    </Grid>
  )
}
