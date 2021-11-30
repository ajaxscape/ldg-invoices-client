import React from 'react'
import { usePerson } from '../../../context/PersonContext'
import { addressFields } from '../../../../constants/fields'
import PersonEditView from './PersonEditView'

export default function PersonAddressEdit(params) {
  const { address, setAddress } = usePerson()
  return (
    <PersonEditView
      {...params}
      prev="Contact"
      fields={addressFields}
      data={address}
      setData={setAddress}
    />
  )
}
