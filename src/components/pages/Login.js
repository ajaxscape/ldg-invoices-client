import TextField from '@mui/material/TextField'
import React, { useEffect, useState } from 'react'
import { Button, FormControl, Grid } from '@mui/material'
import { useAuthentication } from '../context/AuthenticationContext'
import { PageTitle } from '../fragments/PageTitle'

export default function Login() {
  const [credentials, setCredentials] = useState({})
  const { login, isAuthenticated } = useAuthentication()

  useEffect(() => {
    if (isAuthenticated()) {
      console.log('logged in')
    }
  }, [isAuthenticated])

  const onChange = (e) => {
    const { name, value } = e.target
    setCredentials((credentials) => ({ ...credentials, [name]: value }))
  }

  const handleSubmit = () => {
    login(credentials)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container direction="column" spacing={2} alignContent="stretch">
        <PageTitle title="Login" />

        <Grid item xs={12}>
          <FormControl>
            <TextField
              id="username"
              name="username"
              onChange={onChange}
              label="Username"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl>
            <TextField
              id="password"
              name="password"
              onChange={onChange}
              type="password"
              label="Password"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}
