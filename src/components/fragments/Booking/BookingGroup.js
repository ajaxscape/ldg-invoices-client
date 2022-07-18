import MenuGroup from '../MenuGroup'
import { BookingDetails } from './BookingDetails'
import React from 'react'

export default function BookingGroup({ bookings, label, customerId }) {
  return (
    <>
      {!!bookings?.length && (
        <MenuGroup label={label}>
          {bookings.map((booking) =>
            booking ? (
              <BookingDetails
                key={`booking-${booking.id}`}
                customerId={booking.property.customer.id}
                bookingId={booking.id}
                displayCustomer={booking.property.customer.id !== customerId}
              />
            ) : null
          )}
        </MenuGroup>
      )}
    </>
  )
}
