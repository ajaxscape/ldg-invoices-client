import { PageTitle } from '../../fragments/PageTitle'
import EventIcon from '@mui/icons-material/Event'
import React, { useEffect, useState } from 'react'
import { Grid } from '@mui/material'
import { useData } from '../../context/DataContext'
import BookingGroup from '../../fragments/Booking/BookingGroup'
import { NavButtons } from '../../fragments/Buttons/NavButtons'
import { useParams } from 'react-router-dom'
import { CustomerDetails } from '../../fragments/Customer/CustomerDetails'

export default function Bookings() {
  const { getBookings } = useData()
  const { customerId } = useParams()
  const [bookings, setBookings] = useState()
  const [prefix, setPrefix] = useState()

  useEffect(() => {
    if (customerId) {
      setPrefix(`/Customers/${customerId}`)
    }
  }, [customerId])

  useEffect(() => {
    setBookings(getBookings({ customerId }))
  }, [getBookings, customerId])

  return (
    <Grid container direction="column" spacing={2} alignContent="stretch">
      <PageTitle icon={EventIcon} title="Bookings" />
      <CustomerDetails />

      {!!bookings?.length && (
        <BookingGroup
          customerId={customerId}
          bookings={bookings}
          label="Bookings:"
        />
      )}

      <NavButtons backTo={prefix ?? '/Home'} />
    </Grid>
  )
}
