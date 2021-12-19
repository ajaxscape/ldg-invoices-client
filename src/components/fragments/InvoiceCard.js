import { Card, CardContent, Grid, IconButton } from '@mui/material'
import { Link } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit'
import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import { useInvoice } from '../context/InvoiceContext'
import { format } from 'date-fns'
import formatName from '../../utilities/formatName'
import formatCurrency from '../../utilities/formatCurrency'
import { useData } from '../context/DataContext'
import { VisitTaskTable } from './VisitTaskTable'

const PREFIX = 'LdgApp-Invoice-Details'

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

export function InvoiceCard({ editLink, customerId }) {
  // const { customerId: invoiceCustomerId } = useParams()
  const { getCustomerById } = useData()
  const { visits, invoiceTotal, invoiceDate } = useInvoice()
  const [displayCard, setDisplayCard] = useState()
  const [billPayerName, setBillPayerName] = useState('')
  const [fullName, setFullName] = useState('')

  useEffect(() => {
    if (!!invoiceDate && invoiceDate.toDateString() !== 'Invalid Date') {
      setDisplayCard(true)
    }
  }, [invoiceDate])

  useEffect(() => {
    if (customerId && getCustomerById) {
      const customer = getCustomerById(customerId)
      if (customer.billPayer) {
        setBillPayerName(formatName(customer.billPayer))
      }
      setFullName(formatName(customer))
    }
  }, [customerId, getCustomerById])

  return (
    <Root>
      {!!displayCard && (
        <Grid item xs={12}>
          <Card className={classes.card}>
            <CardContent>
              <strong>
                {!!invoiceDate && <>{format(invoiceDate, 'dd MMMM yyyy')}</>}
              </strong>
              {!!fullName && (
                <>
                  <br />
                  <br />
                  {!!billPayerName && (
                    <>
                      {billPayerName}
                      <br />
                      c/o:{' '}
                    </>
                  )}
                  {fullName},
                </>
              )}
              <br />
              {!!visits?.length && (
                <>
                  {visits.map((visit) => (
                    <>
                      <br />
                      {format(new Date(visit.visitDate), 'dd MMM yyyy')}
                      {!!visit.tasks?.length && (
                        <VisitTaskTable tasks={visit.tasks} />
                      )}
                    </>
                  ))}
                </>
              )}
              <br />
              {!!visits?.length && (
                <>
                  No of visits: <strong>{visits.length}</strong>
                </>
              )}
              <br />
              Invoice total: <strong>{formatCurrency(invoiceTotal)}</strong>
            </CardContent>
            <div className={classes.buttons}>
              {!!editLink && (
                <>
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
                </>
              )}
            </div>
          </Card>
        </Grid>
      )}
    </Root>
  )
}
