import { FormControl, Input, InputLabel } from '@mui/material'

export default function ForgotPassword() {
  return (
    <>
      <div>Login</div>

      <FormControl>
        <InputLabel htmlFor="my-input">Email address</InputLabel>
        <Input id="my-input" aria-describedby="my-helper-text" />
      </FormControl>
    </>
  )
}
