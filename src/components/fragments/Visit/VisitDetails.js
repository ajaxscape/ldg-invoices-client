import React, { useEffect, useState } from 'react'
import { useData } from '../../context/DataContext'
import { styled } from '@mui/material/styles'
import { VisitCard } from './VisitCard'
import { VisitProvider } from '../../context/VisitContext'

const PREFIX = 'LdgApp-Visit-Details'

const classes = {
  label: `${PREFIX}-label`,
}

const Root = styled('div')(({ theme }) => ({
  [`.${classes.label}`]: {
    marginLeft: theme.spacing(3.5),
    marginTop: theme.spacing(1.5),
  },
}))

export function VisitDetails({ customerId, visitId, displayCustomer }) {
  const data = useData()
  const [visit, setVisit] = useState()

  useEffect(() => {
    setVisit(data?.getVisitById(visitId))
  }, [data?.getVisitById])

  return (
    <Root>
      {!!visit && (
        <VisitProvider visitId={visitId}>
          <VisitCard
            customerId={displayCustomer ? customerId : null}
            visit={visit}
            editLink={`/Customers/${customerId}/Visits/${visitId}/Edit/Finish`}
          />
        </VisitProvider>
      )}
    </Root>
  )
}
