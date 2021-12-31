import React, { useEffect, useState } from 'react'
import domPurify from 'dompurify'
import Loader from './Loader'

export default function PrintedInvoice({ invoiceNumber, setLoading }) {
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
