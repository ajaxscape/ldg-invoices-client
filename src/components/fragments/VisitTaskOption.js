import { Grid, IconButton } from '@mui/material'
import FormField from './FormField'
import React, { useState } from 'react'
import { StyledModal } from './StyledModal'
import DeleteIcon from '@mui/icons-material/Delete'
import FormLabel from '@mui/material/FormLabel'

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
    <>
      <Grid item xs={12} sm={6} md={4}>
        <FormLabel>{taskName}:</FormLabel>
        <IconButton
          id={`${id}-delete`}
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
    </>
  )
}
