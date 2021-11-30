import { Redirect, Route } from 'react-router-dom'
import { useAuthentication } from '../components/context/AuthenticationContext'

function PublicRoute({ children, ...rest }) {
  const { isAuthenticated } = useAuthentication()
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !isAuthenticated() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/home',
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}

export default PublicRoute
