import React, { useContext, useEffect, useState } from 'react'
import { useGoogleLogin, useGoogleLogout } from 'react-google-login'

export const AuthenticationContext = React.createContext(undefined)

export const useAuthentication = () => useContext(AuthenticationContext)

const apiUrl = process.env.REACT_APP_API

const getRefreshTiming = (expiresAt) => {
  const now = Date.now()
  const fiveMinutes = 5 * 60 * 1000
  return expiresAt - fiveMinutes - now
}

export const AuthenticationProvider = ({ children }) => {
  const [user, setUser] = useState({})
  const [token, setToken] = useState(localStorage.getItem('authToken'))
  const isDevelopment = process.env.REACT_APP_ENVIRONMENT === 'development'

  const isAuthenticated = () => {
    return !!user?.id
  }

  const refreshTokenSetup = (res) => {
    if (isDevelopment) {
      return // skip token refresh
    }

    let refreshTiming = getRefreshTiming(res.tokenObj.expires_at)

    const refreshToken = async () => {
      if (isAuthenticated()) {
        const newAuthRes = await res.reloadAuthResponse()
        refreshTiming = getRefreshTiming(newAuthRes.expires_at)
        const token = newAuthRes.id_token
        setToken(token)

        setTimeout(refreshToken, refreshTiming)
      }
    }

    // Setup first refresh timer
    setTimeout(refreshToken, refreshTiming)
  }

  useEffect(() => {
    localStorage.setItem('authToken', token)
  }, [token])

  const onLogoutSuccess = () => {
    setUser({})
    setToken(null)
  }

  const onFailure = () => {
    setUser({})
    setToken(null)
  }

  const { signOut } = useGoogleLogout({
    onLogoutSuccess,
    onFailure,
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    accessType: 'offline',
  })

  const onSuccess = async (res) => {
    const response = await fetch(`${apiUrl}/auth/login`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${res?.tokenId}`,
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) {
      const user = await response.json()

      if (user) {
        setUser(user)
        setToken(res.tokenId)
        refreshTokenSetup(res)
      } else {
        signOut()
      }
    } else {
      signOut()
    }
  }

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    isSignedIn: true,
    accessType: 'offline',
  })

  return (
    <AuthenticationContext.Provider
      value={{
        user,
        login: isDevelopment
          ? () => onSuccess({ tokenId: 'test-token' })
          : signIn,
        logout: isDevelopment ? onLogoutSuccess : signOut,
        token,
        isAuthenticated,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  )
}
