import NaturePeopleIcon from '@mui/icons-material/NaturePeople'
import { Grid } from '@mui/material'
import React from 'react'
import { useVisit } from '../../../context/VisitContext'
import { PageTitle } from '../../../fragments/PageTitle'
import { NavButtons } from '../../../fragments/Buttons/NavButtons'
import { useRouteMatch } from 'react-router-dom'
import { VisitCard } from '../../../fragments/VisitCard'

export default function VisitConfirmation({ customerId, visitId }) {
  const { visitDateTime } = useVisit()
  const { visitDate } = visitDateTime || {}

  let match = useRouteMatch()

  const path = match.path
    .replace(':customerId', customerId)
    .replace(':visitId', visitId)

  const backTo =
    path.substring(0, path.lastIndexOf('/Edit/') + 6) + 'VisitDateTime'

  const continueTo = path.substring(0, path.lastIndexOf('/Edit/') + 6) + 'Save'

  return (
    <>
      {visitDate && (
        <Grid container direction="column" spacing={2} alignContent="stretch">
          <PageTitle icon={NaturePeopleIcon} title="Visit" />

          <Grid item xs={12}>
            <p>You are about to save the following details:</p>
          </Grid>
          <VisitCard customerId={customerId} />
          <NavButtons
            backTo={backTo}
            backLabel="Back"
            continueTo={continueTo}
            continueLabel="Save"
          />
        </Grid>
      )}
    </>
  )
}
