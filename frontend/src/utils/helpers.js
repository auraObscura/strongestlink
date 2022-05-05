export const convertTimestamp = (timestamp) => {
  let month=timestamp.slice(8,10)
  let day=timestamp.slice(5,7)
  let year=timestamp.slice(0,4)
  return `${month}/${day}/${year}`
}