import { FullAddress } from '../FullAddress'
import React, { useEffect, useState } from 'react'
import formatName from '../../../utilities/formatName'
import formatAddress from '../../../utilities/formatAddress'
import { useParams } from 'react-router-dom'
import { useData } from '../../context/DataContext'

export function CustomerCard({ customerId, property }) {
  const params = useParams()
  const { getCustomerById } = useData()
  const [fullName, setFullName] = useState('')
  const [showAddress, setShowAddress] = useState(false)

  useEffect(() => {
    if (customerId && getCustomerById) {
      const customer = getCustomerById(customerId)
      setFullName(formatName(customer))
      if (params?.customerId) {
        if (
          formatAddress(customer?.address) === formatAddress(property?.address)
        ) {
          setShowAddress(false)
        } else {
          setShowAddress(true)
        }
      } else {
        setShowAddress(true)
      }
    }
  }, [customerId, getCustomerById])

  return (
    <>
      {!!fullName && (
        <>
          <br />
          <br />
          {fullName},
        </>
      )}
      {!!property?.address && showAddress && (
        <>
          {!fullName && (
            <>
              <br />
              <br />
            </>
          )}
          <FullAddress address={property.address} />
        </>
      )}
    </>
  )
}
