import { Button, Card, CardContent, Grid, IconButton } from '@mui/material'
import { Link } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit'
import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import { useVisit } from '../../context/VisitContext'
import { VisitTaskTable } from './VisitTaskTable'
import { CustomerCard } from '../Customer/CustomerCard'
import { VisitDate } from './VisitDate'

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

export function VisitCard({ editLink, editText, customerId }) {
  const { property, tasks, visitDateTime } = useVisit()
  const { startTime } = visitDateTime || {}
  const [displayCard, setDisplayCard] = useState(false)

  useEffect(() => {
    if (!!startTime && startTime.toDateString() !== 'Invalid Date') {
      setDisplayCard(true)
    }
  }, [startTime])

  return (
    <Root>
      {!!displayCard && (
        <Grid item xs={12}>
          <Card className={classes.card}>
            <CardContent>
              <VisitDate />
              <CustomerCard customerId={customerId} property={property} />
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
