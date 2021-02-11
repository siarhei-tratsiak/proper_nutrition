import { foodNutrient } from '@/data/foodNutrient.js'
import { products } from '@/data/products.js'
import { nutrientIndices } from '@/data/nutrientIndices.js'

const service = {
  getNutrientMinMaxValues: (constraints, userID) => {
    return constraints.map(constraint => ({
      user_id: userID,
      nutrient_id: constraint.id,
      min: _countMin(constraint),
      max: _countMax(constraint)
    }))
  },

  isNoExtremum: (constraints) => {
    const extremumIndex = constraints.findIndex(
      constraint => constraint.target !== 2
    )
    return extremumIndex === -1
  },

  notMatchingIDs: (id, idList) => {
    return !idList.includes(id)
  },

  toNotMinMax: (minMaxValue) => {
    const source = {
      target: 2,
      min_mutable: 0,
      max_mutable: 0
    }
    return Object.assign(minMaxValue, source)
  }
}

function _countMin (nutrient) {
  const min = nutrient.isExactValues
    ? nutrient.min
    : Math.round(nutrient.count * 0.9)
  return min
}

function _countMax (nutrient) {
  const max = nutrient.isExactValues
    ? nutrient.max
    : Math.round(nutrient.count * 1.1)
  return max
}

function arraysDifference (array1, array2) {
  return array1.filter(item => !array2.includes(item))
}

function clauseForSelectedAll (filters, userId) {
  return filters.where('user_id').equals(userId)
}

function clauseForSelectedProducts (filters, userID, payload) {
  const payloadIDs = payload.map(id => [userID, id])
  return filters.where(['user_id', 'product_id']).anyOf(payloadIDs)
}

function countGoalvalue (weight) {
  let goalValue = 0
  if (weight >= 60 && weight < 70) {
    goalValue = 1
  } else if (weight >= 70 && weight < 80) {
    goalValue = 2
  } else {
    goalValue = 3
  }
  return goalValue
}

function getA (groupedNutrients, simplexConstraints) {
  let constraintsIndices = simplexConstraints.map(
    constraint => constraint.nutrient_id
  )
  const AMin = _getA(constraintsIndices, groupedNutrients, false)
  constraintsIndices = simplexConstraints
    .filter(constraint => constraint.max !== null)
    .map(constraint => constraint.nutrient_id)
  const AMax = _getA(constraintsIndices, groupedNutrients, true)
  const A = AMin.concat(AMax)
  return A
}

function _getA (constraintsIndices, groupedNutrients, isPositive) {
  return constraintsIndices.map(nutrientID => {
    const nutrientPosition = getNutrientPosition(nutrientID)
    const row = groupedNutrients.map(
      product => product[1][nutrientPosition] * (isPositive ? 1 : -1)
    )
    return row
  })
}

function getB (simplexConstraints, objective) {
  const BMin = _getBMin(simplexConstraints, objective)
  const BMax = _getBMax(simplexConstraints, objective)
  const B = BMin.concat(BMax)
  return B
}

function _getBMin (simplexConstraints, objective) {
  const nutrientID = objective.nutrient_id
  const target = objective.target
  if (target === 0) {
    return simplexConstraints.map(constraint =>
      nutrientID === constraint.nutrient_id ? 0 : -constraint.min
    )
  }
  return simplexConstraints.map(constraint => -constraint.min)
}

function _getBMax (simplexConstraints, objective) {
  const filteredConstraints = simplexConstraints.filter(
    constraint => constraint.max !== null
  )
  const nutrientID = objective.nutrient_id
  const target = objective.target
  if (target === 0) {
    return filteredConstraints.map(constraint =>
      nutrientID === constraint.nutrient_id ? constraint.min : constraint.max
    )
  }
  return filteredConstraints.map(constraint => constraint.max)
}

function getC (groupedNutrients, objective) {
  const objectivetPosition = getNutrientPosition(objective.nutrient_id)
  return groupedNutrients.map(food => -food[1][objectivetPosition])
}

function getConstraintWithRation (nutrients, constraint, days) {
  const nutrientID = constraint.nutrient_id
  const nutrientIndex = nutrientIndices.findIndex(
    nutrientIndex => nutrientIndex === nutrientID
  )
  const nutrientValue = nutrients[nutrientIndex].valueAbs
  const borders = [constraint.min, constraint.max]
  const result = borders.map(border => {
    if (border === null) {
      return null
    } else {
      let result = border * days - nutrientValue
      if (result < 0) {
        result = 0
      }
      return result
    }
  })
  return result
}

function getFilteredNutrients (selectedProducts) {
  const selectedProductsIndices = selectedProducts.map(product => product[0])
  return foodNutrient.filter(product =>
    selectedProductsIndices.includes(product[0])
  )
}

function getIndices (groupedNutrients) {
  return groupedNutrients.map(product => product[0])
}

function getNutrientPosition (nutrientID) {
  return nutrientIndices.indexOf(nutrientID)
}

// it can't be getter because of async
async function getSelectedProducts (db) {
  const selectedFilters = await db.filters.where({ selected: 1 }).toArray()
  const selectedFildersIDs = selectedFilters.map(filter => filter.product_id)
  const result = products.filter(product =>
    selectedFildersIDs.includes(product[0])
  )
  return result
}

function isNoExtremum (constraints) {
  const extremumIndex = constraints.findIndex(
    constraint => constraint.target !== 2
  )
  return extremumIndex === -1
}

function isOldTarget (oldTarget, newTargetID) {
  let isOldTarget = false
  if (oldTarget.length) {
    const id = oldTarget[0].id
    isOldTarget = id !== newTargetID
  }
  return isOldTarget
}

function modifySelected (filters, userID, selectedIDs, isSelected) {
  const whereClauseUnselected = clauseForSelectedProducts(
    filters,
    userID,
    selectedIDs
  )
  whereClauseUnselected.modify({
    selected: isSelected
  })
}

export {
  arraysDifference,
  clauseForSelectedAll,
  clauseForSelectedProducts,
  countGoalvalue,
  getA,
  getB,
  getC,
  getConstraintWithRation,
  getFilteredNutrients,
  getIndices,
  getSelectedProducts,
  isNoExtremum,
  isOldTarget,
  modifySelected,
  service
}
