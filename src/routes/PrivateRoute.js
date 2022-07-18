import { Redirect, Route } from 'react-router-dom'
import { useAuthentication } from '../components/context/AuthenticationContext'
import { DataProvider } from '../components/context/DataContext'
import { useEffect, useState } from 'react'

function PrivateRoute({ children, ...rest }) {
  const { isAuthenticated, isManager, token, user } = useAuthentication()
  const [userEmail, setUserEmail] = useState()

  useEffect(() => {
    if (user) {
      setUserEmail(user.email)
    }
  }, [user])

  return (
    <>
      {!!userEmail && (
        <DataProvider isManager={isManager} token={token} user={user}>
          <Route
            {...rest}
            render={({ location }) =>
              isAuthenticated() ? (
                children
              ) : (
                <Redirect
                  to={{
                    pathname: '/login',
                    state: { from: location },
                  }}
                />
              )
            }
          />
        </DataProvider>
      )}
    </>
  )
}

export default PrivateRoute
