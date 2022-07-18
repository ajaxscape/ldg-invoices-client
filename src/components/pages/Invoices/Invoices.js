import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ReceiptIcon from '@mui/icons-material/Receipt'
import { PageTitle } from '../../fragments/PageTitle'
import { MenuButton } from '../../fragments/Buttons/MenuButton'
import { useParams } from 'react-router-dom'
import { useData } from '../../context/DataContext'
import MenuGroup from '../../fragments/MenuGroup'
import { CustomerDetails } from '../../fragments/Customer/CustomerDetails'
import { NavButtons } from '../../fragments/Buttons/NavButtons'
import { sort } from '../../../utilities/sort'

const getMostRecentlyPaidInvoices = (invoices, max) => {
  return (
    invoices
      .filter(
        // Invoices that have been paid
        ({ datePaid }) => datePaid
      )
      // Only the latest 10
      .sort(({ datePaid: a }, { datePaid: b }) => sort(a, b))
      .slice(invoices.length > max ? invoices.length - max : 0)
  )
}

const getUnpaidInvoices = (invoices) =>
  invoices.filter(({ datePaid }) => !datePaid)

function InvoiceRow({ invoice, prefix }) {
  const { id = '', invoiceNumber = '' } = invoice || {}

  return (
    <MenuButton
      to={`${prefix ? prefix : ''}/Invoices/${id}`}
      icon={ReceiptIcon}
      label={invoiceNumber}
      color="secondary"
    />
  )
}

function InvoiceGroup({ invoices, label, prefix }) {
  return (
    <>
      {!!invoices?.length && (
        <MenuGroup label={label}>
          {invoices
            .sort(({ invoiceNumber: a }, { invoiceNumber: b }) => sort(b, a))
            .map((invoice) => (
              <InvoiceRow
                key={`invoice-${invoice.id}`}
                invoice={invoice}
                prefix={prefix}
              />
            ))}
        </MenuGroup>
      )}
    </>
  )
}

export default function Invoices() {
  const { getInvoices } = useData()
  const { customerId } = useParams()
  const [invoices, setInvoices] = useState([])
  const [prefix, setPrefix] = useState()

  useEffect(() => {
    if (customerId) {
      setPrefix(`/Customers/${customerId}`)
    }
  }, [customerId])

  useEffect(() => {
    setInvoices(getInvoices({ customerId }))
  }, [getInvoices, customerId])

  return (
    <Grid container direction="column" spacing={2} alignContent="stretch">
      <PageTitle icon={ReceiptIcon} title="Invoices" />
      <CustomerDetails />

      <InvoiceGroup
        prefix={prefix}
        invoices={getUnpaidInvoices(invoices)}
        label="Unpaid Invoices:"
      />

      <InvoiceGroup
        prefix={prefix}
        invoices={getMostRecentlyPaidInvoices(invoices, 10)}
        label="Recent paid Invoices:"
      />

      <NavButtons backTo={prefix ?? '/Home'} />
    </Grid>
  )
}
