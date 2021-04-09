import { checkArguments, exceptions } from '@/api/exceptions'

const dates = {
  formatDateForPicker: (date) => {
    if (date) {
      try {
        return new Date(date).toISOString().substr(0, 10)
      } catch (_) {
        throw exceptions.notADate(date)
      }
    }
    return new Date(Date.now()).toISOString().substr(0, 10)
  },

  getDays: function (start, end) {
    const exceptionList = [
      exceptions.startExceedsEnd(start, end),
      exceptions.notInteger('start', start),
      exceptions.notInteger('end', end)
    ]
    checkArguments(exceptionList)
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
