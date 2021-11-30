export default function (address) {
  const { id: addressId, ...addressLines } = address || {}
  return addressLines
    ? Object.values(addressLines)
        .filter((val) => val)
        .join(', ')
    : ''
}
