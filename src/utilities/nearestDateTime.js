export default function nearestDateTime(minutes) {
  const nowInMinutes = Math.round(Date.now().valueOf() / 60000)
  let base = nowInMinutes - (nowInMinutes % minutes)
  const diffInMinutes = nowInMinutes - base
  if (diffInMinutes > minutes / 2) {
    base += minutes
  }
  return new Date(base * 60000)
}
