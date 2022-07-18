import MenuGroup from '../MenuGroup'
import { VisitDetails } from './VisitDetails'
import React from 'react'

export default function VisitGroup({ visits, label, customerId }) {
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
