import { format } from 'date-fns'

export default function (date) {
  return format(date, 'eeee do MMMM yyyy')
}
