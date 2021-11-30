import { Grid } from '@mui/material'
import React from 'react'

import NaturePeopleIcon from '@mui/icons-material/NaturePeople'
import ReceiptIcon from '@mui/icons-material/Receipt'
import PeopleIcon from '@mui/icons-material/People'
import { PageTitle } from '../fragments/PageTitle'
import { MenuButton } from '../fragments/Buttons/MenuButton'

export default function Home() {
  return (
    <Grid container direction="column" spacing={2} alignContent="stretch">
      <PageTitle title="Main Menu" />

      <MenuButton to="/Customers" icon={PeopleIcon} label="Customers" />
      <MenuButton to="/Visits" icon={NaturePeopleIcon} label="Visits" />
      <MenuButton to="/Invoices" icon={ReceiptIcon} label="Invoices" />
    </Grid>
  )
}
