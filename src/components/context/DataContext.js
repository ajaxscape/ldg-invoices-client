import React, { useContext, useEffect, useRef, useState } from 'react'
import useFetch from 'react-fetch-hook'
import { v4 as uuid } from 'uuid'
import { sort } from '../../utilities/sort'
import { useGlobal } from './GlobalContext'

export const DataContext = React.createContext(undefined)

export const useData = () => useContext(DataContext)

const apiUrl = process.env.REACT_APP_API

export const DataProvider = ({ children, isManager, token, user }) => {
  const updated = useRef([])

  const [bookings, setBookings] = useState([])
  const [taskTypes, setTaskTypes] = useState([])
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [customerToSave, setCustomerToSave] = useState()
  const [syncTick, setSyncTick] = useState(0)
  const { setSyncing, setError } = useGlobal()

  const decorateUrl = (url) =>
    !!isManager
      ? url
      : `${url}${url.includes('?') ? '&' : '?'}userEmail=${user.email}`

  const getRequestOptions = ({ body }) => {
    return {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }
  }

  const { data: customerData } = useFetch(
    decorateUrl(`${apiUrl}/api/customers?includeVisits=true`),
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  const { data: taskTypeData } = useFetch(decorateUrl(`${apiUrl}/task-types`), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const { data: bookingData } = useFetch(
    decorateUrl(`${apiUrl}/api/bookings?includeVisits=true&includeUsers=true`),
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  useEffect(() => {
    if (Array.isArray(customerData)) {
      setCustomers((customers) => {
        return [
          // All the customers not returned from the fetch
          ...customers.filter(
            ({ id }) =>
              !customerData.find((fetchedCustomer) => fetchedCustomer.id === id)
          ),
          // All the customers returned from the fetch
          ...customerData.map((fetchedCustomer) => {
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
      setLoading(false)
    }
  }, [customerData])

  useEffect(() => {
    if (Array.isArray(taskTypeData)) {
      setTaskTypes(taskTypeData)
    }
  }, [taskTypeData])

  useEffect(() => {
    if (Array.isArray(bookingData)) {
      setBookings(bookingData)
    }
  }, [bookingData])

  const syncCustomer = (customerId) => {
    if (!updated.current.includes(customerId)) {
      updated.current.push(customerId)
      setSyncing(true)
    }
  }

  const saveCustomerById = async (customerId) => {
    try {
      const customerToSave = getCustomerById(customerId)

      const { title, firstName, lastName } = customerToSave
      console.log(`Saving: ${title} ${firstName} ${lastName}`)

      const response = await fetch(
        `${apiUrl}/api/customers`,
        getRequestOptions({ body: customerToSave })
      )

      if (response.status !== 200) {
        setError(true)
        syncCustomer(customerId)
      } else {
        const savedCustomer = await response.json()
        if (savedCustomer?.id) {
          setCustomers((customers) =>
            customers.map((customer) =>
              customer.id === savedCustomer.id ? savedCustomer : customer
            )
          )
          setSyncing(false)
        } else {
          syncCustomer(customerId)
        }
      }
    } catch {
      syncCustomer(customerId)
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
        newCustomers = customers.map((customer) => {
          if (customer.id === customerToSave.id) {
            customerToSave.properties = customerToSave?.properties?.map(
              ({ address, ...property }) =>
                address.id === customerToSave.address.id
                  ? { ...property, address: { ...customerToSave.address } }
                  : { ...property, address }
            )
            return customerToSave
          } else {
            return customer
          }
        })
      } else {
        if (!customerToSave.address.id) {
          customerToSave.address.id = uuid()
        }
        newCustomers = [
          ...customers,
          {
            // Remember to initialise the following if they don't exist
            properties: [{ id: uuid(), address: customerToSave.address }],
            visitsYetToBeInvoiced: [],
            invoices: [],
            customerTaskTypes: taskTypes.map(({ id, ...taskType }) => taskType),
            ...customerToSave,
          },
        ]
      }
      return newCustomers
    })
    // Initiate save as soon as possible
    syncCustomer(customerToSave.id)
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

  const getInvoices = (params = {}) => {
    const { customerId } = params
    return customers
      .filter((customer) => !customerId || customer?.id === customerId)
      .flatMap(({ invoices }) => invoices)
      .sort((invoiceA, invoiceB) =>
        sort(invoiceA.invoiceNumber, invoiceB.invoiceNumber)
      )
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

  const getBookingById = (bookingId) => {
    return bookings.find(({ id }) => id === bookingId)
  }

  const getBookings = (params = {}) => {
    const { customerId } = params
    return bookings.filter(
      (booking) => !customerId || booking.property.customer.id === customerId
      // (!customerId || booking.property.customer.id === customerId) &&
      // booking.visits.length === 0
    )
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
        bookings,
        getCustomerById,
        getCustomerByInvoiceId,
        saveCustomer,
        getInvoices,
        getInvoiceById,
        saveInvoice,
        getVisits,
        getVisitById,
        saveVisit,
        getBookingById,
        getBookings,
        loading,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}
