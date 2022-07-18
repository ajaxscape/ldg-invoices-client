import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'

import NaturePeopleIcon from '@mui/icons-material/NaturePeople'
import ReceiptIcon from '@mui/icons-material/Receipt'
import PeopleIcon from '@mui/icons-material/People'
import EventIcon from '@mui/icons-material/Event'
import { PageTitle } from '../fragments/PageTitle'
import { MenuButton } from '../fragments/Buttons/MenuButton'
import { useData } from '../context/DataContext'
import VisitGroup from '../fragments/Visit/VisitGroup'
import Loader from '../fragments/Loader'
import { useAuthentication } from '../context/AuthenticationContext'

export default function Home() {
  const { getVisits, loading } = useData()
  const { isManager } = useAuthentication()
  const [currentVisit, setCurrentVisit] = useState()

  useEffect(() => {
    const visits = getVisits()
    // The first open visit
    const currentVisit = visits.find((visit) => visit?.tasks?.length === 0)
    if (currentVisit) {
      setCurrentVisit(currentVisit)
    }
  }, [getVisits])

  return (
    <>
      {!loading ? (
        <Grid container direction="column" spacing={2} alignContent="stretch">
          <PageTitle title="Main Menu" />

          {!!currentVisit && (
            <VisitGroup visits={[currentVisit]} label="Current visit:" />
          )}

          <MenuButton to="/Bookings" icon={EventIcon} label="Bookings" />
          {isManager && (
            <>
              <MenuButton to="/Customers" icon={PeopleIcon} label="Customers" />
              <MenuButton to="/Visits" icon={NaturePeopleIcon} label="Visits" />
              <MenuButton to="/Invoices" icon={ReceiptIcon} label="Invoices" />
            </>
          )}
        </Grid>
      ) : (
        <Loader />
      )}
    </>
  )
}
