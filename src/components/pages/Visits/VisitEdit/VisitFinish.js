import NaturePeopleIcon from '@mui/icons-material/NaturePeople'
import { v4 as uuid } from 'uuid'
import { Grid } from '@mui/material'
import React, { useEffect } from 'react'
import { useVisit } from '../../../context/VisitContext'
import { PageTitle } from '../../../fragments/PageTitle'
import { NavButtons } from '../../../fragments/Buttons/NavButtons'
import { useRouteMatch } from 'react-router-dom'
import { VisitCard } from '../../../fragments/VisitCard'

export default function VisitFinish({ customerId, visitId }) {
  const { visitDateTime, tasks, setTasks, durationInMinutes, taskTypes } =
    useVisit()
  const { visitDate } = visitDateTime || {}

  let match = useRouteMatch()

  const path = match.path
    .replace(':customerId', customerId)
    .replace(':visitId', visitId)

  const backTo = path.substring(0, path.lastIndexOf('/Visits/') + 8)

  const continueTo = path.substring(0, path.lastIndexOf('/Edit/') + 6) + 'Save'

  useEffect(() => {
    if (tasks && !tasks.length && durationInMinutes && taskTypes?.length) {
      const taskType = taskTypes[0]
      const { taskTypeName: taskName, price } = taskType
      const hours = durationInMinutes % 60
      const minutes = durationInMinutes - hours * 60
      const task = {
        id: uuid(),
        taskName,
        price,
        taskType,
        quantity: hours + minutes / 60,
      }
      setTasks([task])
    }
  }, [durationInMinutes, taskTypes])

  return (
    <>
      {visitDate && (
        <Grid container direction="column" spacing={2} alignContent="stretch">
          <PageTitle icon={NaturePeopleIcon} title="Visit save" />

          <Grid item xs={12}>
            <p>Please check this is correct before you press save:</p>
          </Grid>
          <VisitCard
            customerId={customerId}
            editText="Edit if required"
            editLink={
              path.substring(0, path.lastIndexOf('/Edit/') + 6) +
              'VisitDateTime'
            }
          />
          <NavButtons
            backTo={backTo}
            backLabel="Cancel"
            continueTo={continueTo}
            continueLabel="Save"
          />
        </Grid>
      )}
    </>
  )
}
