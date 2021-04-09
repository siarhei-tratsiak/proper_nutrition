const exceptions = {
  notADate: date => `${date} can't be converted into date`,
  notInteger: (name, value) => ({
    condition: !Number.isInteger(value),
    exception: `${name} = ${value} should be integer`
  }),
  startExceedsEnd: (start, end) => ({
    condition: start > end,
    exception: `start = ${start} exceeds end = ${end}`
  })
}

function checkArguments (exceptionList) {
  exceptionList.forEach((exception) => {
    if (exception.condition) {
      throw exception.exception
    }
  })
}

export { checkArguments, exceptions }
