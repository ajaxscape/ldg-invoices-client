import React, { useEffect, useState } from 'react'

export function FullAddress({ address }) {
  const [addressLines, setAddressLines] = useState('')
  const [postcode, setPostcode] = useState('')

  useEffect(() => {
    if (address) {
      const {
        addressLine1 = '',
        addressLine2 = '',
        town = '',
        county = '',
        postcode = '',
      } = address
      const addressLines = [addressLine1, addressLine2, town, county]
        .filter((part) => !!part)
        .join(', ')
      setAddressLines(addressLines)
      setPostcode(postcode)
    }
  }, [address])

  return (
    <>
      {addressLines && (
        <>
          <br />
          <span> {addressLines.replace(postcode, '')}</span>
          <br />
          <span> {postcode} </span>
        </>
      )}
    </>
  )
}
