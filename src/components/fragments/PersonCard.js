import { Card, CardContent, Grid, IconButton } from '@mui/material'
import clsx from 'clsx'
import PhoneIcon from '@mui/icons-material/Phone'
import SmsIcon from '@mui/icons-material/Sms'
import EmailIcon from '@mui/icons-material/Email'
import { Link } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import { usePerson } from '../context/PersonContext'
import { StyledModal } from './StyledModal'
import { FullAddress } from './FullAddress'

const PREFIX = 'LdgApp-Customer-Details'

const classes = {
  card: `${PREFIX}-card`,
  billPayer: `${PREFIX}-bill-payer`,
  buttons: `${PREFIX}-buttons`,
}

const Root = styled('div')(({ theme }) => ({
  [`.${classes.card}`]: {
    backgroundColor: '#fccc7c',
    marginLeft: theme.spacing(2),
    position: 'relative',
  },
  [`.${classes.billPayer}`]: {
    backgroundColor: '#3bb027',
    marginLeft: theme.spacing(2),
  },
  [`.${classes.buttons}`]: {
    borderTopLeftRadius: theme.spacing(0.5),
    borderTopRightRadius: theme.spacing(0.5),
    backgroundColor: theme.palette.primary.contrastText,
    display: 'flex',
    justifyContent: 'space-around',
  },
}))

export function PersonCard({ isBillPayer, editLink, onDelete }) {
  const { fullName, address, contact } = usePerson()
  const { phone, email } = contact
  const [deleteModelOpen, setDeleteModelOpen] = useState(false)

  const handleEmailClick = () => {
    window.location.href = `mailto:${email}`
  }

  const handlePhoneClick = () => {
    window.location.href = `tel:${phone}`
  }

  const handleTextClick = () => {
    window.location.href = `sms:${phone}`
  }

  const handleDeleteRequest = () => {
    setDeleteModelOpen(true)
  }

  const handleDelete = () => {
    onDelete()
  }

  return (
    <Root>
      <Grid item xs={12}>
        <Card
          className={
            isBillPayer ? clsx(classes.card, classes.billPayer) : classes.card
          }
        >
          <CardContent>
            <strong>{fullName}</strong>
            {!!address && <FullAddress address={address} />}
          </CardContent>
          <div className={classes.buttons}>
            {!!phone && (
              <>
                <IconButton
                  edge="end"
                  variant="contained"
                  color={'primary'}
                  onClick={handlePhoneClick}
                  tabIndex={0}
                >
                  <PhoneIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  variant="contained"
                  color={'primary'}
                  onClick={handleTextClick}
                  tabIndex={0}
                >
                  <SmsIcon />
                </IconButton>
              </>
            )}
            {!!email && (
              <IconButton
                edge="end"
                variant="contained"
                color={'primary'}
                onClick={handleEmailClick}
                tabIndex={0}
              >
                <EmailIcon />
              </IconButton>
            )}
            {!!editLink && (
              <>
                {!!isBillPayer && (
                  <IconButton
                    edge="end"
                    variant="contained"
                    color={'primary'}
                    onClick={handleDeleteRequest}
                    tabIndex={0}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
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
      <StyledModal
        open={deleteModelOpen}
        setOpen={setDeleteModelOpen}
        title="Are you sure you want to delete the customer's Bill Payer?"
        onClickYes={handleDelete}
      />
    </Root>
  )
}
