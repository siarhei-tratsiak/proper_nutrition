import { deepCopy } from "./deepCopy.js";

function shape(array) {
  let arr = deepCopy(array);
  const dimensions = [];

  while (Array.isArray(arr)) {
    dimensions.push(arr.length);
    arr = arr[0];
  }

  return dimensions;
}

function _isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function _checkLessArguments(array, value) {
  const conditionsAndErrors = [
    {
      condition: !Array.isArray(array),
      error: "First function argument should be an Array."
    },
    {
      condition: !array.every(_isNumeric),
      error: "Array must contain only numbers."
    },
    {
      condition: !_isNumeric(value),
      error: "Second function argument should be an Array."
    }
  ];
  conditionsAndErrors.forEach(conditionAndError => {
    if (conditionAndError.condition) {
      throw new TypeError(conditionAndError.error);
    }
  });
}

function less(array, value) {
  _checkLessArguments(array, value);
  return array.map(curVal => curVal < value);
}

function arange(n, sign, m) {
  const array = [];
  if (sign === "+") {
    for (let i = 0; i < n; i++) {
      array.push(i + m);
    }
  }
  return array;
}

function eye(n) {
  const arr = [];
  for (let i = 0; i < n; i++) {
    arr.push([]);
    for (let j = 0; j < n; j++) {
      arr[i].push(i === j ? 1 : 0);
    }
  }
  return arr;
}

function zeros(n) {
  const arr = [];
  for (let i = 0; i < n; i++) {
    arr.push(0);
  }
  return arr;
}

function maCount(maskedArray) {
  const count = maskedArray.reduce(
    (acc, curVal) => (curVal === "-" ? acc : acc + 1),
    0
  );
  return count;
}

function MAcount1(maskedArray) {
  const count = maskedArray.find(value => value !== "-");
  return typeof count === "undefined" ? 0 : 1;
}

function MAmask(maskedArray) {
  const isMaskArray = maskedArray.map(curVal => curVal === "-");
  return isMaskArray;
}

function nonzero(arr) {
  const nonzero = arr.reduce((acc, curVal, index) => {
    if (curVal != 0) {
      acc.push(index);
    }
    return acc;
  }, []);
  return nonzero;
}

function minNonzeroIndices(arr) {
  let indices = [];
  arr.reduce((acc, curVal, index) => {
    if (curVal !== 0 && curVal !== "-") {
      if (acc > curVal) {
        indices = [index];
        return curVal;
      } else if (acc === curVal && isFinite(acc)) {
        indices.push(index);
        return acc;
      }
    }
    return acc;
  }, Infinity);
  return indices;
}

function minNonzeroIndex(arr) {
  let lowest = undefined;
  let i = 0;
  while (typeof lowest === "undefined") {
    const arri = arr[i];
    if (arri !== 0 && arri !== "-") lowest = i;
    i++;
  }
  const arrLenght = arr.length;
  for (let i = lowest; i < arrLenght; i++) {
    const ai = arr[i];
    if (ai !== 0 && ai !== "-" && ai < arr[lowest]) lowest = i;
  }
  return lowest;
}

function take(arr, indices) {
  const res = arr.filter((curVal, index) => indices.indexOf(index) !== -1);
  return res;
}

function argmin(arr) {
  const res = arr.reduce(
    (acc, curVal, index) =>
      acc.value <= curVal
        ? acc
        : {
          index: index,
          value: curVal
        },
    {
      index: -1,
      value: Infinity
    }
  );
  return res.index;
}

function isclose(a, b, atol = 1e-8, rtol = 1e-5) {
  return Math.abs(a - b) <= atol + rtol * Math.abs(b);
}

export {
  shape,
  less,
  arange,
  eye,
  zeros,
  maCount,
  MAcount1,
  MAmask,
  nonzero,
  minNonzeroIndices,
  minNonzeroIndex,
  take,
  argmin,
  isclose
};
