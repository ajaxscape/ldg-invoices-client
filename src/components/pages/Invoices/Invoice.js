import { useData } from '../../context/DataContext'
import { useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { Grid } from '@mui/material'
import { PageTitle } from '../../fragments/PageTitle'
import ReceiptIcon from '@mui/icons-material/Receipt'
import { NavButtons } from '../../fragments/Buttons/NavButtons'
import Loader from '../../fragments/Loader'
import domPurify from 'dompurify'

function PrintedInvoice({ invoiceNumber }) {
  const [response, setResponse] = useState()
  const url = `${process.env.REACT_APP_API}/invoice`

  useEffect(() => {
    if (invoiceNumber) {
      fetch(`${url}/${invoiceNumber}`)
        .then(function (response) {
          // The API call was successful!
          return response.text()
        })
        .then(function (html) {
          // This is the HTML from our response as a text string
          console.log(html)
          return setResponse(html)
        })
        .catch(function (err) {
          // There was an error
          console.warn('Something went wrong.', err)
        })
    }
  }, [invoiceNumber])

  return (
    <>
      {!!response ? (
        <div
          dangerouslySetInnerHTML={{ __html: domPurify.sanitize(response) }}
        />
      ) : (
        <Loader />
      )}
    </>
  )
}

export default function Invoice() {
  const { getInvoiceById } = useData()
  const { customerId, invoiceId } = useParams()
  const [invoice, setInvoice] = useState()
  const [prefix, setPrefix] = useState()

  useEffect(() => {
    if (customerId) {
      setPrefix(`/Customers/${customerId}`)
    }
  }, [customerId])

  useEffect(() => {
    setInvoice(getInvoiceById(invoiceId))
  }, [getInvoiceById, invoiceId])

  return (
    <Grid container direction="column" spacing={2} alignContent="stretch">
      <PageTitle icon={ReceiptIcon} title="Invoice" />
      {!!invoice?.invoiceNumber && (
        <PrintedInvoice invoiceNumber={invoice.invoiceNumber} />
      )}
      <NavButtons backTo={`${prefix ? prefix : ''}/Invoices`} />
    </Grid>
  )
}
