import { Typography } from '@mui/material'

export function BookingUsersTable({ users }) {
  return (
    <>
      <Typography variant="h6" paddingTop="1em">
        Visits:
      </Typography>
      {users.map((user) => (
        <p key={`user-${user.id}`}>
          {user.firstName} {user.lastName}
        </p>
      ))}
    </>
  )
}
