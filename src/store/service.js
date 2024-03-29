import { foodNutrients } from '@/data/foodNutrients'
import { nutrientIndices } from '@/data/nutrientIndices'

const service = {
  arraysDifference: (array1, array2) =>
    array1.filter(item => !array2.includes(item)),

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

  excludeProductsForZeroMax: function (constraints, selectedProductIDs) {
    const selectedProductNutrients = this
      .getFilteredNutrients(selectedProductIDs)
    const zeroConstraint = constraint => constraint.max === 0
    const nutrientIDs = constraint => constraint.nutrient_id
    const zeroMaxNutrientIDs = constraints
      .filter(zeroConstraint)
      .map(nutrientIDs)
    const position = nutrientID =>
      nutrientIndices.findIndex(id => id === nutrientID)
    const zeroMaxPositions = zeroMaxNutrientIDs.map(position)
    const zeroNutrients = productNutrient => zeroMaxPositions
      .every(position => productNutrient[1][position] === 0)
    return selectedProductNutrients.filter(zeroNutrients)
  },

  excludeZeroMax: (constraints) => {
    return constraints.filter(constraint => constraint.max !== 0)
  },

  getConstraintsVector: (constraints) => {
    const constraintsVectorMin = _getConstraintsVectorMin(constraints)
    const constraintsVectorMax = _getConstraintsVectorMax(constraints)
    const constraintsVector = constraintsVectorMin.concat(constraintsVectorMax)
    return constraintsVector
  },

  getConstraintsWithRation: (nutrients, constraint, days) => {
    const nutrientID = constraint.nutrient_id
    const byNutrientID = nutrient => nutrient.id === nutrientID
    const nutrient = nutrients.find(byNutrientID)
    const nutrientValue = nutrient.valueAbs
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
    const multiplier = objective.target === 0 ? 1 : -1
    return selectedProductNutrients
      .map(product => multiplier * product[1][objectivePosition])
  },

  getProductsData: (index, productValue, selectedProductIDs) => {
    const id = selectedProductIDs[index]
    const mass = productValue * 100
    return { id, mass }
  },

  getProductObject: (product, products) => {
    const id = product.id
    return {
      id,
      name: products.find(product => product[0] === id)[1],
      mass: service.roundToTenth(product.mass)
    }
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
  /* getSelectedProducts: async (db) => {
    const selectedFilters = await IDBS.getSelectedFilters(db)
    const selectedFiltersIDs = selectedFilters.map(filter => filter.product_id)
    const products = IDBS.getProducts(i18n.locale)
    const selectedProducts = products.filter(product =>
      selectedFiltersIDs.includes(product[0])
    )
    return selectedProducts
  }, */

  isNoExtremum: (constraints) => {
    const extremumIndex = constraints.findIndex(
      constraint => constraint.target !== 2
    )
    return extremumIndex === -1
  },

  isOldTarget: (oldTarget, newTargetID) => {
    let isOldTarget = false
    if (oldTarget.length) {
      const id = oldTarget[0].id
      isOldTarget = id !== newTargetID
    }
    return isOldTarget
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

function _constraintForRation (constraint, days, nutrientValue) {
  if (constraint === null) {
    return null
  } else {
    const constraintForRation = constraint * days - nutrientValue
    return constraintForRation < 0 ? 0 : constraintForRation
  }
}

function _getConstraintsVectorMin (constraints) {
  const filteredConstraints = constraints
    .filter(constraint => constraint.min !== 0) // удалить, если масса продуктов будет отрицательной
  return filteredConstraints.map(constraint => -constraint.min)
}

function _getConstraintsVectorMax (constraints) {
  const filteredConstraints = constraints
    .filter(constraint => constraint.max !== null)
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

export { service }
