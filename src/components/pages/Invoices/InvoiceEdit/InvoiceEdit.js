import {
  Redirect,
  Route,
  Switch,
  useParams,
  useRouteMatch,
} from 'react-router-dom'
import InvoiceDetailsEdit from './InvoiceDetailsEdit'
import InvoiceSave from './InvoiceSave'
import InvoiceConfirmation from './InvoiceConfirmation'
import { InvoiceProvider } from '../../../context/InvoiceContext'
import NotFoundComponent from '../../NotFoundComponent'

export default function InvoiceEdit() {
  let match = useRouteMatch()
  const params = useParams()
  return (
    <InvoiceProvider {...params}>
      <Switch>
        <Route path={`${match.path}/InvoiceDetails`} exact>
          <InvoiceDetailsEdit {...params} />
        </Route>
        <Route path={`${match.path}/Confirmation`} exact>
          <InvoiceConfirmation {...params} />
        </Route>
        <Route path={`${match.path}/Save`} exact>
          <InvoiceSave {...params} />
        </Route>
        <Redirect from={match.path} to={`${match.url}/InvoiceDetails`} exact />
        <Route component={NotFoundComponent} />
      </Switch>
    </InvoiceProvider>
  )
}
