import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material'
import TextField from '@mui/material/TextField'
import React from 'react'
import { LocalizationProvider, MobileDatePicker, TimePicker } from '@mui/lab'
import DateAdapter from '@mui/lab/AdapterDateFns'

export default function FormField({
  name,
  label,
  value,
  onChange,
  options,
  maxDate,
  minutesStep,
  fullWidth = true,
  type = 'text',
}) {
  const handleDateChange = (value) => {
    onChange({ target: { value, name } })
  }

  const handleTimeChange = (value) => {
    onChange({ target: { value, name } })
  }

  return (
    <FormControl fullWidth={fullWidth}>
      {type === 'text' && (
        <TextField
          id={name}
          name={name}
          onChange={onChange}
          label={label}
          value={value}
          InputLabelProps={{
            shrink: true,
          }}
        />
      )}
      {type === 'hours' && (
        <TextField
          id={name}
          name={name}
          onChange={onChange}
          label={label}
          value={value}
          InputLabelProps={{
            shrink: true,
          }}
        />
      )}
      {type === 'checkbox' && (
        <FormControlLabel
          control={
            <Checkbox
              id={name}
              name={name}
              onChange={onChange}
              defaultChecked={!!value}
              size="large"
            />
          }
          label={label}
        />
      )}
      {type === 'select' && (
        <>
          <InputLabel>{label}</InputLabel>
          <Select id={name} name={name} onChange={onChange} value={value}>
            {options.map(({ value, label }) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </>
      )}
      {type === 'date' && (
        <LocalizationProvider dateAdapter={DateAdapter}>
          <MobileDatePicker
            label={label}
            inputFormat="E, d-MMM-yyyy"
            value={value}
            onChange={handleDateChange}
            maxDate={maxDate}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      )}
      {type === 'time' && (
        <LocalizationProvider dateAdapter={DateAdapter}>
          <TimePicker
            label={label}
            value={value}
            onChange={handleTimeChange}
            minutesStep={minutesStep}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      )}
    </FormControl>
  )
}
