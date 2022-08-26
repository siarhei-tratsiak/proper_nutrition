export default class DatesService {
  private readonly start: number
  private readonly end: number

  constructor (start: number, end: number) {
    this.start = start
    this.end = end
  }

  getDays () {
    const msInDay = this.getMsInDay()
    const days = Math.round((this.end - this.start) / msInDay)

    return days
  }

  private getMsInDay () {
    const hoursInDay = 24
    const minutesInHour = 60
    const secondsInMinute = 60
    const millisecondsInSecond = 1000
    const millisecondsInDay =
      hoursInDay * minutesInHour * secondsInMinute * millisecondsInSecond

    return millisecondsInDay
  }
}
