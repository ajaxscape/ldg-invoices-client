import { useData } from '../../context/DataContext'
import { useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { Grid } from '@mui/material'
import { PageTitle } from '../../fragments/PageTitle'
import NaturePeopleIcon from '@mui/icons-material/NaturePeople'
import { CustomerDetails } from '../../fragments/CustomerDetails'
import { NavButtons } from '../../fragments/Buttons/NavButtons'
import { MenuButton } from '../../fragments/Buttons/MenuButton'
import EditIcon from '@mui/icons-material/Edit'
import { VisitDetails } from '../../fragments/VisitDetails'

export default function Visit() {
  const { getVisitById } = useData()
  const { customerId, visitId } = useParams()
  const [visit, setVisit] = useState()
  const [prefix, setPrefix] = useState()

  useEffect(() => {
    if (customerId) {
      setPrefix(`/Customers/${customerId}`)
    }
  }, [customerId])

  useEffect(() => {
    setVisit(getVisitById(visitId))
  }, [getVisitById, visitId])

  return (
    <Grid container direction="column" spacing={2} alignContent="stretch">
      <PageTitle icon={NaturePeopleIcon} title="Visit" />
      <CustomerDetails />
      <VisitDetails customerId={customerId} visitId={visitId} edit={true} />

      <MenuButton
        to={`${prefix ? prefix : ''}/Visits/${visitId}/Edit`}
        icon={EditIcon}
        label="Edit"
      />
      <NavButtons backTo={`${prefix ? prefix : ''}/Visits`} />
    </Grid>
  )
}
