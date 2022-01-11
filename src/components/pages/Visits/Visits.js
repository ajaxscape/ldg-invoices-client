import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import NaturePeopleIcon from '@mui/icons-material/NaturePeople'
import { PageTitle } from '../../fragments/PageTitle'
import { useParams } from 'react-router-dom'
import { useData } from '../../context/DataContext'
import MenuGroup from '../../fragments/MenuGroup'
import { CustomerDetails } from '../../fragments/CustomerDetails'
import { NavButtons } from '../../fragments/Buttons/NavButtons'
import { VisitDetails } from '../../fragments/VisitDetails'
import { MenuButton } from '../../fragments/Buttons/MenuButton'
import { v4 as uuid } from 'uuid'
import AddIcon from '@mui/icons-material/Add'
import ReceiptIcon from '@mui/icons-material/Receipt'
import { sort } from '../../../utilities/sort'

const visitSort = (
  { visitDate: dateA, startTime: timeA },
  { visitDate: dateB, startTime: timeB }
) =>
  sort(
    new Date(`${dateB} ${timeB}`).valueOf(),
    new Date(`${dateA} ${timeA}`).valueOf()
  )

function VisitGroup({ visits, label, customerId }) {
  return (
    <>
      {!!visits?.length && (
        <MenuGroup label={label}>
          {visits.map((visit) =>
            visit ? (
              <VisitDetails
                key={`visit-${visit.id}`}
                customerId={visit.customerId}
                visitId={visit.id}
                displayCustomer={visit.customerId !== customerId}
              />
            ) : null
          )}
        </MenuGroup>
      )}
    </>
  )
}

export default function Visits() {
  const { getVisits } = useData()
  const { customerId } = useParams()
  const [visits, setVisits] = useState()
  const [prefix, setPrefix] = useState()

  useEffect(() => {
    if (customerId) {
      setPrefix(`/Customers/${customerId}`)
    }
  }, [customerId])

  useEffect(() => {
    setVisits(getVisits({ customerId }))
  }, [getVisits, customerId])

  return (
    <>
      <Grid container direction="column" spacing={2} alignContent="stretch">
        <PageTitle icon={NaturePeopleIcon} title="Visits" />
        <CustomerDetails />

        {!!visits?.length && (
          <VisitGroup
            customerId={customerId}
            visits={visits.filter((visit) => !visit?.datePaid).sort(visitSort)}
            label="Visits not yet invoiced:"
          />
        )}

        {!!customerId && (
          <>
            <MenuButton
              to={`/Customers/${customerId}/Visits/${uuid()}/Edit`}
              icon={AddIcon}
              label="New Visit"
            />
            {!!visits?.some(({ tasks = [] }) => tasks.length) && (
              <MenuButton
                to={`/Customers/${customerId}/Invoices/${uuid()}/Edit`}
                icon={ReceiptIcon}
                label="Generate Invoice"
              />
            )}
          </>
        )}

        <NavButtons backTo={prefix ?? '/Home'} />
      </Grid>
    </>
  )
}
