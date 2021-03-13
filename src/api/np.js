const np = {
  arange: (lenght, initialValue) => {
    const elementCallback = (_, index) => index + initialValue
    const array = Array.from(Array(lenght), elementCallback)
    return array
  },

  countNonMaskedElements: (maskedArray) => {
    const nonMaskedCount = maskedArray.reduce(_nonMaskedSum, 0)
    return nonMaskedCount
  },

  identityMatrix: function (size) {
    const zeros = this.zeros
    const zerosMatrix = Array.from(Array(size), () => zeros(size))
    const identityMatrix = zerosMatrix
    identityMatrix.forEach((row, index) => (row[index] = 1))
    return identityMatrix
  },

  less: (array, value) => {
    _checkLessArguments(array, value)
    const arrayOfboolean = array.map((element) => element < value)
    return arrayOfboolean
  },

  minNonMaskedIndex: (array) => {
    const isMotMasked = (element) => element !== '-'
    const nonMaskedElements = array.filter(isMotMasked)
    const min = Math.min.apply(null, nonMaskedElements)
    const minIndex = (element) => element === min
    const index = array.findIndex(minIndex)
    return index
  },

  shape: (array) => {
    const dimensions = []
    while (Array.isArray(array)) {
      dimensions.push(array.length)
      array = array[0]
    }
    return dimensions
  },

  zeros: (lenght) => new Array(lenght).fill(0)
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

function _isNumeric (n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}

function _nonMaskedSum (accumulator, currentValue) {
  const isMasked = currentValue === '-'
  const nonMaskedCount = accumulator + +!isMasked
  return nonMaskedCount
}

export { np }
