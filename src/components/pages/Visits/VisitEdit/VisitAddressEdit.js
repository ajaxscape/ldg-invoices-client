import React from 'react'
import { addressFields } from '../../../../constants/fields'
import VisitEditView from './VisitEditView'
import { useVisit } from '../../../context/VisitContext'

export default function VisitAddressEdit(params) {
  const { address, setAddress } = useVisit()
  return (
    <VisitEditView
      {...params}
      prev="Property/Select"
      fields={addressFields}
      data={address}
      setData={setAddress}
    />
  )
}
