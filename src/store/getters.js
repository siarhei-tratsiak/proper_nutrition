import {
  countGoalvalue,
  getA,
  getB,
  getC,
  getConstraintWithRation,
  getFilteredNutrients,
  getIndices,
  getSelectedProducts
} from '@/store/store_service.js'
import {
  getMsInDay,
  getMsInYear,
  getToday
} from '@/api/dates.js'
import {
  carbohydratesDailyIntake,
  fatDailyIntake,
  nutrientConstraints,
  nutrientConstraintsBySex,
  proteinDailyIntake
} from '@/data/defaultParameters'

const getters = {

  getConditions: state =>
    async function (nutrients) {
      const msInDay = 24 * 60 * 60 * 1000
      const days = Math.round(
        (state.period.end - state.period.start) / msInDay
      )
      const simplexConstraints = state.constraints.map(constraint => {
        [constraint.min, constraint.max] = getConstraintWithRation(
          nutrients,
          constraint,
          days
        )
        return constraint
      })
      const db = await state.db
      const selectedProducts = await getSelectedProducts(db)
      const groupedNutrients = getFilteredNutrients(selectedProducts)
      const objective = simplexConstraints.find(
        constraint => constraint.target !== 2
      )
      const A = getA(groupedNutrients, simplexConstraints)
      const b = getB(simplexConstraints, objective)
      const c = getC(groupedNutrients, objective)
      const indices = getIndices(groupedNutrients)
      return {
        A,
        b,
        c,
        indices
      }
    },

  getConstraints: (state, getters) => nutrientIDs => {
    const constraints = []
    const age = getters._countAge
    const functionsMatchingId = [
      { id: 1008, name: '_getCalories' },
      { id: 1003, name: '_getPCF', payload: { id: 1003, dailyIntake: proteinDailyIntake } },
      { id: 1004, name: '_getPCF', payload: { id: 1004, dailyIntake: fatDailyIntake } },
      { id: 1005, name: '_getPCF', payload: { id: 1005, dailyIntake: carbohydratesDailyIntake } },
      { id: 1087, name: '_getCalcium', payload: age },
      { id: 1089, name: '_getIron', payload: age },
      { id: 1090, name: '_getMagnesium', payload: age },
      { id: 1114, name: '_getVitaminD', payload: age }
    ]
    functionsMatchingId.forEach(func => {
      if (nutrientIDs.includes(func.id)) {
        constraints.push(getters[func.name](func.payload))
      }
    })
    const payloadSet = getters.getPayloadSet(nutrientIDs)
    payloadSet.forEach(payload => {
      constraints.push({
        id: payload[0],
        min: payload[1],
        max: payload[2],
        isExactValues: true
      })
    })
    return constraints
  },

  _countAge: state => {
    const birthdate = state.settings.birthdate
    const daysInYear = 365.25
    const age = (new Date() - birthdate) / getMsInDay() / daysInYear
    return age
  },

  _getCalories: state => () => {
    const settings = state.settings
    const today = getToday()
    const year = getMsInYear()
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
    const calories = { id: 1008, count }
    return calories
  },

  _getPCF: state => nutrient => {
    const settings = state.settings
    const sex = settings.sex
    const goal = settings.goal
    const weight = settings.weight
    const goalValue = countGoalvalue(weight)
    const count = nutrient.dailyIntake[sex][goal][goalValue]
    const PCF = { id: nutrient.id, count }
    return PCF
  },

  _getCalcium: state => age => {
    const min = age > 25 ? 950 : 1000
    const max = age > 51 ? 2000 : 2500
    return {
      id: 1087,
      min,
      max,
      isExactValues: true
    }
  },

  _getIron: state => age => {
    const sex = state.settings.sex
    const min = sex === 'female' && age < 51 ? 18 : 8
    return {
      id: 1089,
      min,
      max: 45,
      isExactValues: true
    }
  },

  _getMagnesium: state => age => {
    const sex = state.settings.sex
    const min = sex === 'male' ? (age < 31 ? 400 : 420) : age < 31 ? 310 : 320
    return {
      id: 1090,
      min,
      max: null,
      isExactValues: true
    }
  },

  _getVitaminD: state => age => {
    const min = age < 71 ? 15 : 20
    return {
      id: 1114,
      min,
      max: 100,
      isExactValues: true
    }
  },

  getPayloadSet: state => nutrientIDs => {
    let payloadSet = nutrientConstraints
    const sexIndex = state.settings.sex === 'male' ? 2 : 1
    const payloadSetBySex = nutrientConstraintsBySex.map(constraint => {
      constraint.splice(sexIndex, 1)
      return constraint
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
  }
}

export { getters }
