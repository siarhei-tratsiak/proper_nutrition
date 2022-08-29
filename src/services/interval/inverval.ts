import intervals from '@/data/intervals.json'

export default class IntervalService {
  private start: number
  private end: number
  private intervals: Array<{ id: number, name: string }>

  constructor (start: number, end: number) {
    this.start = start
    this.end = end
    this.intervals = intervals
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
