import React, { useEffect, useState } from 'react'
import { useData } from '../../context/DataContext'
import { styled } from '@mui/material/styles'
import { BookingCard } from './BookingCard'
import { BookingProvider } from '../../context/BookingContext'

const PREFIX = 'LdgApp-Booking-Details'

const classes = {
  label: `${PREFIX}-label`,
}

const Root = styled('div')(({ theme }) => ({
  [`.${classes.label}`]: {
    marginLeft: theme.spacing(3.5),
    marginTop: theme.spacing(1.5),
  },
}))

export function BookingDetails({ customerId, bookingId, displayCustomer }) {
  const data = useData()
  const [booking, setBooking] = useState()

  useEffect(() => {
    setBooking(data?.getBookingById(bookingId))
  }, [data?.getBookingById])

  return (
    <Root>
      {!!booking && (
        <BookingProvider bookingId={bookingId}>
          <BookingCard
            customerId={displayCustomer ? customerId : null}
            booking={booking}
            editLink={`/Customers/${customerId}/Bookings/${bookingId}/Edit/Finish`}
          />
        </BookingProvider>
      )}
    </Root>
  )
}
