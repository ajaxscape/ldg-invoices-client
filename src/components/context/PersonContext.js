import React, { useContext, useEffect, useState } from 'react'
import { useData } from './DataContext'
import formatName from '../../utilities/formatName'

export const PersonContext = React.createContext(undefined)

export const usePerson = () => useContext(PersonContext)

export const PersonProvider = ({ children, customerId, billPayerId }) => {
  const [name, setName] = useState({})
  const [contact, setContact] = useState({})
  const [address, setAddress] = useState({})
  const [fullName, setFullName] = useState('')
  const { getCustomerById, saveCustomer } = useData()

  useEffect(() => {
    let person
    if (customerId) {
      person = getCustomerById(customerId)
      if (billPayerId) {
        person = person?.billPayer || {}
      }
    }
    if (person) {
      const { address, phone, email, id, billPayer, ...name } = person
      setName({ ...name })
      setContact({ phone, email })
      setAddress({ ...address })
    }
  }, [customerId, billPayerId])

  useEffect(() => {
    if (name) {
      setFullName(formatName(name))
    }
  }, [name])

  const save = () => {
    let customer = getCustomerById(customerId) || {
      id: customerId,
    }
    const originalPerson = billPayerId
      ? customer?.billPayer || { id: billPayerId }
      : customer
    const changedPerson = { ...originalPerson, ...name, ...contact, address }
    if (billPayerId) {
      customer.billPayer = changedPerson
      saveCustomer(customer)
    } else {
      if (changedPerson?.paysOwnBills) {
        delete changedPerson.billPayer
      }
      saveCustomer(changedPerson)
    }
  }

  return (
    <PersonContext.Provider
      value={{
        name,
        setName,
        contact,
        setContact,
        address,
        setAddress,
        fullName,
        save,
      }}
    >
      {children}
    </PersonContext.Provider>
  )
}
