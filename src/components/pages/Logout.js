import { useAuthentication } from '../context/AuthenticationContext'
import { useEffect } from 'react'

export default function Logout() {
  const { logout } = useAuthentication()

  useEffect(() => {
    logout()
  }, [logout])

  return null
}
