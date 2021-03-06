import { Button, Card, CardContent, Grid, IconButton } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit'
import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import { useVisit } from '../context/VisitContext'
import { FullAddress } from './FullAddress'
import { format } from 'date-fns'
import formatName from '../../utilities/formatName'
import { useData } from '../context/DataContext'
import { VisitTaskTable } from './VisitTaskTable'
import formatAddress from '../../utilities/formatAddress'

const PREFIX = 'LdgApp-Visit-Details'

const classes = {
  card: `${PREFIX}-card`,
  buttons: `${PREFIX}-buttons`,
}

const Root = styled('div')(({ theme }) => ({
  [`.${classes.card}`]: {
    backgroundColor: '#fde9c7',
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
    position: 'relative',
  },
  [`.${classes.buttons}`]: {
    borderTopLeftRadius: theme.spacing(0.5),
    borderTopRightRadius: theme.spacing(0.5),
    backgroundColor: theme.palette.primary.contrastText,
    display: 'flex',
    justifyContent: 'space-around',
  },
}))

const formatDate = (date) => format(date, 'dd MMMM yyyy')
const formatTime = (time) => format(time, 'h:mm a')

export function VisitCard({ editLink, editText, customerId }) {
  const { customerId: visitCustomerId } = useParams()
  const { getCustomerById } = useData()
  const { property, tasks, visitDateTime } = useVisit()
  const { visitDate, startTime, finishTime } = visitDateTime || {}
  const [displayCard, setDisplayCard] = useState()
  const [fullName, setFullName] = useState('')
  const [showAddress, setShowAddress] = useState(false)

  useEffect(() => {
    if (!!startTime && startTime.toDateString() !== 'Invalid Date') {
      setDisplayCard(true)
    }
  }, [startTime])

  useEffect(() => {
    if (customerId && getCustomerById) {
      const customer = getCustomerById(customerId)
      setFullName(formatName(customer))
      if (visitCustomerId) {
        if (
          formatAddress(customer?.address) === formatAddress(property?.address)
        ) {
          setShowAddress(false)
        } else {
          setShowAddress(true)
        }
      } else {
        setShowAddress(true)
      }
    }
  }, [customerId, getCustomerById])

  return (
    <Root>
      {!!displayCard && (
        <Grid item xs={12}>
          <Card className={classes.card}>
            <CardContent>
              <strong>
                {!!visitDate && (
                  <>
                    {formatDate(visitDate)}
                    <br />
                    {formatTime(startTime)}
                    {formatTime(startTime) !== formatTime(finishTime) && (
                      <> to {formatTime(finishTime)}</>
                    )}
                  </>
                )}
              </strong>
              {!!fullName && (
                <>
                  <br />
                  <br />
                  {fullName},
                </>
              )}
              {!!property?.address && showAddress && (
                <>
                  {!fullName && (
                    <>
                      <br />
                      <br />
                    </>
                  )}
                  <FullAddress address={property.address} />
                </>
              )}
              <br />
              {!!tasks?.length ? (
                <>
                  <VisitTaskTable
                    tasks={[...tasks, { taskName: 'Breaks', quantity: 0 }]}
                  />
                </>
              ) : (
                <>
                  <br />
                  No tasks entered as yet
                </>
              )}
            </CardContent>
            <div className={classes.buttons}>
              {!!editLink && (
                <>
                  {!!editText ? (
                    <Button
                      startIcon={<EditIcon />}
                      variant="contained"
                      color="primary"
                      component={Link}
                      tabIndex={0}
                      to={editLink}
                      fullWidth={true}
                      size="large"
                    >
                      {editText}
                    </Button>
                  ) : (
                    <IconButton
                      edge="end"
                      variant="contained"
                      color={'primary'}
                      to={editLink}
                      component={Link}
                      tabIndex={0}
                    >
                      <EditIcon />
                    </IconButton>
                  )}
                </>
              )}
            </div>
          </Card>
        </Grid>
      )}
    </Root>
  )
}
