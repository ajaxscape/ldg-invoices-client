import { Button, Grid } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { useData } from '../../context/DataContext'

export function MenuButton({
  to,
  icon,
  label,
  color = 'primary',
  type,
  onClick,
}) {
  const { getCustomerById } = useData()
  const { customerId } = useParams()
  const [customer, setCustomer] = useState()
  const [isVisible, setIsVisible] = useState(false)
  const Icon = icon

  useEffect(() => {
    const customer = getCustomerById(customerId)
    setCustomer(customer)
    if (to || onClick) {
      setIsVisible(true)
    } else if (customer && customer[type]) {
      setIsVisible(true)
    }
  }, [])

  const id = `${label
    .toLowerCase()
    .split(' ')
    .filter((val) => val)
    .join('-')}-button`

  const handleClick = (event) => {
    if (onClick) {
      onClick(event)
    } else if (customer) {
      switch (type) {
        case 'email':
          window.location.href = `mailto:${customer?.email}`
          break
        case 'phone':
          window.location.href = `tel:${customer?.phone}`
          break
        default:
          break
      }
    }
  }

  return (
    <>
      {isVisible && (
        <Grid item xs={12}>
          <Button
            startIcon={!!Icon && <Icon />}
            id={id}
            variant="contained"
            color={color}
            component={!!to ? Link : null}
            tabIndex={0}
            to={to ?? null}
            onClick={!!type || !!onClick ? handleClick : null}
            fullWidth
            size="large"
          >
            {label}
          </Button>
        </Grid>
      )}
    </>
  )
}
