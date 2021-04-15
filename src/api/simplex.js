import { np } from '@/api/np'
import { cloneDeep } from 'lodash'

function simplex ({
  restrictionMatrix,
  constraintsVector,
  objectiveCoefficients,
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

  let A = cloneDeep(restrictionMatrix)
  const b = cloneDeep(constraintsVector)
  let c = cloneDeep(objectiveCoefficients)

  const heightA = np.shape(A)[0]
  const diagonalMatrix = np.identityMatrix(heightA)
  const addSlackVariableToRow = (row, index) =>
    [...row, ...diagonalMatrix[index]]
  // normalization from scipy.optimize.linprog
  A = A.map(addSlackVariableToRow)
  const widthA = np.shape(A)[1]
  // All constraints must have b >= 0.
  _revertNegativeConstraints(A, b)
  A = A.map(addSlackVariableToRow)
  const zerosOfHeightA = np.zeros(heightA)
  c = [...c, ...zerosOfHeightA, ...zerosOfHeightA]
  // As all constraints are equality constraints
  // the artificial variables will also be basic variables.
  const pseudoVariablesIndexes = np.arange(heightA, widthA)
  const basis = [...pseudoVariablesIndexes] // copy
  // Format the phase one tableau by adding artificial variables and stacking
  // the constraints, the objective row and pseudo-objective row.
  let tableau = _createTableau({
    A,
    b,
    c,
    c0,
    diagonalMatrix,
    pseudoVariablesIndexes
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

  const iterationStart = solveSimplexResult.iterationNumber
  if (status === 0) {
    // Phase 2
    solveSimplexResult = _solveSimplex({
      basis,
      iterationStart,
      maximumIterations,
      phase: 2,
      tableau,
      tolerance
    })
  }
  status = solveSimplexResult.status

  const solution = _findSolution({ basis, heightA, tableau, widthA })

  return {
    iterationNumber: solveSimplexResult.iterationNumber,
    message: messages[status],
    solution,
    status: solveSimplexResult.status
  }
}

function _revertNegativeConstraints (A, b) {
  const isNegativeConstraints = np.less(b, 0)
  isNegativeConstraints.forEach((isNegativeConstraint, index) => _revertNegativeConstraint(A, b, isNegativeConstraint, index))
}

function _revertNegativeConstraint (A, b, isNegativeConstraint, index) {
  if (isNegativeConstraint) {
    A[index] = A[index].map(element => -element)
    b[index] = -b[index]
  }
}

function _createTableau ({
  A,
  b,
  c,
  c0,
  pseudoVariablesIndexes
}) {
  const rowConstraints = _getRowConstraints(A, b)
  const rowObjective = [...c, c0]
  const rowPseudoObjective =
    _getRowPseudoObjective(pseudoVariablesIndexes, rowConstraints)
  const tableau = [...rowConstraints, rowObjective, rowPseudoObjective]
  return tableau
}

function _getRowConstraints (A, b) {
  const rowConstraint = (row, index) =>
    [...row, b[index]]
  const rowConstraints = A.map(rowConstraint)
  return rowConstraints
}

function _getRowPseudoObjective (pseudoVariablesIndexes, rowConstraints) {
  const rowPseudoObjective = _constraintsReverseSum(rowConstraints)
  pseudoVariablesIndexes.forEach(element => { rowPseudoObjective[element] = 0 })
  return rowPseudoObjective
}

function _constraintsReverseSum (rowConstraints) {
  const initialValue = []
  const constraintsReverseSum = rowConstraints.reduce(_reverseSum, initialValue)
  return constraintsReverseSum
}

function _reverseSum (accumulator, row) {
  return row.map((element, index) => (accumulator[index] || 0) - element)
}

function _solveSimplex ({
  basis,
  iterationStart = 0,
  maximumIterations = 1000,
  phase = 2,
  tableau,
  tolerance = 1e-9
}) {
  let iterationNumber = iterationStart
  let status = 0
  let complete = false
  let pivotColumn = 0

  if (phase === 2) {
    const rowLength = tableau[0].length
    const pivotRows = np.arange(basis.length, 0)
      .filter(row => basis[row] > rowLength - 2)
    const rowIndices = np.arange(rowLength - 1)
    pivotRows.forEach(pivotRow => {
      const nonZeroRows = rowIndices
        .filter(column => Math.abs(tableau[pivotRow][column]) > tolerance)
      if (nonZeroRows.length) {
        pivotColumn = nonZeroRows[0]
        _applyPivot({ tableau, pivotRow, pivotColumn })
        iterationNumber++
      }
    })
  }

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

function _pivotColumn (tableau, tolerance = 1e-9) {
  const tableauHeight = tableau.length
  const mask = element => (element >= -tolerance ? '-' : element)
  const maskedPseudoObjective = tableau[tableauHeight - 1]
    .slice(0, -1)
    .map(mask)
  const pivotColumn = _isAllMasked(maskedPseudoObjective)
    ? NaN
    : np.minNonMaskedIndex(maskedPseudoObjective)
  return pivotColumn
}

function _isAllMasked (array) {
  const isAllMasked = np.countNonMaskedElements(array) === 0
  return isAllMasked
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
  if (_isAllMasked(maskedPivotColumn)) {
    return pivotRow
  }
  const maskConstraint = row =>
    row[pivotColumn] <= tolerance ? '-' : row[row.length - 1]
  const maskedConstraints = slicedTableau.map(maskConstraint)
  const pivotOperation = (element, index) =>
    element !== '-' ? element / maskedPivotColumn[index] : element
  const pivotOperations = maskedConstraints.map(pivotOperation)
  pivotRow = np.minNonMaskedIndex(pivotOperations)
  return pivotRow
}

function _changeBasis ({ basis, pivotColumn, pivotRow }) {
  basis[pivotRow] = pivotColumn
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

function _lastItemByModulo (tableau) {
  const tableauShape = np.shape(tableau)
  const lastRowIndex = tableauShape[0] - 1
  const lastColumnIndex = tableauShape[1] - 1
  const lastItemByModulo = Math.abs(tableau[lastRowIndex][lastColumnIndex])
  return lastItemByModulo
}

function _shrink (tableau, pseudoVariablesIndexes) {
  // Remove the pseudo-objective row from the tableau
  tableau = tableau.slice(0, -1)
  // Remove the artificial variable columns from the tableau
  const nonArtificialVariableColumns = (_, index) =>
    !pseudoVariablesIndexes.includes(index)
  const filterRows = row => row.filter(nonArtificialVariableColumns)
  tableau = tableau.map(filterRows)
  return tableau
}

function _findSolution ({ basis, heightA, tableau, widthA }) {
  let solution = np.zeros(widthA + heightA)
  const lastColumnIndex = np.shape(tableau)[1] - 1
  const tableauLastColumn = tableau
    .slice(0, heightA)
    .map(row => row[lastColumnIndex])
  const assignSolution = (element, index) => {
    solution[element] = tableauLastColumn[index]
  }
  basis
    .slice(0, heightA)
    .forEach(assignSolution)
  solution = solution
    .slice(0, widthA)
    .slice(0, widthA - heightA)
  return solution
}

export { simplex }
