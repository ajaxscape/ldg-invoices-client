import { format } from 'date-fns'

export default function (time) {
  return format(time, 'h:mm a')
}
