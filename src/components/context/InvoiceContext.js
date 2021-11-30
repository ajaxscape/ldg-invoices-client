import React, { useContext } from 'react'

export const InvoiceContext = React.createContext(undefined)

export const useInvoice = () => useContext(InvoiceContext)

const save = () => {}

export const InvoiceProvider = ({ children, invoiceId }) => {
  return (
    <InvoiceContext.Provider
      value={{
        save,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  )
}
