export const sort = (a, b) => {
  if (a < b) {
    return -1
  }
  if (a > b) {
    return 1
  }
  return 0
}

export const visitSort = (
  { visitDate: dateA, startTime: timeA },
  { visitDate: dateB, startTime: timeB }
) =>
  sort(
    new Date(`${dateB} ${timeB}`).valueOf(),
    new Date(`${dateA} ${timeA}`).valueOf()
  )
