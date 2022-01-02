import {
  Redirect,
  Route,
  Switch,
  useParams,
  useRouteMatch,
} from 'react-router-dom'
import VisitSave from './VisitSave'
import { VisitProvider } from '../../../context/VisitContext'
import SelectProperty from './SelectProperty'
import VisitDateTimeEdit from './VisitDateTimeEdit'
import VisitConfirmation from './VisitConfirmation'
import NotFoundComponent from '../../NotFoundComponent'

export default function VisitEdit() {
  let match = useRouteMatch()
  const params = useParams()
  return (
    <VisitProvider {...params}>
      <Switch>
        <Route path={`${match.path}/Property/Select`} exact>
          <SelectProperty {...params} />
        </Route>
        <Route path={`${match.path}/VisitDateTime`} exact>
          <VisitDateTimeEdit {...params} />
        </Route>
        <Route path={`${match.path}/Confirmation`} exact>
          <VisitConfirmation {...params} />
        </Route>
        <Route path={`${match.path}/Save`} exact>
          <VisitSave {...params} />
        </Route>
        <Redirect from={match.path} to={`${match.url}/Property/Select`} exact />
        <Route component={NotFoundComponent} />
      </Switch>
    </VisitProvider>
  )
}
