import {
  shape,
  less,
  arange,
  eye,
  zeros,
  maCount, // MAcount1,
  // MAmask,
  // nonzero,
  // minNonzeroIndices,
  minNonzeroIndex,
  // take,
  // argmin,
  isclose,
} from './np.js';

let benchmark = {b1: 0, b2: 0};

/* function startBench(bench) {
  bench = bench === 0 ? performance.now() : bench;
  return bench;
}

function endBench(bench) {
  bench = performance.now() - bench;
  return bench;
}*/

function _pivotCol(T, tol = 1e-9/* , bland = false*/) {
  /* benchmark.ma = startBench(benchmark.ma)
  const ma = T.slice(-1)[0].slice(0, -1)
    .map(curVal => curVal >= -tol ? '-' : curVal)
  benchmark.ma = endBench(benchmark.ma)*/

  const TLength = T.length;
  const ma = T[TLength - 1].slice(0, -1)
      .map((curVal) => curVal >= -tol ? '-' : curVal);

  if (maCount(ma) === 0) {
    return {
      pivcol_found: false,
      pivcol: NaN,
    };
  }
  /* if (bland) {
    // ma.mask is sometimes 0d
    return {
      pivcol_found: true,
      pivcol: nonzero(MAmask(ma)
        .map(curVal => !curVal))[0] // first not 0 element in last column
    }
  }*/

  return {
    pivcol_found: true,
    pivcol: /* minNonzeroIndices(ma)[0]*/ minNonzeroIndex(ma),
  };
}

function _pivotRow(T, basis, pivcol, phase, tol = 1e-9/* , bland = false*/) {
  let k;
  if (phase === 1) {
    k = 2;
  } else {
    k = 1;
  }
  const ma = T.slice(0, -k)
      .map((row) => row[pivcol] <= tol ? '-' : row[pivcol]);
  if (maCount(ma) === 0) {
    return {
      pivrow_found: false,
      pivrow: NaN,
    };
  }
  const mb = T.slice(0, -k)
      .map((row) => row[pivcol] <= tol ? '-' : row[row.length - 1]);
  const q = mb.map(
      (curVal, index) => curVal !== '-' ? curVal / ma[index] : curVal,
  );
  /* const minRows = minNonzeroIndices(q)
  if (bland) {
    return {
      pivrow_found: true,
      pivrow: minRows[argmin(take(basis, minRows))]
    }
  }*/
  /* benchmark.b1 = startBench(benchmark.b1);
  const MAcount_0 = minNonzeroIndices(q)[0];
  benchmark.b1 = endBench(benchmark.b1);
  benchmark.b2 = startBench(benchmark.b2);
  const MAcount_1 = minNonzeroIndex(q);
  benchmark.b2 = endBench(benchmark.b2);*/
  return {
    pivrow_found: true,
    pivrow: /* minRows[0]*/ minNonzeroIndex(q),
  };
}

function _applyPivot(T, basis, pivrow, pivcol, tol = 1e-9) {
  basis[pivrow] = pivcol;
  const pivval = T[pivrow][pivcol];
  const Tpivrow = T[pivrow].map((curVal) => curVal / pivval);

  T.forEach(function(row, irow) {
    const TIrowPivcol = row[pivcol];
    T[irow] = row.map((curVal, index) => curVal - Tpivrow[index] * TIrowPivcol);
  });
  T[pivrow] = Tpivrow;

  // The selected pivot should never lead to a pivot value less than the tol.
  if (isclose(pivval, tol, 0, 1e4)) {
    const message =
      `The pivot operation produces a pivot value of ${pivval},
      which is only slightly greater than the specified
      tolerance ${tol}. This may lead to issues regarding the
      numerical stability of the simplex method.
      Removing redundant constraints, changing the pivot strategy
      via Bland's rule or increasing the tolerance may
      help reduce the issue.`;
    console.warn(message);
  }
  /* T = T.map(function (row) {
    const TIrowPivcol = row[pivcol]
    return row.map((curVal, index) => curVal - Tpivrow[index] * TIrowPivcol)
  })
  T[pivrow] = Tpivrow
  return T*/
}

