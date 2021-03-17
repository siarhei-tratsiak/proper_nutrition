import { foodNutrients } from '@/data/foodNutrients'
import { IDBS } from '@/api/indexedDBService'
import { products } from '@/data/products'
import { nutrientIndices } from '@/data/nutrientIndices'

const service = {
  countGoalvalue: (weight) => {
    let goalValue = 0
    if (weight >= 60 && weight < 70) {
      goalValue = 1
    } else if (weight >= 70 && weight < 80) {
      goalValue = 2
    } else {
      goalValue = 3
    }
    return goalValue
  },

  getConstraintsVector: (constraints, objective) => {
    const constraintsVectorMin = _getConstraintsVectorMin(constraints, objective)
    const constraintsVectorMax = _getConstraintsVectorMax(constraints, objective)
    const constraintsVector = constraintsVectorMin.concat(constraintsVectorMax)
    return constraintsVector
  },

  getConstraintsWithRation: (nutrients, constraint, days) => {
    const nutrientID = constraint.nutrient_id
    const nutrientIndex = nutrientIndices.findIndex(
      nutrientIndex => nutrientIndex === nutrientID
    )
    const nutrientValue = nutrients[nutrientIndex].valueAbs
    const constraints = [constraint.min, constraint.max]
    const constraintsWithRation = constraints.map(
      constraint => _constraintForRation(constraint, days, nutrientValue)
    )
    return constraintsWithRation
  },

  getFilteredNutrients: (selectedProductIDs) => {
    return foodNutrients.filter(product =>
      selectedProductIDs.includes(product[0])
    )
  },

  getNutrientMinMaxValues: (constraints, userID) => {
    return constraints.map(constraint => ({
      user_id: userID,
      nutrient_id: constraint.nutrient_id,
      min: constraint.min,
      max: constraint.max
    }))
  },

  getObjectiveCoefficients: (selectedProductNutrients, objective) => {
    const objectivePosition = _getNutrientPosition(objective.nutrient_id)
    return selectedProductNutrients
      .map(product => -product[1][objectivePosition])
  },

  getProductsData: (index, productValue, selectedProductIDs) => {
    const id = selectedProductIDs[index]
    const product = products.find(product => product[0] === +id)
    const name = product[1]
    const mass = productValue * 100
    return { id, name, mass }
  },

  getRestrictionMatrix: (productNutrients, constraints) => {
    let constraintNutrientIDs = constraints
      .filter(constraint => constraint.min !== 0) // удалить, если масса продуктов будет отрицательной
      .map(constraint => constraint.nutrient_id)
    let isMax = false
    const restrictionMatrixMin = _getRestrictionMatrix(
      constraintNutrientIDs,
      isMax,
      productNutrients
    )
    constraintNutrientIDs = constraints
      .filter(constraint => constraint.max !== null)
      .map(constraint => constraint.nutrient_id)
    isMax = true
    const restrictionMatrixMax = _getRestrictionMatrix(
      constraintNutrientIDs,
      isMax,
      productNutrients
    )
    const restrictionMatrix = restrictionMatrixMin.concat(restrictionMatrixMax)
    return restrictionMatrix
  },

  getSelectedProductIDs: (selectedProductNutrients) => {
    return selectedProductNutrients.map(product => product[0])
  },

  // it can't be getter because of async
  getSelectedProducts: async (db) => {
    const selectedFilters = await IDBS.getSelectedFilters(db)
    const selectedFiltersIDs = selectedFilters.map(filter => filter.product_id)
    const selectedProducts = products.filter(product =>
      selectedFiltersIDs.includes(product[0])
    )
    return selectedProducts
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

  roundToTenth: (value) => Math.round(value * 10) / 10,

  toNotMinMax: (minMaxValue) => {
    const source = {
      target: 2,
      min_mutable: 0,
      max_mutable: 0
    }
    return Object.assign(minMaxValue, source)
  }
}

function arraysDifference (array1, array2) {
  return array1.filter(item => !array2.includes(item))
}

function clauseForSelectedAll (filters, userId) {
  return filters.where('user_id').equals(userId)
}

function _constraintForRation (constraint, days, nutrientValue) {
  if (constraint === null) {
    return null
  } else {
    const constraintForRation = constraint * days - nutrientValue
    return constraintForRation < 0 ? 0 : constraintForRation
  }
}

function _getConstraintsVectorMin (constraints, objective) {
  const filteredConstraints = constraints
    .filter(constraint => constraint.min !== 0) // удалить, если масса продуктов будет отрицательной
  /* const nutrientID = objective.nutrient_id
  const target = objective.target
  if (target === 0) {
    return filteredConstraints.map(constraint =>
      nutrientID === constraint.nutrient_id ? 0 : -constraint.min
    )
  } */
  return filteredConstraints.map(constraint => -constraint.min)
}

function _getConstraintsVectorMax (constraints, objective) {
  const filteredConstraints = constraints.filter(
    constraint => constraint.max !== null
  )
  /* const nutrientID = objective.nutrient_id
  const target = objective.target
  if (target === 0) {
    return filteredConstraints.map(constraint =>
      nutrientID === constraint.nutrient_id ? constraint.min : constraint.max
    )
  } */
  return filteredConstraints.map(constraint => constraint.max)
}

function _getRestrictionMatrix (
  constraintNutrientIDs,
  isMax,
  productNutrients
) {
  return constraintNutrientIDs.map(nutrientID =>
    _restrictionCoefficients(isMax, nutrientID, productNutrients)
  )
}

function _restrictionCoefficients (isMax, nutrientID, productNutrients) {
  const nutrientPosition = _getNutrientPosition(nutrientID)
  const restrictionCoefficients = productNutrients.map(
    product => _restrictionCoefficient(isMax, nutrientPosition, product)
  )
  return restrictionCoefficients
}

function _getNutrientPosition (nutrientID) {
  return nutrientIndices.indexOf(nutrientID)
}

function _restrictionCoefficient (isMax, nutrientPosition, product) {
  const nutrientValue = product[1][nutrientPosition]
  const sign = isMax ? 1 : -1
  return sign * nutrientValue
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

export {
  arraysDifference,
  clauseForSelectedAll,
  isNoExtremum,
  isOldTarget,
  service
}
