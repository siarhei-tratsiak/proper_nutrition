function formatDateForPicker (date = 0) {
  return new Date(date).toISOString().substr(0, 10)
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
  const end = today + msInDay
  return end
}

export { formatDateForPicker, getMsInDay, getMsInYear, getToday, getTomorrow }
