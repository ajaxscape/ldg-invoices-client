import React, { useContext, useEffect, useState } from 'react'
import { useData } from './DataContext'

export const InvoiceContext = React.createContext(undefined)

export const useInvoice = () => useContext(InvoiceContext)

export const InvoiceProvider = ({ children, invoiceId, customerId }) => {
  const [invoiceDate, setInvoiceDate] = useState()
  const [invoiceTotal, setInvoiceTotal] = useState(0)
  const [visits, setVisits] = useState()
  const { getVisits, getInvoiceById } = useData()

  useEffect(() => {
    setVisits(getVisits({ customerId }))
    setInvoiceDate(() => (invoiceDate ? new Date(invoiceDate) : new Date()))
  }, [])

  useEffect(() => {
    if (visits?.length) {
      const invoiceTotal = visits.reduce((total, { tasks = [] }) => {
        return (
          total +
          tasks.reduce((subTotal, { quantity, price }) => {
            return subTotal + quantity * price
          }, 0)
        )
      }, 0)
      setInvoiceTotal(invoiceTotal)
    }
  }, [visits])

  const save = () => {}

  return (
    <InvoiceContext.Provider
      value={{
        setInvoiceDate,
        invoiceDate,
        invoiceTotal,
        visits,
        save,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  )
}
