import {
  arange,
  countNonMaskedElements,
  identityMatrix,
  less,
  minNonMaskedIndex,
  shape,
  zeros
} from '@/api/np'
import { cloneDeep } from 'lodash'

function _allMasked (array) {
  const allMasked = countNonMaskedElements(array) === 0
  return allMasked
}

function _applyPivot ({ tableau, pivotRow, pivotColumn }) {
  const pivotValue = tableau[pivotRow][pivotColumn]
  const divisionByPivotValue = element => element / pivotValue
  const pivotOperations = tableau[pivotRow].map(divisionByPivotValue)
  tableau.forEach((row, rowIndex) => {
    _pivotOperation({
      pivotColumn,
      pivotOperations,
      row,
      rowIndex,
      tableau
    })
  })
  tableau[pivotRow] = pivotOperations
}

function _changeBasis ({ basis, pivotColumn, pivotRow }) {
  basis[pivotRow] = pivotColumn
}

function _constraintsReverseSum (rowConstraints) {
  const initialValue = []
  const reverseSum = (accumulator, row) =>
    row.map((element, index) => (accumulator[index] || 0) - element)
  const constraintsReverseSum = rowConstraints.reduce(reverseSum, initialValue)
  return constraintsReverseSum
}

function _createTableau ({
  A,
  b,
  c,
  c0,
  diagonalMatrix,
  pseudoVariablesIndexes,
  zerosOfHeightA
}) {
  const rowConstraints = _getRowConstraints({ A, b, diagonalMatrix })
  const rowObjective = [...c, ...zerosOfHeightA, c0]
  const rowPseudoObjective =
    _getRowPseudoObjective(pseudoVariablesIndexes, rowConstraints)
  const tableau = [...rowConstraints, rowObjective, rowPseudoObjective]
  return tableau
}

function _findSolution ({ basis, heightA, tableau, widthA }) {
  let solution = zeros(widthA + heightA)
  const lastColumnIndex = shape(tableau)[1] - 1
  const tableauLastColumn = tableau.slice(0, heightA).map(
    row => row[lastColumnIndex]
  )
  const assignSolution = (element, index) => {
    solution[element] = tableauLastColumn[index]
  }
  basis.slice(0, heightA).forEach(assignSolution)
  solution = solution.slice(0, widthA).slice(0, widthA - heightA)
  return solution
}

function _getRowConstraints ({ A, b, diagonalMatrix }) {
  const rowConstraint = (curRow, index) =>
    [...curRow, ...diagonalMatrix[index], b[index]]
  const rowConstraints = A.map(rowConstraint)
  return rowConstraints
}

function _getRowPseudoObjective (av, rowConstraints) {
  const rowPseudoObjective = _constraintsReverseSum(rowConstraints)
  av.forEach(element => { rowPseudoObjective[element] = 0 })
  return rowPseudoObjective
}

function _lastItemByModulo (tableau) {
  const tableauShape = shape(tableau)
  const lastRowIndex = tableauShape[0] - 1
  const lastColumnIndex = tableauShape[1] - 1
  const lastItemByModulo = Math.abs(tableau[lastRowIndex][lastColumnIndex])
  return lastItemByModulo
}

function _pivotColumn (tableau, tolerance = 1e-9) {
  const tableauHeight = tableau.length
  const mask = element => (element >= -tolerance ? '-' : element)
  const maskedPseudoObjective = tableau[tableauHeight - 1]
    .slice(0, -1)
    .map(mask)
  const pivotColumn = _allMasked(maskedPseudoObjective) ? NaN : minNonMaskedIndex(maskedPseudoObjective)
  return pivotColumn
}

function _pivotOperation ({
  pivotColumn,
  pivotOperations,
  row,
  rowIndex,
  tableau
}) {
  const pivotElement = row[pivotColumn]
  const pivotOperation = (element, index) =>
    element - pivotOperations[index] * pivotElement
  const newRow = row.map(pivotOperation)
  tableau[rowIndex] = newRow
}

function _pivotRow ({ tableau, pivotColumn, phase, tolerance = 1e-9 }) {
  const rowsToSlice = phase === 1 ? 2 : 1
  const slicedTableau = tableau.slice(0, -rowsToSlice)
  const maskPivotElement = row => {
    const pivotElement = row[pivotColumn]
    return pivotElement <= tolerance ? '-' : pivotElement
  }
  const maskedPivotColumn = slicedTableau.map(maskPivotElement)
  let pivotRow = NaN
  if (_allMasked(maskedPivotColumn)) {
    return pivotRow
  }
  const maskConstraint = row =>
    row[pivotColumn] <= tolerance ? '-' : row[row.length - 1]
  const maskedConstraints = slicedTableau.map(maskConstraint)
  const pivotOperation = (element, index) =>
    element !== '-' ? element / maskedPivotColumn[index] : element
  const pivotOperations = maskedConstraints.map(pivotOperation)
  pivotRow = minNonMaskedIndex(pivotOperations)
  return pivotRow
}

