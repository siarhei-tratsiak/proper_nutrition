const exceptions = {
  exceeds: _exceeds,
  notArray: _notArray,
  notDate: _notDate,
  notInteger: _notInteger,
  notNumericOrMasked: _notNumericOrMasked,
  notPositive: _notPositive
}

function checkArguments (exceptionList) {
  exceptionList.flat().forEach((exception) => {
    if (exception.condition) {
      throw exception.exception
    }
  })
}

function _exceeds (params) {
  const [[name, value], [borderName, borderValue]] = Object.entries(params)
  return {
    condition: value > borderValue,
    exception: `${name} = ${value} exceeds ${borderName} = ${borderValue}`
  }
}

function _notArray (params) {
  return Object.entries(params).map(param => ({
    condition: !Array.isArray(param[1]),
    exception: `${param[0]} = ${param[1]} should be an array`
  }))
}

function _notDate (date) {
  return `${date} can't be converted into date`
}

function _notInteger (params) {
  return Object.entries(params).map(param => ({
    condition: !Number.isInteger(param[1]),
    exception: `${param[0]} = ${param[1]} should be integer`
  }))
}

function _notNumericOrMasked (array) {
  const isNumeric = value => !isNaN(parseFloat(value)) && isFinite(value)
  const isMasked = value => value === '-'
  const findIndex = value => !(isNumeric(value) || isMasked(value))
  const finded = array.findIndex(findIndex)
  return {
    condition: finded !== -1,
    exception: `array[${finded}] = ${array[finded]} should be numeric or masked`
  }
}

function _notPositive (params) {
  return Object.entries(params).map(param => ({
    condition: !(param[1] > 0),
    exception: `${param[0]} = ${param[1]} should be positive`
  }))
}

export { checkArguments, exceptions }
