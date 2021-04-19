import { inv, largerEq, multiply, smallerEq, transpose } from 'mathjs'

export default function lsqLinear (A, b, bounds = [-Infinity, Infinity], tol = 1e-10, lsmr_tol = null, max_iter = null, verbose = 0) {
  const xlsq = _lstsq(A, b)
  if (_inBounds(xlsq, bounds)) {
    return xlsq
  }
  return _trfLinear(xlsq)
}

function _lstsq (A, b) {
  const AT = transpose(A)
  const ATA = multiply(AT, A)
  const ATAI = inv(ATA)
  const X = multiply(ATAI, AT, b)
  return X
}

function _inBounds (array, bounds) {
  const inLowerBounds = largerEq(array, bounds[0])
  const inUpperBounds = smallerEq(array, bounds[1])
  const isNotInBounds = isInBounds => !isInBounds
  return inLowerBounds.concat(inUpperBounds).some(isNotInBounds)
}

function _trfLinear (xlsq) {
  return xlsq
}
