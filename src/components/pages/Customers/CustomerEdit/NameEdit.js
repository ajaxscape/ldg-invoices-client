import React from 'react'
import { usePerson } from '../../../context/PersonContext'
import { nameFields } from '../../../../constants/fields'
import PersonEditView from './PersonEditView'

export default function NameEdit(params) {
  const { name, setName } = usePerson()
  return (
    <PersonEditView
      {...params}
      next="Contact"
      fields={nameFields}
      data={name}
      setData={setName}
    />
  )
}
