export default function (name) {
  const { title = '', firstName = '', lastName = '' } = name || {}
  return [title, firstName, lastName].filter((part) => !!part).join(' ')
}
