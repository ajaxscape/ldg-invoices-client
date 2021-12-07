import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import ReceiptIcon from '@mui/icons-material/Receipt'
import { PageTitle } from '../../fragments/PageTitle'
import { MenuButton } from '../../fragments/Buttons/MenuButton'
import { useParams } from 'react-router-dom'
import { useData } from '../../context/DataContext'
import MenuGroup from '../../fragments/MenuGroup'
import { CustomerDetails } from '../../fragments/CustomerDetails'
import { NavButtons } from '../../fragments/Buttons/NavButtons'

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
          {invoices.map((invoice) => (
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
  const [invoices, setInvoices] = useState()
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
        invoices={invoices?.filter((invoice) => !invoice?.datePaid)}
        label="Unpaid Invoices:"
      />

      <InvoiceGroup
        prefix={prefix}
        invoices={invoices?.filter((invoice) => !!invoice?.datePaid)}
        label="Paid Invoices:"
      />

      <NavButtons backTo={prefix ?? '/Home'} />
    </Grid>
  )
}
