import { PageTitle } from '../../../fragments/PageTitle'
import PersonIcon from '@mui/icons-material/Person'
import React from 'react'
import { Grid } from '@mui/material'
import FormField from '../../../fragments/FormField'
import { NavButtons } from '../../../fragments/Buttons/NavButtons'
import { useRouteMatch } from 'react-router-dom'
import MenuGroup from '../../../fragments/MenuGroup'

export default function PersonEditView({
  customerId,
  billPayerId,
  subHeading,
  fields,
  data,
  setData,
  next,
  prev,
}) {
  let match = useRouteMatch()

  const path = match.path
    .replace(':customerId', customerId)
    .replace(':billPayerId', billPayerId)

  const backTo = prev
    ? path.substring(0, path.lastIndexOf('/Edit/') + 6) + prev
    : `/Customers/${customerId}`

  const continueTo = next
    ? path.substring(0, path.lastIndexOf('/Edit/') + 6) + next
    : 'Save'

  const handleChange = ({ target }) => {
    setData((data) => ({ ...data, [target.name]: target.value }))
  }

  return (
    <Grid container direction="column" spacing={2} alignContent="stretch">
      <PageTitle
        icon={PersonIcon}
        title={billPayerId ? 'Bill Payer' : 'Customer'}
      />

      {!!data && (
        <MenuGroup
          label={`${subHeading || path.substring(path.lastIndexOf('/') + 1)}:`}
        >
          {fields.map(({ field, label, type, options }) => {
            return (
              <Grid key={field} item xs={12} sm={6} md={4}>
                <FormField
                  name={field}
                  label={label}
                  value={data[field] ?? ''}
                  onChange={handleChange}
                  type={type}
                  options={options}
                />
              </Grid>
            )
          })}
        </MenuGroup>
      )}
      <NavButtons
        backTo={backTo}
        backLabel={prev ? 'Back' : 'Cancel'}
        continueTo={continueTo}
        continueLabel={next ? 'Continue' : 'Save'}
      />
    </Grid>
  )
}
