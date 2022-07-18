import formatDate from '../../../utilities/formatDate'
import formatTime from '../../../utilities/formatTime'
import React from 'react'
import { useBooking } from '../../context/BookingContext'

export function BookingDate() {
  const { bookingDateTime, duration } = useBooking()
  const { bookingDate, bookingTime } = bookingDateTime || {}

  return (
    <strong>
      {!!bookingDate && (
        <>
          {formatDate(bookingDate)}
          <br />
          {formatTime(bookingTime)} for {duration} hours
        </>
      )}
    </strong>
  )
}
