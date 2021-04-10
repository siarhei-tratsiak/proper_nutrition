const dates = {
  formatDateForPicker: (date) => {
    if (date) {
      return new Date(date).toISOString().substr(0, 10)
    }
    return new Date(Date.now()).toISOString().substr(0, 10)
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

  getMsInYear: function () {
    const daysInYear = 365.25
    const msInDay = this.getMsInDay()
    return daysInYear * msInDay
  },

  getToday: function () {
    const msInDay = this.getMsInDay()
    const now = new Date(Date.now())
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

export { dates }
