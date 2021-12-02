import Home from './components/pages/Home'
import Visits from './components/pages/Visits/Visits'
import Invoices from './components/pages/Invoices/Invoices'
import Invoice from './components/pages/Invoices/Invoice'
import Customers from './components/pages/Customers/Customers'
import Customer from './components/pages/Customers/Customer'
import CustomerEdit from './components/pages/Customers/CustomerEdit/CustomerEdit'
import Logout from './components/pages/Logout'
import VisitEdit from './components/pages/Visits/VisitEdit/VisitEdit'
import InvoiceEdit from './components/pages/Invoices/InvoiceEdit/InvoiceEdit'

const routes = [
  {
    path: 'Home',
    component: Home,
    exact: true,
  },

  // Visits
  // ******
  {
    path: 'Visits',
    component: Visits,
    exact: true,
  },

  // Invoices
  // ********
  {
    path: 'Invoices',
    component: Invoices,
    exact: true,
  },

  // Customers
  // *********
  {
    path: 'Customers',
    component: Customers,
    exact: true,
  },
  {
    path: `Customers/:customerId`,
    component: Customer,
    exact: true,
  },
  {
    path: `Customers/:customerId/Edit`,
    component: CustomerEdit,
  },
  {
    path: `Customers/:customerId/BillPayer/:billPayerId/Edit`,
    component: CustomerEdit,
  },
  {
    path: `Customers/:customerId/Invoices`,
    component: Invoices,
    exact: true,
  },
  {
    path: `Customers/:customerId/Invoices/:invoiceId`,
    component: Invoice,
    exact: true,
  },
  {
    path: `Customers/:customerId/Invoices/:invoiceId/Edit`,
    component: InvoiceEdit,
    exact: true,
  },
  {
    path: `Customers/:customerId/Visits`,
    component: Visits,
    exact: true,
  },
  {
    path: `Customers/:customerId/Visits/:visitId/Edit`,
    component: VisitEdit,
  },

  // Logout
  // ******
  {
    path: 'Logout',
    component: Logout,
    exact: true,
  },
]

export default routes
