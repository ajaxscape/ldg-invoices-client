import Loader from '../../../fragments/Loader'
import { useEffect, useState } from 'react'
import { useVisit } from '../../../context/VisitContext'
import { Redirect, useRouteMatch } from 'react-router-dom'

export default function VisitSave({ customerId, visitId }) {
  const { save } = useVisit()
  const [saved, setSaved] = useState(false)

  let match = useRouteMatch()

  const path = match.path
    .replace(':customerId', customerId)
    .replace(':visitId', visitId)

  useEffect(() => {
    if (save) {
      save()
      setSaved(true)
    }
  }, [save])

  return (
    <>
      {saved ? (
        <Redirect
          from={path}
          to={path.substring(0, path.indexOf('/Visits/'))}
          exact
        />
      ) : (
        <Loader />
      )}
    </>
  )
}
