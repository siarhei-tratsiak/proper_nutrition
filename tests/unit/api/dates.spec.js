/* eslint-disable no-undef */
import { dates } from '@/api/dates'

describe('dates', () => {
  beforeAll(() => {
    Date.now = jest.fn(() => new Date('2020-05-13T12:33:37.000Z'))
  })

  describe('formatDateForPicker', () => {
    test('should format empty date as string "yyyy-mm-dd"', () => {
      const result = dates.formatDateForPicker()
      expect(result).toBe('2020-05-13')
    })

    test('should format date as string "yyyy-mm-dd"', () => {
      const result = dates.formatDateForPicker('2021-07-24T12:33:37.000Z')
      expect(result).toBe('2021-07-24')
    })
  })

  describe('getDays', () => {
    test('should return count of days between start and end', () => {
      const result = dates.getDays(1617667200000, 1617787636300)
      expect(result).toBe(1)
    })
  })

  describe('getMsInDay', () => {
    test('should return 86400000', () => {
      const result = dates.getMsInDay()
      expect(result).toBe(86400000)
    })
  })

  describe('getMsInYear', () => {
    test('should return 31557600000', () => {
      const result = dates.getMsInYear()
      expect(result).toBe(31557600000)
    })
  })

  describe('getToday', () => {
    test('should return start of the day in ms since the UNIX epoch', () => {
      const result = dates.getToday()
      expect(result).toBe(1589328000000)
    })
  })

  describe('getTomorrow', () => {
    test('should return start of the next day in ms since the UNIX epoch',
      () => {
        const result = dates.getTomorrow()
        expect(result).toBe(1589414400000)
      })
  })
})
