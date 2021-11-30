import React from 'react'
import { usePerson } from '../../../context/PersonContext'
import { contactFields } from '../../../../constants/fields'
import PersonEditView from './PersonEditView'

export default function ContactEdit(params) {
  const { contact, setContact } = usePerson()
  return (
    <PersonEditView
      {...params}
      prev="Name"
      next="Address"
      fields={contactFields}
      data={contact}
      setData={setContact}
    />
  )
}
