/* eslint-disable no-undef */
import { simplex } from '@/api/simplex'

describe('simplex', () => {
  test.each([
    [
      [[2, 1], [2, 3], [3, 1]],
      [18, 42, 24],
      [-3, -2],
      {
        iterationNumber: 3,
        message: 'Optimization terminated successfully.',
        solution: [3, 12],
        status: 0
      }
    ],

    [
      [[1, 2], [3, 2]],
      [6, 12],
      [-2, 1],
      {
        iterationNumber: 3,
        message: 'Optimization terminated successfully.',
        solution: [4, 0],
        status: 0
      }
    ],

    [
      [[-1, -2], [-3, -2]],
      [-4, -3],
      [2, 5],
      {
        iterationNumber: 4,
        message: 'Optimization terminated successfully.',
        solution: [4, 0],
        status: 0
      }
    ]
  ])('should return solution of linear programming problem',
    (
      restrictionMatrix,
      constraintsVector,
      objectiveCoefficients,
      expectation
    ) => {
      const result = simplex({
        restrictionMatrix,
        constraintsVector,
        objectiveCoefficients
      })
      expect(result).toEqual(expectation)
    })

  test('should return message about reaching iteration limit', () => {
    const restrictionMatrix = [[-1, -2], [-3, -2]]
    const constraintsVector = [-4, -3]
    const objectiveCoefficients = [2, 5]
    const maximumIterations = 2
    const expectation = {
      iterationNumber: 2,
      message: 'Iteration limit reached.',
      solution: [0, 1.5],
      status: 1
    }
    const result = simplex({
      restrictionMatrix,
      constraintsVector,
      objectiveCoefficients,
      maximumIterations
    })
    expect(result).toEqual(expectation)
  })

  test('solution of linear programming problem with c0 != 0', () => {
    const restrictionMatrix = [[-1, -2], [-3, -2]]
    const constraintsVector = [-2, -5]
    const objectiveCoefficients = [4, 3]
    const c0 = 3
    const expectation = {
      iterationNumber: 2,
      message: 'Optimization terminated successfully.',
      solution: [1.50, 0.25],
      status: 0
    }
    const result = simplex({
      restrictionMatrix,
      constraintsVector,
      objectiveCoefficients,
      c0
    })
    // avoid floating-point arithmetic side-effects
    result.solution = result.solution.map(value => +value.toFixed(2))
    expect(result).toEqual(expectation)
  })

  test('should return message about unbounded problem', () => {
    const restrictionMatrix = [[-1, -2], [-3, -2]]
    const constraintsVector = [-2, -5]
    const objectiveCoefficients = [-4, -3]
    const expectation = {
      iterationNumber: 3,
      message: 'Optimization failed. The problem appears to be unbounded.',
      solution: [2, 0],
      status: 3
    }
    const result = simplex({
      restrictionMatrix,
      constraintsVector,
      objectiveCoefficients
    })
    expect(result).toEqual(expectation)
  })
})
