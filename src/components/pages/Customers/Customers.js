import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import PeopleIcon from '@mui/icons-material/People'
import PersonIcon from '@mui/icons-material/Person'
import { useData } from '../../context/DataContext'
import { PageTitle } from '../../fragments/PageTitle'
import { MenuButton } from '../../fragments/Buttons/MenuButton'
import MenuGroup from '../../fragments/MenuGroup'
import { NavButtons } from '../../fragments/Buttons/NavButtons'
import { v4 as uuid } from 'uuid'
import { sort } from '../../../utilities/sort'
import { useAuthentication } from '../../context/AuthenticationContext'

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
  const { isManager } = useAuthentication()
  const [sortedCustomers, setSortedCustomers] = useState([])
  const [allCustomers, setAllCustomers] = useState(false)
  const dateLess15 = new Date()
  dateLess15.setDate(dateLess15.getDate() - 15)

  function sortCustomersByLastUpdate(customer) {
    const { address, updatedAt, invoices, visitsYetToBeInvoiced, ...rest } =
      customer

    const dates = [
      updatedAt,
      address.updatedAt,
      ...invoices.map(({ updatedAt }) => updatedAt),
      ...visitsYetToBeInvoiced.map(({ updatedAt }) => updatedAt),
    ].map((date) => new Date(date))

    const updated = dates.sort((dateB, dateA) => sort(dateA, dateB))[0]

    return {
      ...rest,
      updated,
    }
  }

  const byFullName = (
    { firstName: fa, lastName: la },
    { firstName: fb, lastName: lb }
  ) => sort(`${fa}--${la}`, `${fb}--${lb}`)

  useEffect(() => {
    if (customers?.length) {
      setSortedCustomers(
        customers.map(sortCustomersByLastUpdate).sort(byFullName)
      )
    }
  }, [customers])

  const handleAllCustomers = () => {
    setAllCustomers(true)
  }

  return (
    <Grid container direction="column" spacing={2} alignContent="stretch">
      <PageTitle icon={PeopleIcon} title="Customers" />

      {!!sortedCustomers?.length && (
        <MenuGroup label="Active customers:">
          {sortedCustomers
            .filter(({ updated }) => allCustomers || updated > dateLess15)
            .map((customer) => (
              <ViewCustomerRow
                key={`customer-${customer.id}`}
                customer={customer}
              />
            ))}{' '}
        </MenuGroup>
      )}

      {!allCustomers && (
        <MenuButton label="All Customers" onClick={handleAllCustomers} />
      )}

      {isManager && (
        <MenuButton
          to={`/Customers/${uuid()}/Edit`}
          icon={AddIcon}
          label="New Customer"
        />
      )}

      <NavButtons backTo="/Home" />
    </Grid>
  )
}
