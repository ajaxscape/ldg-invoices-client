import {
  Redirect,
  Route,
  Switch,
  useParams,
  useRouteMatch,
} from 'react-router-dom'
import InvoiceDetailsEdit from '../../Invoices/InvoiceEdit/InvoiceDetailsEdit'
import InvoiceSave from '../../Invoices/InvoiceEdit/InvoiceSave'
import { InvoiceProvider } from '../../../context/InvoiceContext'
import InvoiceConfirmation from '../../Invoices/InvoiceEdit/InvoiceConfirmation'

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
        <Redirect from={match.path} to={`${match.path}/InvoiceDetails`} exact />
      </Switch>
    </InvoiceProvider>
  )
}
