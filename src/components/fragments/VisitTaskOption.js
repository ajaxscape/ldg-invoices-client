import { Grid } from '@mui/material'
import FormField from './FormField'
import React, { useState } from 'react'
import { StyledModal } from './StyledModal'

export function VisitTaskOption({ taskOption, onTaskSelect, onChangeTime }) {
  const { taskName, id, selected, hours, minutes } = taskOption
  const [deleteModelOpen, setDeleteModelOpen] = useState(false)
  const [count, setCount] = useState(0)
  const [target, setTarget] = useState()

  const buildOptions = (options) => {
    return options.map((value) => ({
      value,
      label: value,
    }))
  }

  const handleTaskSelect = ({ target }) => {
    if (target.checked) {
      onTaskSelect({ target })
    } else {
      setTarget(target)
      setDeleteModelOpen(true)
    }
  }

  const handleClose = () => {
    setDeleteModelOpen(false)
    setCount((count) => count + 1)
  }

  const handleDelete = () => {
    setDeleteModelOpen(false)
    onTaskSelect({ target })
  }

  return (
    <>
      <Grid item xs={12} sm={6} md={4}>
        <FormField
          key={`task-checkbox-${count}`}
          type="checkbox"
          name={id}
          label={taskName}
          value={!!selected}
          onChange={handleTaskSelect}
        />
        {!!selected && (
          <>
            <FormField
              type="select"
              name={`${id}-hours`}
              label="hours"
              value={hours}
              options={buildOptions([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])}
              onChange={onChangeTime}
              fullWidth={false}
            />
            <FormField
              type="select"
              name={`${id}-minutes`}
              label="minutes"
              value={minutes}
              options={buildOptions([0, 15, 30, 45])}
              onChange={onChangeTime}
              fullWidth={false}
            />
          </>
        )}
      </Grid>
      <StyledModal
        open={deleteModelOpen}
        title="Are you sure you want to remove this task?"
        onClickYes={handleDelete}
        onClickNo={handleClose}
      />
    </>
  )
}
