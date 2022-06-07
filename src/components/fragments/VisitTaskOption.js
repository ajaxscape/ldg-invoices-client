import { Grid, IconButton } from '@mui/material'
import FormField from './FormField'
import React, { useState } from 'react'
import { StyledModal } from './StyledModal'
import DeleteIcon from '@mui/icons-material/Delete'
import FormLabel from '@mui/material/FormLabel'
import { styled } from "@mui/material/styles";

const PREFIX = 'LdgApp-Visit-Task-Option'

const classes = {
  visitTaskOption: `${PREFIX}-option`,
  visitTaskOptionLabel: `${PREFIX}-option-label`,
  visitTaskOptionDeleteButton: `${PREFIX}-option-delete-button`,
}

const Root = styled('div')(({ theme }) => ({
  [`.${classes.visitTaskOption}`]: {
    position: 'relative',
    backgroundColor: '#fde9c7',
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
  },
  [`.${classes.visitTaskOptionLabel}`]: {
    fontWeight: 'bold',
    display: 'block'
  },
  [`.${classes.visitTaskOptionDeleteButton}`]: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
  },
}))

export function VisitTaskOption({ taskOption, onDelete, onChange }) {
  const { taskName, id, taskType, hours, minutes, description, price } =
    taskOption
  const [deleteModelOpen, setDeleteModelOpen] = useState(false)

  const buildOptions = (options) => {
    return options.map((value) => ({
      value,
      label: value,
    }))
  }

  const handleDeleteRequest = () => {
    setDeleteModelOpen(true)
  }

  const handleDelete = () => {
    onDelete(taskOption)
  }

  return (
    <Root>
      <Grid item xs={12} sm={6} md={4} className={classes.visitTaskOption}>
        <FormLabel className={classes.visitTaskOptionLabel}>{taskName}:</FormLabel>
        <IconButton
          id={`${id}-delete`}
          className={classes.visitTaskOptionDeleteButton}
          variant="contained"
          color={'primary'}
          onClick={handleDeleteRequest}
          tabIndex={0}
        >
          <DeleteIcon />
        </IconButton>
        <br />
        {!!taskType ? (
          <>
            <FormField
              type="select"
              name={`${id}-hours`}
              label="hours"
              value={hours}
              options={buildOptions([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])}
              onChange={onChange}
              fullWidth={false}
            />
            <FormField
              type="select"
              name={`${id}-minutes`}
              label="minutes"
              value={minutes}
              options={buildOptions([0, 15, 30, 45])}
              onChange={onChange}
              fullWidth={false}
            />
            <br />
            <br />
            <FormField
              name={`${id}-description`}
              label="Description"
              value={description}
              onChange={onChange}
              type="text"
            />
          </>
        ) : (
          <>
            <FormField
              name={`${id}-description`}
              label="Description"
              value={description}
              onChange={onChange}
              type="text"
            />
            <br />
            <br />
            <FormField
              name={`${id}-price`}
              label="Price"
              value={price}
              onChange={onChange}
              type="text"
            />
          </>
        )}
      </Grid>
      <StyledModal
        open={deleteModelOpen}
        setOpen={setDeleteModelOpen}
        title="Are you sure you want to remove this task?"
        onClickYes={handleDelete}
      />
    </Root>
  )
}