function _solveSimplex(T, n, basis, maxiter = 1000, phase = 2,
    /* callback = undefined,*/
    tol = 1e-9, bland = false,
    /* _T_o = undefined,*/
    status = 0, /* message = '',*/ nit0 = 0) {
  let nit = nit0;
  let complete = false;

  while (!complete) {
    // Find the pivot column
    const pivcolResult = _pivotCol(T, tol, bland);
    let pivrowResult = {};
    if (!pivcolResult.pivcol_found) {
      pivcolResult.pivcol = NaN;
      pivrowResult.pivrow = NaN;
      status = 0;
      complete = true;
    } else {
      // Find the pivot row
      pivrowResult = _pivotRow(
          T, basis, pivcolResult.pivcol, phase, tol, bland,
      );
      if (!pivrowResult.pivrow_found) {
        status = 3;
        complete = true;
      }
    }
    if (!complete) {
      if (nit >= maxiter) {
        // Iteration limit exceeded
        status = 1;
        complete = true;
      } else {
        _applyPivot(T, basis, pivrowResult.pivrow, pivcolResult.pivcol, tol);
        nit += 1;
      }
    }
  }

  return {
    nit,
    status,
    T,
  };
}

function simplex(A, b, c, c0 = 0, maxiter = 1000,
    /* disp = false,*/ callback = undefined,
    tol = 1e-9, bland = false, _T_o = undefined) {
  /* A = [
    [1, -2],
    [-1, -1],
    [1, -1],
    [0, 1]
  ]
  b = [-2, -4, 2, 6]
  c = [-1, -2] */

  let status = 0;
  const messages = {
    0: 'Optimization terminated successfully.',
    1: 'Iteration limit reached.',
    2: 'Optimization failed. Unable to find a feasible starting point.',
    3: 'Optimization failed. The problem appears to be unbounded.',
    4: 'Optimization failed. Singular matrix encountered.',
  };

  const n = shape(A)[0];
  const diagM = eye(n);
  A = A.map((curRow, index) => [...curRow, ...diagM[index]]);
  c = [...c, ...zeros(n)];
  const m = shape(A)[1];

  // All constraints must have b >= 0.
  const isNegativeConstraint = less(b, 0);
  isNegativeConstraint.forEach((curVal, index) => {
    if (curVal) {
      A[index] = A[index].map((element) => -1 * element);
      b[index] = -1 * b[index];
    }
  });

  // As all constraints are equality constraints the artificial variables
  // will also be basic variables.
  const av = arange(n, '+', m);
  const basis = av.slice(); // copy

  // Format the phase one tableau by adding artificial variables and stacking
  // the constraints, the objective row and pseudo-objective row.
  const rowConstraints = A.map(
      (curRow, index) => [...curRow, ...diagM[index], b[index]],
  );
  const rowObjective = [...c, ...zeros(n), c0];
  const rowPseudoObjective = rowConstraints.reduce(
      (acc, row) => row.map(
          (curVal, index) => (acc[index] ? acc[index] : 0) - curVal,
      ), [],
  );

  av.forEach(function(curVal) {
    rowPseudoObjective[curVal] = 0;
  });
  let T = [...rowConstraints, rowObjective, rowPseudoObjective];
  const phase = 1;

  let solveSimplexResult = _solveSimplex(
      T, n, basis, maxiter, phase, callback, tol, bland, _T_o,
  );

  const nit1 = solveSimplexResult.nit;
  status = solveSimplexResult.status;
  const nit2 = nit1;
  const lastItemInT = Math.abs(T[T.length - 1][T[0].length - 1]);
  if (lastItemInT < tol) {
    // Remove the pseudo - objective row from the tableau
    T = T.slice(0, -1);
    // Remove the artificial variable columns from the tableau
    T = T.filter((row, index) => av.indexOf(index) === -1);
  } else {
    // Failure to find a feasible starting point
    status = 2;
    messages[status] =
      `Phase 1 of the simplex method failed to find a feasible
        solution. The pseudo-objective function evaluates to ${lastItemInT}
        which exceeds the required tolerance of ${tol} for a solution to be
        considered 'close enough' to zero to be a basic solution.
        Consider increasing the tolerance to be greater than ${lastItemInT}.
        If this tolerance is unacceptably  large the problem may be
        infeasible.`;
  }

  if (status === 0) {
    // Phase 2
    solveSimplexResult = _solveSimplex(
        T, n, basis, maxiter, 2, callback, tol, bland, _T_o, nit1,
    );
  }

  const solution = zeros(n + m);
  const rowLength = shape(T)[1];
  const lastColT = T.slice(0, n)
      .map((row) => row[rowLength - 1]);
  basis.slice(0, n)
      .forEach(function(curVal, index) {
        solution[curVal] = lastColT[index];
      });
  const x = solution.slice(0, m)
      .slice(0, c.length - n);

  benchmark = Object.keys(benchmark).map(
      (key) => benchmark[key] = benchmark[key] / nit2,
  );
  console.log(benchmark, nit2);

  return {
    x,
    status,
    message: messages[status],
    iteration: nit2,
  };
}

export {
  simplex,
};
