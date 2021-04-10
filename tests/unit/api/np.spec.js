/* eslint-disable no-undef */
import { np } from '@/api/np'

describe('np', () => {
  describe('arrange', () => {
    test('should return an array of increasing numbers', () => {
      const result = np.arange(5, 4)
      expect(result).toEqual([4, 5, 6, 7, 8])
    })
  })

  describe('countNonMaskedElements', () => {
    test.each([
      [[2, '-', 5, -1, '-', '-'], 3],
      [[2, 6, 5, -1, 0, 2], 6],
      [['-', '-', '-', '-', '-', '-'], 0]
    ])('should return count of "-" in array', (array, expected) => {
      const result = np.countNonMaskedElements(array)
      expect(result).toBe(expected)
    })
  })

  describe('identityMatrix', () => {
    test('should return square matrix of zeros with diagonal of ones', () => {
      const size = 3
      const result = np.identityMatrix(size)
      expect(result).toEqual([[1, 0, 0], [0, 1, 0], [0, 0, 1]])
    })
  })

  describe('less', () => {
    test('should return array of boolean', () => {
      const array = [2, 0, -4]
      const value = 0
      const result = np.less(array, value)
      expect(result).toEqual([false, false, true])
    })
  })

  describe('minNonMaskedIndex', () => {
    test('should return index of minimal not masked element in array', () => {
      const array = [2, '-', 5, -1, '-', '-']
      const result = np.minNonMaskedIndex(array)
      expect(result).toBe(3)
    })
  })

  describe('shape', () => {
    test('should return array of sizes', () => {
      const array = [[[2], ['-'], [5]], [[-1], ['-'], ['-']]]
      const result = np.shape(array)
      expect(result).toEqual([2, 3, 1])
    })
  })

  describe('zeros', () => {
    test('should return array of zeros of given length', () => {
      const length = 5
      const result = np.zeros(length)
      expect(result).toEqual([0, 0, 0, 0, 0])
    })
  })
})
