import {
  Redirect,
  Route,
  Switch,
  useParams,
  useRouteMatch,
} from 'react-router-dom'
import NameEdit from './NameEdit'
import ContactEdit from './ContactEdit'
import { PersonProvider } from '../../../context/PersonContext'
import PersonAddressEdit from './PersonAddressEdit'
import PersonSave from './PersonSave'

export default function CustomerEdit() {
  let match = useRouteMatch()
  const params = useParams()
  return (
    <PersonProvider {...params}>
      <Switch>
        <Route path={`${match.path}/Name`} exact>
          <NameEdit {...params} />
        </Route>
        <Route path={`${match.path}/Contact`} exact>
          <ContactEdit {...params} />
        </Route>
        <Route path={`${match.path}/Address`} exact>
          <PersonAddressEdit {...params} />
        </Route>
        <Route path={`${match.path}/Save`} exact>
          <PersonSave {...params} />
        </Route>
        <Redirect from={match.path} to={`${match.path}/Name`} exact />
      </Switch>
    </PersonProvider>
  )
}
