import React, { useEffect, useState } from 'react'
import { dateTimeFields } from '../../../../constants/fields'
import VisitEditView from './VisitEditView'
import { useVisit } from '../../../context/VisitContext'
import { Grid, Typography } from '@mui/material'
import VisitTasks from '../../../fragments/VisitTasks'

function VisitStatus({label, value}) {
  return (
    <Typography variant="h6" paddingY paddingX>
      {label}:<br /><small>{value}</small>
    </Typography>
  )
}

export default function VisitDateTimeEdit(params) {
  const {
    visitDateTime,
    setVisitDateTime,
    durationInMinutes,
    duration,
    timeWorked,
    timeRested,
    totalHours,
  } = useVisit()
  const [error, setError] = useState('')
  const [warning, setWarning] = useState('')

  useEffect(() => {
    if (durationInMinutes && durationInMinutes < 0) {
      setError('Finish time must be greater than Start time')
    } else if (totalHours > durationInMinutes / 60) {
      setError(
        'Total hours worked cannot be greater than the duration of the visit'
      )
    } else {
      setError('')
    }
  }, [totalHours, durationInMinutes])

  useEffect(() => {
    if (totalHours === durationInMinutes / 60) {
      setWarning('')
    } else {
      setWarning(
        `Is it ok to continue with ${timeRested} unaccounted (possibly a break) time?`
      )
    }
  }, [timeRested])

  return (
    <VisitEditView
      {...params}
      done="Finish"
      subHeading="Visit date and time"
      fields={dateTimeFields}
      data={visitDateTime}
      setData={setVisitDateTime}
      error={error}
      warning={warning}
    >
      <VisitTasks />
      <Grid item xs={12}>
        <VisitStatus label="Time worked" value={timeWorked} />
        <VisitStatus label="Length of visit" value={duration} />
        <VisitStatus label="Unaccounted time" value={timeRested} />
      </Grid>
    </VisitEditView>
  )
}
