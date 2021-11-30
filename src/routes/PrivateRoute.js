import { Redirect, Route } from 'react-router-dom'
import { useAuthentication } from '../components/context/AuthenticationContext'

function PrivateRoute({ children, ...rest }) {
  const { isAuthenticated } = useAuthentication()
  return (
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
  )
}

export default PrivateRoute
