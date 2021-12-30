import { useData } from '../../context/DataContext'
import { useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { Grid } from '@mui/material'
import { PageTitle } from '../../fragments/PageTitle'
import ReceiptIcon from '@mui/icons-material/Receipt'
import EmailIcon from '@mui/icons-material/Email'
import PaymentIcon from '@mui/icons-material/Payment'
import { NavButtons } from '../../fragments/Buttons/NavButtons'
import Loader from '../../fragments/Loader'
import domPurify from 'dompurify'
import { MenuButton } from '../../fragments/Buttons/MenuButton'
import { StyledModal } from '../../fragments/StyledModal'

function PrintedInvoice({ invoiceNumber, setLoading }) {
  const [response, setResponse] = useState()
  const url = `${process.env.REACT_APP_API}/invoice`

  useEffect(() => {
    if (invoiceNumber) {
      setLoading(true)
      fetch(`${url}/${invoiceNumber}`)
        .then((response) => response.text())
        .then((html) => setResponse(html))
        .catch((err) => console.warn('Something went wrong.', err))
        .finally(() => setLoading(false))
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
  const { getInvoiceById, saveInvoice } = useData()
  const { customerId, invoiceId } = useParams()
  const [invoice, setInvoice] = useState()
  const [prefix, setPrefix] = useState()
  const [sending, setSending] = useState(false)
  const [loading, setLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const sendUrl = `${process.env.REACT_APP_API}/email`

  useEffect(() => {
    if (customerId) {
      setPrefix(`/Customers/${customerId}`)
    }
  }, [customerId])

  useEffect(() => {
    setInvoice(getInvoiceById(invoiceId))
  }, [getInvoiceById, invoiceId])

  const handleSendRequest = () => {
    setModalOpen(true)
  }

  const handlePaid = () => {}

  const handleSend = () => {
    setSending(true)
    fetch(`${sendUrl}/${invoiceId}`)
      .then((response) => {
        if (response.status !== 200) {
          console.warn(
            `Looks like there was a problem. Status Code: ${response.status}`
          )
        } else {
          // Drop the date sent so that it is not overwritten
          const { dateSent, ...invoiceToSend } = invoice
          saveInvoice(customerId, invoiceToSend)
          setSending(false)
        }
      })
      .catch((err) => {
        setSending(false)
        console.warn('Something went wrong.', err)
      })
  }

  return (
    <>
      <Grid container direction="column" spacing={2} alignContent="stretch">
        <PageTitle icon={ReceiptIcon} title="Invoice" />
        {!!invoice && !sending ? (
          <>
            {!!invoice?.invoiceNumber && (
              <>
                <PrintedInvoice
                  setLoading={setLoading}
                  invoiceNumber={invoice.invoiceNumber}
                />
                {!loading && (
                  <>
                    <MenuButton
                      onClick={handleSendRequest}
                      icon={EmailIcon}
                      label={
                        !invoice?.dateSent ? 'Send Invoice' : 'Resend Invoice'
                      }
                    />
                    {!invoice?.datePaid && (
                      <MenuButton
                        onClick={handlePaid}
                        icon={PaymentIcon}
                        label="Accept Payment"
                      />
                    )}
                  </>
                )}
              </>
            )}
          </>
        ) : (
          <Loader />
        )}
        <NavButtons backTo={`${prefix ? prefix : ''}/Invoices`} />
      </Grid>
      <StyledModal
        open={modalOpen}
        setOpen={setModalOpen}
        title="Are you sure you want to send the invoice?"
        onClickYes={handleSend}
      />
    </>
  )
}
