import React, { useContext, useState } from 'react'

export const InvoiceContext = React.createContext(undefined)

export const useInvoice = () => useContext(InvoiceContext)

const save = () => {}

export const InvoiceProvider = ({ children, invoiceId, customerId }) => {
  const [invoiceDateTime, setInvoiceDateTime] = useState({})
  return (
    <InvoiceContext.Provider
      value={{
        setInvoiceDateTime,
        invoiceDateTime,
        save,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  )
}
