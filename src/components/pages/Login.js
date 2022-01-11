import React, { useEffect } from 'react'
import { Button, Grid } from '@mui/material'
import { useAuthentication } from '../context/AuthenticationContext'
import { PageTitle } from '../fragments/PageTitle'
import Loader from '../fragments/Loader'

export default function Login() {
  const { login, isAuthenticated, authenticating } = useAuthentication()

  useEffect(() => {
    if (isAuthenticated()) {
      console.log('logged in')
    }
  }, [isAuthenticated])

  return (
    <>
      {!!authenticating ? (
        <Loader />
      ) : (
        <Grid container direction="column" spacing={2} alignContent="stretch">
          <PageTitle title="Login" />
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={login}>
              Login via Google
            </Button>
          </Grid>
        </Grid>
      )}
    </>
  )
}
