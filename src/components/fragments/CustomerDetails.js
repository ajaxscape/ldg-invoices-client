import { Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useData } from '../context/DataContext'
import { useParams } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import { PersonCard } from './PersonCard'
import { PersonProvider } from '../context/PersonContext'

const PREFIX = 'LdgApp-Customer-Details'

const classes = {
  label: `${PREFIX}-label`,
}

const Root = styled('div')(({ theme }) => ({
  [`.${classes.label}`]: {
    marginLeft: theme.spacing(3.5),
    marginTop: theme.spacing(1.5),
  },
}))

export function CustomerDetails({ edit, showBillPayer }) {
  const data = useData()
  const { customerId } = useParams()
  const [customer, setCustomer] = useState()

  useEffect(() => {
    setCustomer(data?.getCustomerById(customerId))
  }, [data?.getCustomerById])

  const handleDeleteBillPayer = () => {
    const { billPayer, ...updatedCustomer } = customer
    data.saveCustomer(updatedCustomer)
  }

  return (
    <Root>
      {!!customer && (
        <PersonProvider customerId={customerId}>
          <PersonCard
            person={customer}
            editLink={edit ? `/Customers/${customerId}/Edit` : null}
          />
        </PersonProvider>
      )}
      {!!showBillPayer && !!customer?.billPayer && (
        <>
          <Typography variant="h6" className={classes.label}>
            Bill payer:
          </Typography>
          <PersonProvider
            customerId={customerId}
            billPayerId={customer.billPayer.id}
          >
            <PersonCard
              person={customer?.billPayer}
              isBillPayer
              editLink={
                edit
                  ? `/Customers/${customerId}/BillPayer/${customer?.billPayer?.id}/Edit`
                  : null
              }
              onDelete={handleDeleteBillPayer}
            />
          </PersonProvider>
        </>
      )}
    </Root>
  )
}
