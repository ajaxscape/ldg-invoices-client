import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import NaturePeopleIcon from '@mui/icons-material/NaturePeople'
import { PageTitle } from '../../fragments/PageTitle'
import { useParams } from 'react-router-dom'
import { useData } from '../../context/DataContext'
import { CustomerDetails } from '../../fragments/Customer/CustomerDetails'
import { NavButtons } from '../../fragments/Buttons/NavButtons'
import { visitSort } from '../../../utilities/sort'
import VisitGroup from '../../fragments/Visit/VisitGroup'

export default function Visits() {
  const { getVisits } = useData()
  const { customerId } = useParams()
  const [visits, setVisits] = useState()
  const [currentVisit, setCurrentVisit] = useState()
  const [prefix, setPrefix] = useState()

  useEffect(() => {
    if (customerId) {
      setPrefix(`/Customers/${customerId}`)
    }
  }, [customerId])

  useEffect(() => {
    setVisits(getVisits({ customerId }))
    const visits = getVisits({ customerId })
    const currentVisit = visits.find((visit) => visit?.tasks?.length === 0)
    if (currentVisit) {
      setCurrentVisit(currentVisit)
      setVisits(visits.filter(({ id }) => id !== currentVisit.id))
    } else {
      setVisits(visits)
    }
  }, [getVisits, customerId])

  return (
    <>
      <Grid container direction="column" spacing={2} alignContent="stretch">
        <PageTitle icon={NaturePeopleIcon} title="Visits" />
        <CustomerDetails />

        {!!currentVisit && (
          <VisitGroup
            customerId={customerId}
            visits={[currentVisit]}
            label="Current visit:"
          />
        )}

        {!!visits?.length && (
          <VisitGroup
            customerId={customerId}
            visits={visits.filter((visit) => !visit?.datePaid).sort(visitSort)}
            label="Visits not yet invoiced:"
          />
        )}

        <NavButtons backTo={prefix ?? '/Home'} />
      </Grid>
    </>
  )
}
