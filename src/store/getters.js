import { dates } from '@/api/dates'
import {
  carbohydratesDailyIntake,
  fatDailyIntake,
  nutrientConstraints,
  nutrientConstraintsBySex,
  proteinDailyIntake
} from '@/data/defaultParameters'
import { service } from '@/store/service'
import { cloneDeep } from 'lodash'

const getters = {

  getConditions: (state, getters) => (nutrients) => {
    let selectedProductIDs = state.selectedProductIDs
    const selectedProductNutrients = service
      .getFilteredNutrients(selectedProductIDs)
    const constraints = getters._getSimplexConstraints(nutrients)
    const restrictionMatrix = service
      .getRestrictionMatrix(selectedProductNutrients, constraints)
    const objective = constraints.find(
      constraint => constraint.target !== 2
    )
    const constraintsVector = service.getConstraintsVector(constraints, objective)
    const objectiveCoefficients = service
      .getObjectiveCoefficients(selectedProductNutrients, objective)
    selectedProductIDs = service
      .getSelectedProductIDs(selectedProductNutrients)
    return {
      restrictionMatrix,
      constraintsVector,
      objectiveCoefficients,
      selectedProductIDs
    }
  },

  _getSimplexConstraints: (state) => (nutrients) => {
    const days = state.days
    const constraints = cloneDeep(state.constraints)
    return constraints.map(constraint => {
      [constraint.min, constraint.max] = service.getConstraintsWithRation(
        nutrients,
        constraint,
        days
      )
      return constraint
    })
  },

  getConstraints: (state, getters) => nutrientIDs => {
    const constraints = []
    const age = getters._countAge
    const functionsMatchingId = [
      { nutrient_id: 1008, name: '_getCalories' },
      {
        nutrient_id: 1003,
        name: '_getPCF',
        payload: { id: 1003, dailyIntake: proteinDailyIntake }
      },
      {
        nutrient_id: 1004,
        name: '_getPCF',
        payload: { id: 1004, dailyIntake: fatDailyIntake }
      },
      {
        nutrient_id: 1005,
        name: '_getPCF',
        payload: { id: 1005, dailyIntake: carbohydratesDailyIntake }
      },
      { nutrient_id: 1087, name: '_getCalcium', payload: age },
      { nutrient_id: 1089, name: '_getIron', payload: age },
      { nutrient_id: 1090, name: '_getMagnesium', payload: age },
      { nutrient_id: 1114, name: '_getVitaminD', payload: age }
    ]
    functionsMatchingId.forEach(func => {
      if (nutrientIDs.includes(func.nutrient_id)) {
        constraints.push(getters[func.name](func.payload))
      }
    })
    const payloadSet = getters.getPayloadSet(nutrientIDs)
    payloadSet.forEach(payload => {
      constraints.push({
        nutrient_id: payload[0],
        min: payload[1],
        max: payload[2]
      })
    })
    return constraints
  },

  _countAge: state => {
    const birthdate = state.settings.birthdate
    const daysInYear = 365.25
    const age = (new Date() - birthdate) / dates.getMsInDay() / daysInYear
    return age
  },

  _getCalories: state => () => {
    const settings = state.settings
    const today = dates.getToday()
    const year = dates.getMsInYear()
    const age = Math.round((today - settings.birthdate) / year)
    const coefficient = settings.sex === 'male' ? 5 : -161
    const basalMetabolicRate =
      10 * settings.weight + 6.25 * settings.height - 5 * age + coefficient
    const physicalActivityLevels = [1.53, 1.76, 2.25]
    const physicalActivityLevel = physicalActivityLevels[settings.activity]
    const goalCoefficients = [0.9, 1, 1.1]
    const goalCoefficient = goalCoefficients[settings.goal]
    const count = Math.round(
      basalMetabolicRate * physicalActivityLevel * goalCoefficient
    )
    const calories = {
      nutrient_id: 1008,
      min: count * 0.9,
      max: count * 1.1
    }
    return calories
  },

  _getPCF: state => nutrient => {
    const settings = state.settings
    const sex = settings.sex
    const goal = settings.goal
    const weight = settings.weight
    const goalValue = service.countGoalvalue(weight)
    const count = nutrient.dailyIntake[sex][goal][goalValue]
    const PCF = {
      nutrient_id: nutrient.id,
      min: Math.round(count * 0.9),
      max: Math.round(count * 1.1)
    }
    return PCF
  },

  _getCalcium: state => age => {
    const min = age > 25 ? 950 : 1000
    const max = age > 51 ? 2000 : 2500
    return {
      nutrient_id: 1087,
      min,
      max
    }
  },

  _getIron: state => age => {
    const sex = state.settings.sex
    const min = sex === 'female' && age < 51 ? 18 : 8
    return {
      nutrient_id: 1089,
      min,
      max: 45
    }
  },

  _getMagnesium: state => age => {
    const sex = state.settings.sex
    const min = sex === 'male' ? (age < 31 ? 400 : 420) : age < 31 ? 310 : 320
    return {
      nutrient_id: 1090,
      min,
      max: null
    }
  },

  _getVitaminD: state => age => {
    const min = age < 71 ? 15 : 20
    return {
      nutrient_id: 1114,
      min,
      max: 100
    }
  },

  getPayloadSet: state => nutrientIDs => {
    let payloadSet = nutrientConstraints
    const sexIndex = state.settings.sex === 'male' ? 2 : 1
    const payloadSetBySex = nutrientConstraintsBySex.map(constraint => {
      const newConstraint = cloneDeep(constraint)
      newConstraint.splice(sexIndex, 1)
      return newConstraint
    })
    payloadSet = payloadSet.concat(payloadSetBySex)
    payloadSet = payloadSet.filter(payload => nutrientIDs.includes(payload[0]))
    return payloadSet
  },

  getReducedConstraints: state => () => {
    return state.constraints.map(constraint => [
      constraint.nutrient_id,
      constraint.min,
      constraint.max
    ])
  },

  getResultProducts: state => () =>
    state.products.map(product => ({
      id: product.id,
      name: product.name,
      mass: service.roundToTenth(product.mass)
    }))
}

export { getters }
