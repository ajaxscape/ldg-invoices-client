import Loader from '../../../fragments/Loader'
import { useEffect, useState } from 'react'
import { usePerson } from '../../../context/PersonContext'
import { Redirect, useRouteMatch } from 'react-router-dom'

export default function PersonSave({ customerId, billPayerId }) {
  const { save } = usePerson()
  const [saved, setSaved] = useState(false)

  let match = useRouteMatch()

  const path = match.path
    .replace(':customerId', customerId)
    .replace(':billPayerId', billPayerId)

  useEffect(() => {
    if (save) {
      save()
      setSaved(true)
    }
  }, [save])

  return (
    <>
      {saved ? (
        <Redirect from={path} to={`/Customers/${customerId}`} exact />
      ) : (
        <Loader />
      )}
    </>
  )
}
