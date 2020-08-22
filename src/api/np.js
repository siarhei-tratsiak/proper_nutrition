function arange (lenght, initialValue) {
  const elementCallback = (_, index) => index + initialValue
  const array = Array.from(Array(lenght), elementCallback)
  return array
}

function _checkLessArguments (array, value) {
  const conditionsAndErrors = [
    {
      condition: !Array.isArray(array),
      error: 'First function argument should be an array.'
    },
    {
      condition: !array.every(_isNumeric),
      error: 'Array must contain only numbers.'
    },
    {
      condition: !_isNumeric(value),
      error: 'Second function argument should be a number.'
    }
  ]
  conditionsAndErrors.forEach((conditionAndError) => {
    if (conditionAndError.condition) {
      throw new TypeError(conditionAndError.error)
    }
  })
}

function countNonMaskedElements (maskedArray) {
  const nonMaskedCount = maskedArray.reduce(_nonMaskedSum, 0)
  return nonMaskedCount
}

function identityMatrix (size) {
  const matrix = _zerosMatrix(size)
  matrix.forEach((row, index) => (row[index] = 1))
  return matrix
}

function isClose ({
  firstValue,
  secondValue,
  relativeTolerance = 1e-9,
  absoluteTolerance = 0
}) {
  const absoluteDifference = Math.abs(firstValue - secondValue)
  const maxAbsoluteValue = Math.max(
    Math.abs(firstValue),
    Math.abs(secondValue)
  )
  const maxTolerance = Math.max(
    relativeTolerance * maxAbsoluteValue,
    absoluteTolerance
  )
  const isClose = absoluteDifference <= maxTolerance
  return isClose
}

function _isNumeric (n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}

function less (array, value) {
  _checkLessArguments(array, value)
  const arrayOfboolean = array.map((element) => element < value)
  return arrayOfboolean
}

function minNonZeroIndex (array) {
  const filterCallback = (element) => element !== 0 && element !== '-'
  const nonZeroAndNonMaskedElements = array.filter(filterCallback)
  const min = Math.min.apply(null, nonZeroAndNonMaskedElements)
  const minIndex = (element) => element === min
  const index = array.findIndex(minIndex)
  return index
}

function _nonMaskedSum (accumulator, currentValue) {
  const isMasked = currentValue === '-'
  const nonMaskedCount = accumulator + +!isMasked
  return nonMaskedCount
}

function shape (array) {
  let arr = array
  const dimensions = []
  while (Array.isArray(arr)) {
    dimensions.push(arr.length)
    arr = arr[0]
  }
  return dimensions
}

function zeros (lenght) {
  const array = new Array(lenght).fill(0)
  return array
}

function _zerosMatrix (size) {
  const zerosMatrix = Array.from(Array(size), () => zeros(size))
  return zerosMatrix
}

export {
  arange,
  countNonMaskedElements,
  identityMatrix,
  isClose,
  less,
  minNonZeroIndex,
  shape,
  zeros
}
