import React, { useContext, useEffect, useState } from 'react'
import nearestDateTime from '../../utilities/nearestDateTime'
import { useData } from './DataContext'

export const BookingContext = React.createContext(undefined)

export const useBooking = () => useContext(BookingContext)

export const BookingProvider = ({ children, bookingId, customerId }) => {
  const [property, setProperty] = useState()
  const [users, setUsers] = useState([])
  const [duration, setDuration] = useState(0)
  const [bookingDateTime, setBookingDateTime] = useState({})
  const { getBookingById, getCustomerById } = useData()

  useEffect(() => {
    let booking
    if (bookingId) {
      booking = getBookingById(bookingId)
    }
    if (booking) {
      const { property, bookingDate, bookingTime, users, duration } = booking
      setBookingDateTime({
        bookingDate: new Date(bookingDate),
        bookingTime: new Date(`${bookingDate} ${bookingTime}`),
      })
      setProperty({ ...property })
      if (users) {
        setUsers([...users])
      }
      setDuration(duration)
    } else {
      setBookingDateTime({
        bookingDate: nearestDateTime(15),
        startTime: nearestDateTime(15),
      })
      // Now get first property from customer as default
      if (customerId) {
        const customer = getCustomerById(customerId)
        if (customer?.properties?.length) {
          setProperty(customer.properties[0])
        }
      }
    }
  }, [bookingId])

  return (
    <BookingContext.Provider
      value={{
        property,
        users,
        bookingDateTime,
        duration,
      }}
    >
      {children}
    </BookingContext.Provider>
  )
}
