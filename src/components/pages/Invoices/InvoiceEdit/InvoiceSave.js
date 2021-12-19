import Loader from '../../../fragments/Loader'
import { useEffect, useState } from 'react'
import { useInvoice } from '../../../context/InvoiceContext'
import { Redirect, useRouteMatch } from 'react-router-dom'

export default function InvoiceSave({ customerId, invoiceId }) {
  const { save } = useInvoice()
  const [saved, setSaved] = useState(false)

  let match = useRouteMatch()

  const path = match.path
    .replace(':customerId', customerId)
    .replace(':invoiceId', invoiceId)

  useEffect(() => {
    if (save) {
      save()
      setSaved(true)
    }
  }, [save])

  return (
    <>
      {saved ? (
        <Redirect
          from={path}
          to={path.substring(0, path.lastIndexOf('/Edit/'))}
          exact
        />
      ) : (
        <Loader />
      )}
    </>
  )
}
