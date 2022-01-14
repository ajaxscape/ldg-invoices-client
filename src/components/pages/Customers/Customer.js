import { useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
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
import VisitGroup from '../../fragments/VisitGroup'

export default function Customer() {
  const { getCustomerById, getVisits } = useData()
  const { customerId } = useParams()
  const [visitsForInvoice, setVisitsForInvoice] = useState([])
  const [currentVisit, setCurrentVisit] = useState()

  const customer = getCustomerById && getCustomerById(customerId)

  useEffect(() => {
    setVisitsForInvoice([])
    const visits = getVisits({ customerId })
    const visit = visits.find((visit) => visit?.tasks?.length === 0)
    if (visit) {
      setCurrentVisit(visit)
    } else {
      if (visits) {
        setVisitsForInvoice(visits)
      }
    }
  }, [getVisits, customerId])

  return (
    <Grid container direction="column" spacing={2} alignContent="stretch">
      <PageTitle icon={PersonIcon} title="Customer" />
      <CustomerDetails edit={true} showBillPayer={true} />

      {customerId ? (
        <>
          {!!currentVisit ? (
            <VisitGroup
              customerId={customerId}
              visits={[currentVisit]}
              label="Current visit:"
            />
          ) : (
            <MenuButton
              to={`/Customers/${customerId}/Visits/${uuid()}/Edit/Start`}
              icon={AddIcon}
              label="New Visit"
            />
          )}

          {!!customerId && (
            <>
              {!!visitsForInvoice?.some(({ tasks = [] }) => tasks.length) && (
                <MenuButton
                  to={`/Customers/${customerId}/Invoices/${uuid()}/Edit`}
                  icon={ReceiptIcon}
                  label="Generate Invoice"
                />
              )}
            </>
          )}

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
