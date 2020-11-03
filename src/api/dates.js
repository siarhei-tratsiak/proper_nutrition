function formatDateForPicker (date) {
  const newDate = date ? new Date(date) : new Date()
  return newDate.toISOString().substr(0, 10)
}

function getMsInDay () {
  const hoursInDay = 24
  const minutesInHour = 60
  const secondsInMinute = 60
  const millisecondsInSecond = 1000
  const millisecondsInDay =
    hoursInDay * minutesInHour * secondsInMinute * millisecondsInSecond
  return millisecondsInDay
}

function getMsInYear () {
  const msInDay = getMsInDay()
  const daysInYear = 365.25
  const msInYear = msInDay * daysInYear
  return msInYear
}

function getToday () {
  const msInDay = getMsInDay()
  const now = new Date()
  const today = now - (now % msInDay)
  return today
}

function getTomorrow () {
  const msInDay = getMsInDay()
  const today = getToday()
  const tomorrow = today + msInDay
  return tomorrow
}

export { formatDateForPicker, getMsInDay, getMsInYear, getToday, getTomorrow }
