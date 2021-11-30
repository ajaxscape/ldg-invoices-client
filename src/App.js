import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Loader from './components/fragments/Loader'
import ProtectedRoutes from './routes/ProtectedRoutes' //Authenticated routes
import PublicRoute from './routes/PublicRoute'
import PrivateRoute from './routes/PrivateRoute'
import Header from './components/fragments/Header'
import { useGlobal } from './components/context/GlobalContext'
import Menu from './components/fragments/Menu'
import { styled } from '@mui/material/styles'
import { Container } from '@mui/material'

const Login = lazy(() => import('./components/pages/Login'))
const ForgotPassword = lazy(() => import('./components/pages/ForgotPassword'))
const NoFoundComponent = lazy(() =>
  import('./components/pages/NoFoundComponent')
)

const PREFIX = 'LdgApp'

const classes = {
  menuVisible: `${PREFIX}-menu-visible`,
  menuHidden: `${PREFIX}-menu-hidden`,
}

const Root = styled('div')(({}) => ({
  [`.${classes.menuVisible}`]: {
    display: 'inherit',
  },
  [`.${classes.menuHidden}`]: {
    display: 'none',
  },
}))

const App = () => {
  const { menuVisible } = useGlobal()

  return (
    <Root>
      <Router>
        <Header title="Lorna Donald Gardening" />
        {menuVisible && <Menu />}
        <Container
          className={menuVisible ? classes.menuHidden : classes.menuVisible}
        >
          <Suspense fallback={<Loader />}>
            <Switch>
              <PublicRoute path="/login">
                <Login />
              </PublicRoute>
              <PublicRoute path="/forgot-password">
                <ForgotPassword />
              </PublicRoute>
              <PrivateRoute path="/">
                <ProtectedRoutes />
              </PrivateRoute>
              <Route path="*">
                <NoFoundComponent />
              </Route>
            </Switch>
          </Suspense>
        </Container>
      </Router>
    </Root>
  )
}

export default App
