import { Grid } from '@mui/material'
import React, { useState } from 'react'
import { useInvoice } from '../../../context/InvoiceContext'
import { PageTitle } from '../../../fragments/PageTitle'
import { NavButtons } from '../../../fragments/Buttons/NavButtons'
import { Redirect, useRouteMatch } from 'react-router-dom'
import { InvoiceCard } from '../../../fragments/InvoiceCard'
import ReceiptIcon from '@mui/icons-material/Receipt'
import { StyledModal } from '../../../fragments/StyledModal'

export default function InvoiceDetailsEdit({ customerId, invoiceId }) {
  const { invoiceDate } = useInvoice()
  const [generateInvoice, setGenerateInvoice] = useState(false)
  const [generateInvoiceModalOpen, setGenerateInvoiceModalOpen] =
    useState(false)

  let match = useRouteMatch()

  const path = match.path
    .replace(':customerId', customerId)
    .replace(':invoiceId', invoiceId)

  const backTo = path.substring(0, path.lastIndexOf('/Invoices/')) + '/Visits'

  const continueTo = path.substring(0, path.lastIndexOf('/Edit/') + 6) + 'Save'

  const handleModalOpen = () => {
    setGenerateInvoiceModalOpen(true)
  }

  const handleGenerateInvoice = () => {
    setGenerateInvoice(true)
  }

  return (
    <>
      {!!generateInvoice && <Redirect to={continueTo} />}
      <Grid container direction="column" spacing={2} alignContent="stretch">
        <PageTitle icon={ReceiptIcon} title="Invoice" />
        {invoiceDate && (
          <>
            <Grid item xs={12}>
              <p>Invoice details:</p>
            </Grid>
            <InvoiceCard customerId={customerId} />
          </>
        )}
        <NavButtons
          backTo={backTo}
          backLabel="Cancel"
          continueTo={continueTo}
          continueClick={handleModalOpen}
        />
      </Grid>
      <StyledModal
        open={generateInvoiceModalOpen}
        setOpen={setGenerateInvoiceModalOpen}
        title="Are you sure you want to generate the invoice?"
        onClickYes={handleGenerateInvoice}
      />
    </>
  )
}
