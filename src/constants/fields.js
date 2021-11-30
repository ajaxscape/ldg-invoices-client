export const nameFields = [
  {
    field: 'title',
    label: 'Title',
    type: 'select',
    options: ['Mrs', 'Miss', 'Ms', 'Mr', 'Dr'].map((value) => ({
      value,
      label: value,
    })),
  },
  { field: 'firstName', label: 'First name' },
  { field: 'lastName', label: 'Last name' },
]

export const contactFields = [
  { field: 'email', label: 'Email' },
  { field: 'phone', label: 'Phone' },
]

export const addressFields = [
  { field: 'addressLine1', label: 'Address line 1' },
  { field: 'addressLine2', label: 'Address line 2' },
  { field: 'town', label: 'Town' },
  { field: 'county', label: 'County' },
  { field: 'postcode', label: 'Postcode' },
]

export const dateTimeFields = [
  {
    field: 'visitDate',
    label: 'Date of visit',
    type: 'date',
    nowOrPast: true,
  },
  {
    field: 'startTime',
    label: 'Start time',
    type: 'time',
    nowOrPast: true,
    roundedMinutes: 15,
  },
  {
    field: 'finishTime',
    label: 'Finish time',
    type: 'time',
    nowOrPast: true,
    roundedMinutes: 15,
  },
]
