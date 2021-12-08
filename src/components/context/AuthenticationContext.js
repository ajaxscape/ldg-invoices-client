import React, { useContext, useState } from 'react'

export const AuthenticationContext = React.createContext(undefined)

export const useAuthentication = () => useContext(AuthenticationContext)

const validUsers = [
  { username: 'Lorna', password: 'Timber' },
  { username: 'Ben', password: 'Cheese' },
]

export const AuthenticationProvider = ({ children }) => {
  const [user, setUser] = useState()

  const isAuthenticated = () => {
    return !!user
  }

  const login = (credentials = {}) => {
    const { username, password } = credentials
    const validUser = validUsers.find(
      (user) => user.username === username && user.password === password
    )
    if (validUser) {
      const { password, ...user } = validUser
      setUser(user)
    } else {
      setUser(undefined)
    }
  }

  const logout = () => {
    setUser(undefined)
  }

  return (
    <AuthenticationContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  )
}
