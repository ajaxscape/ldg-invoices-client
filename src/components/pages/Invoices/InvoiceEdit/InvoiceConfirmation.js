import { Grid } from '@mui/material'
import React from 'react'
import { useInvoice } from '../../../context/InvoiceContext'
import { PageTitle } from '../../../fragments/PageTitle'
import { NavButtons } from '../../../fragments/Buttons/NavButtons'
import { useRouteMatch } from 'react-router-dom'
import { InvoiceCard } from '../../../fragments/InvoiceCard'
import ReceiptIcon from '@mui/icons-material/Receipt'

export default function InvoiceConfirmation({ customerId, invoiceId }) {
  const { invoiceDateTime } = useInvoice()
  const { invoiceDate } = invoiceDateTime || {}

  let match = useRouteMatch()

  const path = match.path
    .replace(':customerId', customerId)
    .replace(':invoiceId', invoiceId)

  const backTo =
    path.substring(0, path.lastIndexOf('/Edit/') + 6) + 'InvoiceDetails'

  const continueTo = path.substring(0, path.lastIndexOf('/Edit/') + 6) + 'Save'

  return (
    <>
      {invoiceDate && (
        <Grid container direction="column" spacing={2} alignContent="stretch">
          <PageTitle icon={ReceiptIcon} title="Invoice" />

          <Grid item xs={12}>
            <p>You are about to save the following details:</p>
          </Grid>
          <InvoiceCard customerId={customerId} />
          <NavButtons
            backTo={backTo}
            backLabel="Back"
            continueTo={continueTo}
            continueLabel="Save"
          />
        </Grid>
      )}
    </>
  )
}
