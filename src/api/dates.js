const dates = {
  formatDateForPicker: (date) => {
    const newDate = date ? new Date(date) : new Date()
    return newDate.toISOString().substr(0, 10)
  },

  getDays: function (start, end) {
    const msInDay = this.getMsInDay()
    const days = Math.round((end - start) / msInDay)
    return days
  },

  getMsInDay: () => {
    const hoursInDay = 24
    const minutesInHour = 60
    const secondsInMinute = 60
    const millisecondsInSecond = 1000
    const millisecondsInDay =
      hoursInDay * minutesInHour * secondsInMinute * millisecondsInSecond
    return millisecondsInDay
  },

  getToday: function () {
    const msInDay = this.getMsInDay()
    const now = new Date()
    const today = now - (now % msInDay)
    return today
  },

  getTomorrow: function () {
    const msInDay = this.getMsInDay()
    const today = this.getToday()
    const tomorrow = today + msInDay
    return tomorrow
  }
}

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

export { dates, formatDateForPicker, getMsInDay, getMsInYear, getToday, getTomorrow }
