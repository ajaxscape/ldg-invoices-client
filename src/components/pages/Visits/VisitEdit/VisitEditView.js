import { PageTitle } from '../../../fragments/PageTitle'
import NaturePeopleIcon from '@mui/icons-material/NaturePeople'
import React, { useState } from 'react'
import { Alert, Grid } from '@mui/material'
import FormField from '../../../fragments/FormField'
import { NavButtons } from '../../../fragments/Buttons/NavButtons'
import { Redirect, useRouteMatch } from 'react-router-dom'
import MenuGroup from '../../../fragments/MenuGroup'
import nearestDateTime from '../../../../utilities/nearestDateTime'
import { StyledModal } from '../../../fragments/StyledModal'
import { CustomerDetails } from '../../../fragments/CustomerDetails'

export default function VisitEditView({
  children,
  customerId,
  visitId,
  subHeading,
  fields,
  data,
  setData,
  next,
  prev,
  error,
  warning,
}) {
  const [warningIgnored, setWarningIgnored] = useState(false)
  const [warningModalOpen, setWarningModalOpen] = useState(false)

  let match = useRouteMatch()

  const path = match.path
    .replace(':customerId', customerId)
    .replace(':visitId', visitId)

  const backTo = prev
    ? path.substring(0, path.lastIndexOf('/Edit/') + 6) + prev
    : path.substring(0, path.lastIndexOf('/Visits/') + 8)

  const continueTo = next
    ? path.substring(0, path.lastIndexOf('/Edit/') + 6) + next
    : 'Save'

  const handleChange = ({ target }) => {
    setData((data) => ({ ...data, [target.name]: target.value }))
  }

  const handleWarning = () => {
    setWarningModalOpen(true)
  }

  const handleWarningIgnored = () => {
    setWarningIgnored(true)
  }

  return (
    <>
      {!!warningIgnored && <Redirect to={continueTo} />}
      <Grid container direction="column" spacing={2} alignContent="stretch">
        <PageTitle icon={NaturePeopleIcon} title="Visit" />
        <CustomerDetails />

        {!!data && (
          <MenuGroup
            label={`${
              subHeading || path.substring(path.lastIndexOf('/') + 1)
            }:`}
          >
            {fields.map(
              ({ field, label, type, options, nowOrPast, roundedMinutes }) => {
                return (
                  <Grid key={field} item xs={12} sm={6} md={4}>
                    <FormField
                      name={field}
                      label={label}
                      value={data[field] ?? ''}
                      onChange={handleChange}
                      type={type}
                      options={options}
                      minutesStep={roundedMinutes}
                      maxDate={
                        nowOrPast ? nearestDateTime(roundedMinutes) : null
                      }
                    />
                  </Grid>
                )
              }
            )}
          </MenuGroup>
        )}
        {children}
        {!!error && (
          <Grid item xs={12}>
            <Alert severity="error">{error}</Alert>
          </Grid>
        )}
        <NavButtons
          backTo={backTo}
          backLabel={prev ? 'Back' : 'Cancel'}
          continueToDisabled={!!error}
          continueTo={!!warning ? null : continueTo}
          continueClick={!warning ? null : handleWarning}
          continueLabel={next ? 'Continue' : 'Save'}
        />
      </Grid>
      <StyledModal
        open={warningModalOpen}
        setOpen={setWarningModalOpen}
        title={warning}
        onClickYes={handleWarningIgnored}
      />
    </>
  )
}
