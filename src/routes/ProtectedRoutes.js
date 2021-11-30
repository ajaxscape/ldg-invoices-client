import { Route, Switch } from 'react-router-dom'
import routes from '../routes' // Route list
import { DataProvider } from '../components/context/DataContext'

const ProtectedRoutes = () => (
  <DataProvider>
    <Switch>
      {routes.map(({ component: Component, path, exact, title }) => (
        <Route path={`/${path}`} key={path} exact={exact}>
          <Component path={path} title={title} />
        </Route>
      ))}
    </Switch>
  </DataProvider>
)

export default ProtectedRoutes
