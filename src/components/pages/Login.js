import React, { useEffect } from 'react'
import { Button, Grid } from '@mui/material'
import { useAuthentication } from '../context/AuthenticationContext'
import { PageTitle } from '../fragments/PageTitle'

export default function Login() {
  const { login, isAuthenticated } = useAuthentication()

  useEffect(() => {
    if (isAuthenticated()) {
      console.log('logged in')
    }
  }, [isAuthenticated])

  return (
    <Grid container direction="column" spacing={2} alignContent="stretch">
      <PageTitle title="Login" />
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={login}>
          Login via Google
        </Button>
      </Grid>
    </Grid>
  )
}
