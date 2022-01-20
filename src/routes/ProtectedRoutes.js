import { Route, Switch } from 'react-router-dom'
import routes from '../routes' // Route list
import NotFoundComponent from '../components/pages/NotFoundComponent'

const ProtectedRoutes = () => (
  <Switch>
    {routes.map(({ component: Component, path, exact, title }) => (
      <Route path={`/${path}`} key={path} exact={exact}>
        <Component path={path} title={title} />
      </Route>
    ))}
    <Route component={NotFoundComponent} />
  </Switch>
)

export default ProtectedRoutes
