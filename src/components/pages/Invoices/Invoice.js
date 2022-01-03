import { useData } from '../../context/DataContext'
import { useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { Grid, Typography } from '@mui/material'
import { PageTitle } from '../../fragments/PageTitle'
import ReceiptIcon from '@mui/icons-material/Receipt'
import EmailIcon from '@mui/icons-material/Email'
import PaymentIcon from '@mui/icons-material/Payment'
import { NavButtons } from '../../fragments/Buttons/NavButtons'
import Loader from '../../fragments/Loader'
import { MenuButton } from '../../fragments/Buttons/MenuButton'
import { StyledModal } from '../../fragments/StyledModal'
import PrintedInvoice from '../../fragments/PrintedInvoice'
import { format } from 'date-fns'

const formatDate = (date) => format(new Date(date), 'dd MMMM yyyy')

export default function Invoice() {
  const { getInvoiceById, saveInvoice, getCustomerByInvoiceId } = useData()
  const { customerId, invoiceId } = useParams()
  const [billPayer, setBillPayer] = useState()
  const [invoice, setInvoice] = useState()
  const [prefix, setPrefix] = useState()
  const [sending, setSending] = useState(false)
  const [loading, setLoading] = useState(false)
  const [filename, setFilename] = useState()
  const [sendModalOpen, setSendModalOpen] = useState(false)
  const [paymentModalOpen, setPaymentModalOpen] = useState(false)
  const [paymentTypeModalOpen, setPaymentTypeModalOpen] = useState(false)
  const sendUrl = `${process.env.REACT_APP_API}/email`
  const pdfUrl = `${process.env.REACT_APP_API}/pdf`

  useEffect(() => {
    if (customerId) {
      setPrefix(`/Customers/${customerId}`)
    }
  }, [customerId])

  useEffect(() => {
    setInvoice(getInvoiceById(invoiceId))
  }, [getInvoiceById, invoiceId])

  useEffect(() => {
    if (invoice?.updatedAt) {
      const customer = getCustomerByInvoiceId(invoiceId)
      const billPayer = customer?.billPayer || customer
      if (billPayer) {
        setBillPayer(billPayer)
      }
    }
  }, [invoice?.updatedAt])

  useEffect(() => {
    if (invoice?.invoiceNumber) {
      fetch(`${sendUrl}/pdf/${invoice?.invoiceNumber}`).then(() =>
        setFilename(`${invoice.invoiceNumber}.pdf`)
      )
    }
  }, [invoice?.invoiceNumber])

  const handleSendRequest = () => {
    setSendModalOpen(true)
  }

  const handleAcceptPaymentRequest = () => {
    setPaymentModalOpen(true)
  }

  const handleAcceptPayment = () => {
    setPaymentTypeModalOpen(true)
  }

  const acceptPayment = (paymentType) => {
    saveInvoice(customerId, {
      ...invoice,
      datePaid: format(Date.now(), 'yyyy-MM-dd'),
      paymentType,
    })
  }

  const handleAcceptCashPayment = () => acceptPayment('Cash')

  const handleAcceptBACSPayment = () => acceptPayment('BACS')

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
      <Grid
        key={`paid-${invoice?.updatedAt || ''}`}
        container
        direction="column"
        spacing={2}
        alignContent="stretch"
      >
        <PageTitle icon={ReceiptIcon} title="Invoice" />
        {!!invoice && !sending ? (
          <>
            {!!invoice?.invoiceNumber && (
              <>
                <PrintedInvoice
                  setLoading={setLoading}
                  invoiceNumber={invoice.invoiceNumber}
                />
                {!loading ? (
                  <>
                    <Grid item xs={12}>
                      <Typography variant="h6" paddingY paddingX>
                        {!!invoice?.dateSent && (
                          <>
                            Sent: {formatDate(invoice.dateSent)}
                            <br />
                          </>
                        )}
                        {!!invoice?.datePaid && (
                          <>
                            Paid: {formatDate(invoice.datePaid)} (
                            {invoice.paymentType})
                            <br />
                          </>
                        )}
                        {!!filename && (
                          <Grid item xs={12}>
                            Download:{' '}
                            <a
                              href={`${pdfUrl}/${filename}`}
                              download={filename}
                              target="_blank"
                            >
                              {filename}
                            </a>
                          </Grid>
                        )}
                      </Typography>
                    </Grid>
                    {!!billPayer?.email && (
                      <MenuButton
                        onClick={handleSendRequest}
                        icon={EmailIcon}
                        label={
                          !invoice?.dateSent ? 'Send Invoice' : 'Resend Invoice'
                        }
                      />
                    )}
                    {!invoice?.datePaid && (
                      <MenuButton
                        onClick={handleAcceptPaymentRequest}
                        icon={PaymentIcon}
                        label="Accept Payment"
                      />
                    )}
                  </>
                ) : (
                  <Loader />
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
        open={sendModalOpen}
        setOpen={setSendModalOpen}
        title="Are you sure you want to send the invoice?"
        onClickYes={handleSend}
      />
      <StyledModal
        open={paymentModalOpen}
        setOpen={setPaymentModalOpen}
        title="Are you sure you want to accept payment of the invoice?"
        onClickYes={handleAcceptPayment}
      />
      <StyledModal
        open={paymentTypeModalOpen}
        setOpen={setPaymentTypeModalOpen}
        title="Please select the type of payment"
        noLabel="BACS"
        onClickNo={handleAcceptBACSPayment}
        yesLabel="CASH"
        onClickYes={handleAcceptCashPayment}
      />
    </>
  )
}
