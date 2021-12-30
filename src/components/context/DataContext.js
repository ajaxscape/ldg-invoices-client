import React, { useContext, useEffect, useRef, useState } from 'react'
import useFetch from 'react-fetch-hook'
import { v4 as uuid } from 'uuid'

export const DataContext = React.createContext(undefined)

export const useData = () => useContext(DataContext)

const apiUrl = process.env.REACT_APP_API

export const DataProvider = ({ children }) => {
  const updated = useRef([])

  const [taskTypes, setTaskTypes] = useState([])
  const [customers, setCustomers] = useState([])
  const [customerToSave, setCustomerToSave] = useState()
  const [syncTick, setSyncTick] = useState(0)

  const getRequestOptions = ({ body }) => {
    return {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }
  }

  const { data } = useFetch(`${apiUrl}/customers`)
  const { data: taskTypeData } = useFetch(`${apiUrl}/task-types`)

  useEffect(() => {
    if (Array.isArray(data)) {
      setCustomers((customers) => {
        return [
          // All the customers not returned from the fetch
          ...customers.filter(
            ({ id }) =>
              !data.find((fetchedCustomer) => fetchedCustomer.id === id)
          ),
          // All the customers returned from the fetch
          ...data.map((fetchedCustomer) => {
            const currentCustomer = customers.find(
              ({ id }) => id === fetchedCustomer.id
            )
            if (currentCustomer) {
              // Updated customer
              return { ...currentCustomer, ...fetchedCustomer }
            } else {
              // New customer
              return fetchedCustomer
            }
          }),
        ]
      })
    }
  }, [data])

  useEffect(() => {
    if (Array.isArray(taskTypeData)) {
      setTaskTypes(taskTypeData)
    }
  }, [taskTypeData])

  const saveCustomerById = async (customerId) => {
    try {
      const customerToSave = getCustomerById(customerId)

      const { title, firstName, lastName } = customerToSave
      console.log(`Saving: ${title} ${firstName} ${lastName}`)

      const response = await fetch(
        `${apiUrl}/customers`,
        getRequestOptions({ body: customerToSave })
      )
      const savedCustomer = await response.json()
      if (savedCustomer?.id) {
        setCustomers((customers) =>
          customers.map((customer) =>
            customer.id === savedCustomer.id ? savedCustomer : customer
          )
        )
      } else {
        if (!updated.current.includes(customerId)) {
          updated.current.push(customerId)
        }
      }
    } catch {
      if (!updated.current.includes(customerId)) {
        updated.current.push(customerId)
      }
    }
  }

  useEffect(() => {
    if (syncTick) {
      console.log('sync')
      while (updated.current.length) {
        const customerId = updated.current.pop()
        saveCustomerById(customerId)
      }
    }
  }, [syncTick])

  // Sync customer data
  useEffect(() => {
    let interval

    const processSync = async () => {
      console.log('sync started')
      interval = setInterval(() => setSyncTick((tick) => tick + 1), 10000)
    }

    processSync()
    return () => {
      clearInterval(interval)
      console.log('sync stopped')
    }
  }, [])

  const saveCustomer = (customerToSave) => {
    setCustomers((customers) => {
      let newCustomers
      if (customers.find(({ id }) => id === customerToSave.id)) {
        newCustomers = customers.map((customer) =>
          customer.id === customerToSave.id ? customerToSave : customer
        )
      } else {
        newCustomers = [
          ...customers,
          {
            // Remember to initialise the following if they don't exist
            properties: [{ id: uuid(), address: customerToSave.address }],
            visitsYetToBeInvoiced: [],
            invoices: [],
            ...customerToSave,
          },
        ]
      }
      return newCustomers
    })
    // Initiate save as soon as possible
    if (!updated.current.includes(customerToSave.id)) {
      updated.current.push(customerToSave.id)
    }
    setSyncTick((tick) => tick + 1)
  }

  const getCustomerById = (customerId) => {
    if (customers?.length) {
      return customers.find(({ id }) => id === customerId)
    }
  }

  const getCustomerByInvoiceId = (invoiceId) => {
    if (customers?.length) {
      return customers.find(({ invoices }) =>
        invoices.some((invoice) => invoice.id === invoiceId)
      )
    }
  }

  const sort = (a, b) => {
    if (a < b) {
      return -1
    }
    if (a > b) {
      return 1
    }
    return 0
  }

  const getInvoices = (params = {}) => {
    const { customerId } = params
    return customers
      .filter((customer) => !customerId || customer?.id === customerId)
      .flatMap(({ invoices }) => invoices)
      .sort(({ invoiceNumber: a }, { invoiceNumber: b }) => sort(a, b))
  }

  const getInvoiceById = (invoiceId) => {
    return getInvoices().find(({ id }) => id === invoiceId)
  }

  const getVisits = (params = {}) => {
    const { customerId } = params
    return customers
      .filter((customer) => !customerId || customer?.id === customerId)
      .flatMap(({ visitsYetToBeInvoiced, id }) =>
        visitsYetToBeInvoiced.map((visit) => ({ ...visit, customerId: id }))
      )
      .sort((visitA, visitB) =>
        sort(
          `${visitA.visitDate} ${visitA.startTime}`,
          `${visitB.visitDate} ${visitB.startTime}`
        )
      )
  }

  const getVisitById = (visitId) => {
    return getVisits().find(({ id }) => id === visitId)
  }

  const saveVisit = (customerId, visitToSave) => {
    const customer = getCustomerById(customerId)
    const visits = [...customer.visitsYetToBeInvoiced]
    const visitIndex = visits.findIndex(({ id }) => id === visitToSave.id)
    if (visitIndex === -1) {
      visits.push(visitToSave)
    } else {
      visits[visitIndex] = visitToSave
    }
    setCustomerToSave({ ...customer, visitsYetToBeInvoiced: visits })
  }

  const saveInvoice = (customerId, invoiceToSave) => {
    const { invoices = [], ...customer } = customerId
      ? getCustomerById(customerId)
      : getCustomerByInvoiceId(invoiceToSave?.id)
    const visitIds = invoiceToSave.visits?.map(({ id }) => id)
    const invoiceIndex = invoices.findIndex(({ id }) => id === invoiceToSave.id)
    if (invoiceIndex > -1) {
      invoices[invoiceIndex] = invoiceToSave
    } else {
      invoices.push(invoiceToSave)
    }
    customer.visitsYetToBeInvoiced = customer.visitsYetToBeInvoiced.filter(
      ({ id }) => !visitIds.includes(id)
    )
    setCustomerToSave({ ...customer, invoices: [...invoices] })
  }

  useEffect(() => {
    if (customerToSave) {
      saveCustomer(customerToSave)
      setCustomerToSave(undefined)
    }
  }, [customerToSave])

  return (
    <DataContext.Provider
      value={{
        customers,
        taskTypes,
        getCustomerById,
        getCustomerByInvoiceId,
        saveCustomer,
        getInvoices,
        getInvoiceById,
        saveInvoice,
        getVisits,
        getVisitById,
        saveVisit,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}
