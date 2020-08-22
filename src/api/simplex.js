import {
  shape,
  less,
  arange,
  identityMatrix,
  zeros,
  countNonMaskedElements,
  minNonZeroIndex,
  isClose
} from './np.js'
import { cloneDeep } from 'lodash'
import { perfStart, perfEnd, perfResults } from './perfomance.js'

function _pivotCol (T, tol = 1e-9) {
  perfStart('pivotCol')
  const TLength = T.length
  const ma = T[TLength - 1]
    .slice(0, -1)
    .map(curVal => (curVal >= -tol ? '-' : curVal))

  if (countNonMaskedElements(ma) === 0) {
    return {
      pivcol_found: false,
      pivcol: NaN
    }
  }
  perfEnd('pivotCol')

  return {
    pivcol_found: true,
    pivcol: minNonZeroIndex(ma)
  }
}

function _pivotRow (T, pivcol, phase, tol = 1e-9) {
  perfStart('pivotRow')
  const k = phase === 1 ? 2 : 1
  const ma = T.slice(0, -k).map(row =>
    row[pivcol] <= tol ? '-' : row[pivcol]
  )
  if (countNonMaskedElements(ma) === 0) {
    return {
      pivrow_found: false,
      pivrow: NaN
    }
  }
  const mb = T.slice(0, -k).map(row =>
    row[pivcol] <= tol ? '-' : row[row.length - 1]
  )
  const q = mb.map((curVal, index) =>
    curVal !== '-' ? curVal / ma[index] : curVal
  )
  perfEnd('pivotRow')
  return {
    pivrow_found: true,
    pivrow: minNonZeroIndex(q)
  }
}

function _applyPivot (T, basis, pivrow, pivcol, tol = 1e-9) {
  perfStart('applyPivot')
  basis[pivrow] = pivcol
  const pivval = T[pivrow][pivcol]
  const Tpivrow = T[pivrow].map(curVal => curVal / pivval)

  perfStart('applyPivotT')
  T.forEach(function (row, irow) {
    perfStart('TIrowPivcol')
    const TIrowPivcol = row[pivcol]
    perfEnd('TIrowPivcol')
    perfStart('rowMap')
    const newRow = row.map(
      (curVal, index) => curVal - Tpivrow[index] * TIrowPivcol
    )
    perfEnd('rowMap')
    /* row.forEach((curVal, index) =>
      newRow.push(curVal - Tpivrow[index] * TIrowPivcol)
    ); */
    perfStart('newRow')
    T[irow] = newRow
    perfEnd('newRow')
    // T[irow] = row.map((curVal, index) => curVal - Tpivrow[index] * TIrowPivcol);
  })
  perfEnd('applyPivotT')
  T[pivrow] = Tpivrow

  // The selected pivot should never lead to a pivot value less than the tol.
  if (isClose(pivval, tol, 0, 1e4)) {
    const message = `The pivot operation produces a pivot value of ${pivval},
      which is only slightly greater than the specified
      tolerance ${tol}. This may lead to issues regarding the
      numerical stability of the simplex method.
      Removing redundant constraints, changing the pivot strategy
      via Bland's rule or increasing the tolerance may
      help reduce the issue.`
    console.warn(message)
  }
  perfEnd('applyPivot')
  /* T = T.map(function (row) {
    const TIrowPivcol = row[pivcol]
    return row.map((curVal, index) => curVal - Tpivrow[index] * TIrowPivcol)
  })
  T[pivrow] = Tpivrow
  return T */
}

function _solveSimplex (
  T,
  basis,
  maxiter = 1000,
  phase = 2,
  tol = 1e-9,
  status = 0,
  nit0 = 0
) {
  perfStart('solveSimplex')
  let nit = nit0
  let complete = false

  while (!complete) {
    // Find the pivot column
    const pivcolResult = _pivotCol(T, tol)
    let pivrowResult = {}
    if (!pivcolResult.pivcol_found) {
      pivcolResult.pivcol = NaN
      pivrowResult.pivrow = NaN
      status = 0
      complete = true
    } else {
      // Find the pivot row
      pivrowResult = _pivotRow(T, pivcolResult.pivcol, phase, tol)
      if (!pivrowResult.pivrow_found) {
        status = 3
        complete = true
      }
    }
    if (!complete) {
      if (nit >= maxiter) {
        // Iteration limit exceeded
        status = 1
        complete = true
      } else {
        _applyPivot(T, basis, pivrowResult.pivrow, pivcolResult.pivcol, tol)
        nit += 1
      }
    }
  }
  perfEnd('solveSimplex')

  return {
    nit,
    status,
    T
  }
}

function simplex (initA, initb, initc, c0 = 0, maxiter = 1000, tol = 1e-9) {
  perfStart('simplex')
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
  const n = shape(A)[0]
  const diagM = identityMatrix(n)
  A = A.map((curRow, index) => [...curRow, ...diagM[index]])
  c = [...c, ...zeros(n)]
  const m = shape(A)[1]

  // All constraints must have b >= 0.
  const isNegativeConstraint = less(b, 0)
  isNegativeConstraint.forEach((curVal, index) => {
    if (curVal) {
      A[index] = A[index].map(element => -1 * element)
      b[index] = -1 * b[index]
    }
  })

  // As all constraints are equality constraints the artificial variables
  // will also be basic variables.
  const av = arange(n, m)
  const basis = av.slice() // copy

  // Format the phase one tableau by adding artificial variables and stacking
  // the constraints, the objective row and pseudo-objective row.
  const rowConstraints = cloneDeep(
    A.map((curRow, index) => [...curRow, ...diagM[index], b[index]])
  )
  const rowObjective = [...c, ...zeros(n), c0]
  const rowPseudoObjective = rowConstraints.reduce(
    (acc, row) =>
      row.map((curVal, index) => (acc[index] ? acc[index] : 0) - curVal),
    []
  )

  av.forEach(function (curVal) {
    rowPseudoObjective[curVal] = 0
  })
  let T = [...rowConstraints, rowObjective, rowPseudoObjective]
  const phase = 1

  let solveSimplexResult = _solveSimplex(T, basis, maxiter, phase, tol)

  const nit1 = solveSimplexResult.nit
  status = solveSimplexResult.status
  const nit2 = nit1
  const lastItemInT = Math.abs(T[T.length - 1][T[0].length - 1])
  if (lastItemInT < tol) {
    // Remove the pseudo - objective row from the tableau
    T = T.slice(0, -1)
    // Remove the artificial variable columns from the tableau
    T = T.filter((row, index) => av.indexOf(index) === -1)
  } else {
    // Failure to find a feasible starting point
    status = 2
    messages[status] = `Phase 1 of the simplex method failed to find a feasible
        solution. The pseudo-objective function evaluates to ${lastItemInT}
        which exceeds the required tolerance of ${tol} for a solution to be
        considered 'close enough' to zero to be a basic solution.
        Consider increasing the tolerance to be greater than ${lastItemInT}.
        If this tolerance is unacceptably  large the problem may be
        infeasible.`
  }

  if (status === 0) {
    // Phase 2
    solveSimplexResult = _solveSimplex(T, basis, maxiter, 2, tol)
  }

  const solution = zeros(n + m)
  const rowLength = shape(T)[1]
  const lastColT = T.slice(0, n).map(row => row[rowLength - 1])
  basis.slice(0, n).forEach(function (curVal, index) {
    solution[curVal] = lastColT[index]
  })
  const x = solution.slice(0, m).slice(0, c.length - n)

  perfEnd('simplex')
  perfResults()

  return {
    x,
    status,
    message: messages[status],
    iteration: nit2
  }
}

export { simplex }
