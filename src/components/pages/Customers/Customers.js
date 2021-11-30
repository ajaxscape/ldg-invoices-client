import { Grid } from '@mui/material'
import React from 'react'
import AddIcon from '@mui/icons-material/Add'
import PeopleIcon from '@mui/icons-material/People'
import PersonIcon from '@mui/icons-material/Person'
import { useData } from '../../context/DataContext'
import { PageTitle } from '../../fragments/PageTitle'
import { MenuButton } from '../../fragments/Buttons/MenuButton'
import MenuGroup from '../../fragments/MenuGroup'
import { NavButtons } from '../../fragments/Buttons/NavButtons'
import { v4 as uuid } from 'uuid'

function ViewCustomerRow({ customer }) {
  const { id = '', title = '', firstName = '', lastName = '' } = customer || {}

  return (
    <MenuButton
      to={`/Customers/${id}`}
      icon={PersonIcon}
      label={[title, firstName, lastName].filter((item) => !!item).join(' ')}
      color="secondary"
    />
  )
}

export default function Customers() {
  const { customers } = useData()
  return (
    <Grid container direction="column" spacing={2} alignContent="stretch">
      <PageTitle icon={PeopleIcon} title="Customers" />

      {!!customers?.length && (
        <MenuGroup label="Active customers:">
          {customers.map((customer) => (
            <ViewCustomerRow
              key={`customer-${customer.id}`}
              customer={customer}
            />
          ))}{' '}
        </MenuGroup>
      )}

      <MenuButton
        to={`/Customers/${uuid()}/Edit`}
        icon={AddIcon}
        label="New Customer"
      />

      <NavButtons backTo="/Home" />
    </Grid>
  )
}