function _revertNegativeConstraints (A, b) {
  const isNegativeConstraints = less(b, 0)
  isNegativeConstraints.forEach((isNegativeConstraint, index) => {
    if (isNegativeConstraint) {
      A[index] = A[index].map(element => -element)
      b[index] = -b[index]
    }
  })
}

function _shrink (tableau, pseudoVariablesIndexes) {
  // Remove the pseudo-objective row from the tableau
  tableau = tableau.slice(0, -1)
  // Remove the artificial variable columns from the tableau
  const nonArtificialVariableColumns = (element, index) =>
    !pseudoVariablesIndexes.includes(index)
  const filterRows = row => row.filter(nonArtificialVariableColumns)
  tableau = tableau.map(filterRows)
  return tableau
}

function simplex ({
  initA,
  initb,
  initc,
  c0 = 0,
  maximumIterations = 1000,
  tolerance = 1e-9
}) {
  let status = 0
  const messages = {
    0: 'Optimization terminated successfully.',
    1: 'Iteration limit reached.',
    2: 'Optimization failed. Unable to find a feasible starting point.',
    3: 'Optimization failed. The problem appears to be unbounded.',
    4: 'Optimization failed. Singular matrix encountered.'
  }

  let A = cloneDeep(initA)
  const b = cloneDeep(initb)
  let c = cloneDeep(initc)
  const heightA = shape(A)[0]
  const diagonalMatrix = identityMatrix(heightA)
  const addSlackVariableToRow = (row, index) =>
    [...row, ...diagonalMatrix[index]]
  A = A.map(addSlackVariableToRow)
  const zerosOfHeightA = zeros(heightA)
  c = [...c, ...zerosOfHeightA]
  const widthA = shape(A)[1]
  // All constraints must have b >= 0.
  _revertNegativeConstraints(A, b)
  // As all constraints are equality constraints the artificial variables
  // will also be basic variables.
  const pseudoVariablesIndexes = arange(heightA, widthA)
  const basis = [...pseudoVariablesIndexes] // copy
  // Format the phase one tableau by adding artificial variables and stacking
  // the constraints, the objective row and pseudo-objective row.
  let tableau = _createTableau({
    A,
    b,
    c,
    c0,
    diagonalMatrix,
    pseudoVariablesIndexes,
    zerosOfHeightA
  })
  let solveSimplexResult = _solveSimplex({
    basis,
    maximumIterations,
    phase: 1,
    tableau,
    tolerance
  })

  const tableauLastItemByModulo = _lastItemByModulo(tableau)
  status = solveSimplexResult.status
  if (tableauLastItemByModulo < tolerance) {
    tableau = _shrink(tableau, pseudoVariablesIndexes)
  } else {
    // Failure to find a feasible starting point
    status = 2
    messages[status] = `Phase 1 of the simplex method failed to find a feasible solution. The pseudo-objective function evaluates to ${tableauLastItemByModulo} which exceeds the required tolerance of ${tolerance} for a solution to be considered 'close enough' to zero to be a basic solution. Consider increasing the tolerance to be greater than ${tableauLastItemByModulo}. If this tolerance is unacceptably large the problem may be infeasible.`
  }

  const iterationNumber = solveSimplexResult.iterationNumber
  if (status === 0) {
    // Phase 2
    solveSimplexResult = _solveSimplex({
      basis,
      maximumIterations,
      phase: 2,
      tableau,
      tolerance
    })
  }

  const solution = _findSolution({ basis, heightA, tableau, widthA })
  status = solveSimplexResult.status

  return {
    iterationNumber,
    message: messages[status],
    solution,
    status
  }
}

function _solveSimplex ({
  basis,
  maximumIterations = 1000,
  phase = 2,
  tableau,
  tolerance = 1e-9
}) {
  let iterationNumber = 0
  let status = 0
  let complete = false
  while (!complete) {
    // Find the pivot column
    const pivotColumn = _pivotColumn(tableau, tolerance)
    let pivotRow = {}
    if (isNaN(pivotColumn)) {
      pivotRow = NaN
      status = 0
      complete = true
    } else {
      // Find the pivot row
      pivotRow = _pivotRow({ tableau, pivotColumn, phase, tolerance })
      if (isNaN(pivotRow)) {
        status = 3
        complete = true
      }
    }
    if (!complete) {
      const isMaximumIterations = iterationNumber >= maximumIterations
      if (isMaximumIterations) {
        // Iteration limit exceeded
        status = 1
        complete = true
      } else {
        _changeBasis({ basis, pivotColumn, pivotRow })
        _applyPivot({ tableau, pivotRow, pivotColumn })
        iterationNumber++
      }
    }
  }

  return {
    iterationNumber,
    status
  }
}

export { simplex }
