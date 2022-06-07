export default function maxRelativeDateTime (date, relativeDate) {
  const maxMilliseconds = 1000 * 60 * 60 * 9
  const diff = date.getTime() - relativeDate.getTime()
  return diff > maxMilliseconds ? date.setTime(relativeDate.getTime() + maxMilliseconds) : date
}