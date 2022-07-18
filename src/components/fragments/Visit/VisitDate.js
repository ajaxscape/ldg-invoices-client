import formatDate from '../../../utilities/formatDate'
import formatTime from '../../../utilities/formatTime'
import React from 'react'
import { useVisit } from '../../context/VisitContext'

export function VisitDate() {
  const { visitDateTime } = useVisit()
  const { visitDate, startTime, finishTime } = visitDateTime || {}

  return (
    <strong>
      {!!visitDate && (
        <>
          {formatDate(visitDate)}
          <br />
          {formatTime(startTime)}
          {formatTime(startTime) !== formatTime(finishTime) && (
            <> to {formatTime(finishTime)}</>
          )}
        </>
      )}
    </strong>
  )
}
