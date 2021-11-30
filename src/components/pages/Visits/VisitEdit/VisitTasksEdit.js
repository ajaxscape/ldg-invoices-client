import { Redirect, useRouteMatch } from 'react-router-dom'
import { useData } from '../../../context/DataContext'
import Loader from '../../../fragments/Loader'
import { Grid } from '@mui/material'
import { v4 as uuid } from 'uuid'
import { MenuButton } from '../../../fragments/Buttons/MenuButton'
import React, { useEffect, useState } from 'react'
import { useVisit } from '../../../context/VisitContext'
import { PageTitle } from '../../../fragments/PageTitle'
import NaturePeopleIcon from '@mui/icons-material/NaturePeople'

export default function VisitTasksEdit({ customerId, visitId }) {
  const { setTasks, durationInMinutes } = useVisit()
  const { taskTypes } = useData()
  const [selectedTasks, setSelectedTasks] = useState()
  const [submitted, setSubmitted] = useState()

  let match = useRouteMatch()

  useEffect(() => {
    setSelectedTasks(
      taskTypes.map(({ taskTypeName: taskName, price }) => ({
        id: uuid(),
        taskName,
        price,
        durationInMinutes,
      }))
    )
  }, [])

  const handleSubmit = () => {
    setTasks(selectedTasks)
    setSubmitted(true)
  }

  return (
    <>
      {!!taskTypes.length ? (
        <Grid container direction="column" spacing={2} alignContent="stretch">
          <PageTitle icon={NaturePeopleIcon} title="Visit" />

          <Grid item xs={12}>
            <p>The first known task will be used.</p>
          </Grid>
          <MenuButton onClick={handleSubmit} label="Continue" />
        </Grid>
      ) : (
        <Loader />
      )}

      {!!submitted && (
        <Redirect
          from={match.path}
          to={match.path
            .replace(':customerId', customerId)
            .replace(':visitId', visitId)
            .replace('/Tasks', '/Confirmation')}
          exact
        />
      )}
    </>
  )
}
