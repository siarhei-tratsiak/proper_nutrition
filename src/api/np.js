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
    const zeros = () => this.zeros(size)
    const identityMatrix = Array.from(Array(size), zeros)
    identityMatrix.forEach((row, index) => (row[index] = 1))
    return identityMatrix
  },

  less: (array, value) => {
    const arrayOfboolean = array.map((element) => element < value)
    return arrayOfboolean
  },

  minNonMaskedIndex: (array) => {
    const isNotMasked = (element) => element !== '-'
    const nonMaskedElements = array.filter(isNotMasked)
    const min = Math.min(...nonMaskedElements)
    const index = array.indexOf(min)
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

function _nonMaskedSum (accumulator, currentValue) {
  const isMasked = currentValue === '-'
  const nonMaskedCount = accumulator + +!isMasked
  return nonMaskedCount
}

export { np }
