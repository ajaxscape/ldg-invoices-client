import { useVisit } from '../../../context/VisitContext'
import React, { useEffect, useState } from 'react'
import { Redirect, useRouteMatch } from 'react-router-dom'
import { useData } from '../../../context/DataContext'
import { MenuButton } from '../../../fragments/Buttons/MenuButton'
import { Grid } from '@mui/material'
import { PageTitle } from '../../../fragments/PageTitle'
import NaturePeopleIcon from '@mui/icons-material/NaturePeople'

export default function SelectProperty({ customerId, visitId }) {
  let match = useRouteMatch()
  const [properties, setProperties] = useState()
  const { getCustomerById } = useData()
  const { property, setProperty } = useVisit()

  useEffect(() => {
    if (getCustomerById) {
      const { properties } = getCustomerById(customerId)
      setProperties(properties)
    }
  }, [getCustomerById])

  const handleClick = () => {
    setProperty(properties[0])
  }

  return (
    <>
      {!!property && (
        <Redirect
          from={match.path}
          to={match.path
            .replace(':customerId', customerId)
            .replace(':visitId', visitId)
            .replace('/Property/Select', '/VisitDateTime')}
          exact
        />
      )}
      {properties?.length && (
        <Grid container direction="column" spacing={2} alignContent="stretch">
          <PageTitle icon={NaturePeopleIcon} title="Visit" />

          <Grid item xs={12}>
            <p>The first known property will be used.</p>
          </Grid>
          <MenuButton onClick={handleClick} label="Continue" />
        </Grid>
      )}
    </>
  )
}
