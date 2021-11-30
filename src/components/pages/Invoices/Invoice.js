import { useData } from '../../context/DataContext'
import { useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { Grid } from '@mui/material'
import { PageTitle } from '../../fragments/PageTitle'
import ReceiptIcon from '@mui/icons-material/Receipt'
import { styled } from '@mui/material/styles'
import { CustomerDetails } from '../../fragments/CustomerDetails'
import { NavButtons } from '../../fragments/Buttons/NavButtons'

const PREFIX = 'LdgApp-View-Invoice'

const classes = {
  scaledFrame: `${PREFIX}-scaled-frame`,
}

const Root = styled('object')(({}) => ({
  [`.${classes.scaledFrame}`]: {
    zoom: '1.00',
    transform: 'scale(1.00)',
    transformOrigin: '0 0',
  },
}))

export default function Invoice() {
  const { getInvoiceById } = useData()
  const { customerId, invoiceId } = useParams()
  const [invoice, setInvoice] = useState()
  const [prefix, setPrefix] = useState()
  const [pdfUrl, setPdfUrl] = useState()

  const apiUrl = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}`

  useEffect(() => {
    if (customerId) {
      setPrefix(`/Customers/${customerId}`)
    }
  }, [customerId])

  useEffect(() => {
    setInvoice(getInvoiceById(invoiceId))
  }, [getInvoiceById, invoiceId])

  useEffect(() => {
    if (invoice) {
      setPdfUrl(`${apiUrl}/pdf/${invoice?.invoiceNumber}.pdf`)
    }
  }, [invoice])

  return (
    <Grid container direction="column" spacing={2} alignContent="stretch">
      <PageTitle icon={ReceiptIcon} title="Invoice" />
      <CustomerDetails />
      <h1>{invoice?.invoiceNumber}</h1>
      <Root data={pdfUrl} type="application/pdf">
        <iframe className={classes.scaledFrame} src={pdfUrl} />
      </Root>

      <NavButtons backTo={`${prefix ? prefix : ''}/Invoices`} />
    </Grid>
  )
}
