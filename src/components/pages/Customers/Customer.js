import { useParams } from 'react-router-dom'
import React from 'react'
import { Grid } from '@mui/material'
import NaturePeopleIcon from '@mui/icons-material/NaturePeople'
import ReceiptIcon from '@mui/icons-material/Receipt'
import Loader from '../../fragments/Loader'
import PersonIcon from '@mui/icons-material/Person'
import { PageTitle } from '../../fragments/PageTitle'
import { MenuButton } from '../../fragments/Buttons/MenuButton'
import { CustomerDetails } from '../../fragments/CustomerDetails'
import { NavButtons } from '../../fragments/Buttons/NavButtons'
import { v4 as uuid } from 'uuid'
import AddIcon from '@mui/icons-material/Add'
import { useData } from '../../context/DataContext'

export default function Customer() {
  const { getCustomerById } = useData()
  const { customerId } = useParams()

  const customer = getCustomerById && getCustomerById(customerId)

  return (
    <Grid container direction="column" spacing={2} alignContent="stretch">
      <PageTitle icon={PersonIcon} title="Customer" />
      <CustomerDetails edit={true} showBillPayer={true} />

      {customerId ? (
        <>
          <MenuButton
            to={`/Customers/${customerId}/Visits`}
            icon={NaturePeopleIcon}
            label="Visits"
          />

          <MenuButton
            to={`/Customers/${customerId}/Invoices`}
            icon={ReceiptIcon}
            label="Invoices"
          />

          {!customer?.billPayer && (
            <MenuButton
              to={`/Customers/${customerId}/BillPayer/${uuid()}/Edit`}
              icon={AddIcon}
              label="Add Bill Payer"
            />
          )}
        </>
      ) : (
        <Loader />
      )}

      <NavButtons backTo="/Customers" />
    </Grid>
  )
}
