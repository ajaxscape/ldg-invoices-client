import NaturePeopleIcon from '@mui/icons-material/NaturePeople'
import { Grid } from '@mui/material'
import React from 'react'
import { useVisit } from '../../../context/VisitContext'
import { PageTitle } from '../../../fragments/PageTitle'
import { NavButtons } from '../../../fragments/Buttons/NavButtons'
import { useRouteMatch } from 'react-router-dom'
import { VisitCard } from '../../../fragments/VisitCard'

export default function VisitStart({ customerId, visitId }) {
  const { visitDateTime } = useVisit()
  const { visitDate } = visitDateTime || {}

  let match = useRouteMatch()

  const path = match.path
    .replace(':customerId', customerId)
    .replace(':visitId', visitId)

  const backTo = path.substring(0, path.lastIndexOf('/Visits/'))

  const continueTo = path.substring(0, path.lastIndexOf('/Edit/') + 6) + 'Save'

  return (
    <>
      {visitDate && (
        <Grid container direction="column" spacing={2} alignContent="stretch">
          <PageTitle icon={NaturePeopleIcon} title="Visit Start" />

          <Grid item xs={12}>
            <p>Please check this is correct before you press start:</p>
          </Grid>
          <VisitCard customerId={customerId} />
          <NavButtons
            backTo={backTo}
            backLabel="Cancel"
            continueTo={continueTo}
            continueLabel="Start"
          />
        </Grid>
      )}
    </>
  )
}
