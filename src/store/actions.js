import { arraysDifference, modifySelected } from '@/store/store_service.js'
import {
  deleteRation,
  editRations,
  getRation,
  initDatabase,
  searchProduct
} from '@/api/indexedDBService'
import { simplex } from '@/api/simplex'
import { products } from '@/data/products.js'
// import router from '@/router/index.js'
import { getMsInDay, getToday, getMsInYear } from '@/api/dates.js'
import { nutrient as nutrients } from '@/data/nutrient_ru.js'

const actions = {
  deleteRation ({ state }, id) {
    const db = state.db
    deleteRation(db, id)
  },

  editRation ({ state }, ration) {
    const db = state.db
    editRations(db, ration)
  },

  enableSettings ({ commit }) {
    commit('setSettings', {
      setting: 'disabled',
      value: false
    })
  },

  getCategoryIsExpanded ({ state, commit }) {
    const categoryIsExpanded = state.productsList.map(() => false)
    commit('setCategoryIsExpanded', categoryIsExpanded)
  },

  _getConstraintPayload ({ state }, payload) {
    const settings = state.settings
    const row = settings.goal
    const weight = settings.weight
    let column = 0
    if (weight >= 60 && weight < 70) {
      column = 1
    } else if (weight >= 70 && weight < 80) {
      column = 2
    } else {
      column = 3
    }
    const nutrientCount =
      payload.nutrientDailyIntake[settings.sex][row][column]
    const constraintPayload = { nutrientID: payload.nutrientID, nutrientCount }
    return constraintPayload
  },

  async getSolution ({ getters, commit }, nutrients) {
    commit('setStatus', { counting: true })
    commit('setDays')
    const { A, b, c, indices } = await getters.getConditions(nutrients)
    // min
    /* A = [
      [-1, -2, -3],
      [-5, -6, -7],
      [9, 10, 11]
    ]
    b = [-4, -8, 12]
    c = [13, 14, 15] */
    // max
    /* A = [
      [0, 1, 1],
      [2, 1, 2],
      [-2, 1, -2]
    ]
    b = [4, 6, -2]
    c = [3, 2, 1] */
    const test = false
    let result = []
    result = [
      {
        index: 664,
        value: 4.569412690773433
      },
      {
        index: 765,
        value: 6.768717862962623
      },
      {
        index: 789,
        value: 0.005774796693993312
      },
      {
        index: 861,
        value: 0.007633636034107025
      },
      {
        index: 880,
        value: 0.5071104741299753
      },
      {
        index: 1443,
        value: 0.005175322906293025
      },
      {
        index: 1635,
        value: 0.020567777637319963
      },
      {
        index: 1647,
        value: 0.23914786677821118
      },
      {
        index: 1895,
        value: 0.05071810939376501
      },
      {
        index: 1929,
        value: 0.18342288079307126
      },
      {
        index: 1934,
        value: 0.010044039255018513
      },
      {
        index: 1939,
        value: 0.024192952681500575
      },
      {
        index: 2014,
        value: 0.09870617458709506
      },
      {
        index: 2045,
        value: 0.025186091797739372
      },
      {
        index: 2052,
        value: 0.0789726247104865
      },
      {
        index: 2072,
        value: 0.0857622850519656
      },
      {
        index: 2090,
        value: 0.15949424574600735
      },
      {
        index: 2180,
        value: 0.10854010309067817
      },
      {
        index: 2242,
        value: 0.06887192690836842
      },
      {
        index: 2269,
        value: 0.5989104828101579
      },
      {
        index: 2274,
        value: 0.04510459535937683
      },
      {
        index: 2586,
        value: 0.008125068228944198
      },
      {
        index: 2755,
        value: 0.07322363542732481
      },
      {
        index: 3156,
        value: 2.3207512378162543
      },
      {
        index: 3570,
        value: 0.0914460579157686
      },
      {
        index: 3574,
        value: 0.3564966409125774
      },
      {
        index: 3594,
        value: 0.0023122581937672277
      },
      {
        index: 3595,
        value: 0.12222571168031642
      },
      {
        index: 4656,
        value: 1.5988411580064883
      },
      {
        index: 4920,
        value: 0.005490019506223904
      },
      {
        index: 5133,
        value: 0.016795908711585417
      },
      {
        index: 5402,
        value: 0.29717748701830565
      },
      {
        index: 5408,
        value: 0.1999168003139237
      },
      {
        index: 5933,
        value: 0.021947062884508046
      },
      {
        index: 6470,
        value: 0.17447230030517985
      },
      {
        index: 6498,
        value: 0.09581875908962274
      },
      {
        index: 6507,
        value: 0.0017674293955819143
      },
      {
        index: 6542,
        value: 0.0770775917098274
      },
      {
        index: 6621,
        value: 0.0881485430770563
      },
      {
        index: 6868,
        value: 0.06058400156383571
      },
      {
        index: 6869,
        value: 0.018614733999458115
      },
      {
        index: 6873,
        value: 0.013092452173017698
      },
      {
        index: 6991,
        value: 0.19503997170330079
      },
      {
        index: 7888,
        value: 0.9837378232016989
      },
      {
        index: 8065,
        value: 9.325446708534356
      },
      {
        index: 8085,
        value: 0.02303112433974114
      },
      {
        index: 8512,
        value: 0.02415544321767649
      }
    ]
    if (!test) {
      result = simplex({ initA: A, initb: b, initc: c })
      console.log(result)
      result = result.solution
        .map((curVal, index) => {
          const id = indices[index]
          return {
            id,
            value: curVal
          }
        })
        .filter(curVal => curVal.value !== 0)
    }
    result = result.map(curVal => {
      const id = curVal.id
      const product = products.find(product => product[0] === +id)
      return {
        id,
        category: null,
        name: product[1],
        value: curVal.value * 100
      }
    })
    commit('setProducts', result)
    // dispatch("setNutrients");
    commit('setStatus', { counting: false })
    // router.push('Result')
  },

  async initData ({ dispatch }) {
    await dispatch('initDB')
    dispatch('setProductsList')
    await dispatch('initSettings')
    dispatch('initSelected')
    // dispatch("initFavored");
  },

  async initDB ({ commit }) {
    const db = await initDatabase()
    commit('setDB', db)
  },

  async initFavored ({ state, commit }) {
    const userID = state.settings.userID
    const rawFavored = await state.db.filters
      .where({ user_id: userID, favored: 1 })
      .toArray()
    const favored = rawFavored.map(filter => filter.product_id)
    commit('setFavored', favored)
  },

  async initSelected ({ state, commit }) {
    const userID = state.settings.userID
    const db = state.db
    const selectedRaw = await db.filters
      .where('user_id')
      .equals(userID)
      .toArray()
    const selected = selectedRaw.map(row => ({
      id: row.product_id,
      selected: row.selected
    }))
    commit('setSelected', selected)
    commit('setStatus', {
      selected: true
    })
  },

  async initSettings ({ state, commit, dispatch }) {
    const payload = await state.db.users.toCollection().last()
    payload.userID = payload.id
    delete payload.id
    commit('setSettings', payload)
    dispatch('enableSettings')
    dispatch('setAllConstraints')
  },

  async _putConstraint ({ state }, payload) {
    const userID = state.settings.userID
    const constraint = await state.db.constraints
      .where({
        user_id: userID,
        nutrient_id: payload.nutrientID
      })
      .toArray()
    const min = payload.isExactValues
      ? payload.min
      : Math.round(payload.nutrientCount * 0.9)
    const max = payload.isExactValues
      ? payload.max
      : Math.round(payload.nutrientCount * 1.1)
    const item = {
      user_id: state.settings.userID,
      nutrient_id: payload.nutrientID,
      min,
      max
    }
    if (constraint.length) {
      const constraintID = constraint[0].id
      if (constraint[0].min_mutable) {
        delete item.min
      }
      if (constraint[0].max_mutable) {
        delete item.max
      }
      return state.db.constraints.update(constraintID, item)
    } else {
      const source = {
        target: 2,
        min_mutable: 0,
        max_mutable: 0
      }
      Object.assign(item, source)
      return state.db.constraints.add(item)
    }
  },

  searchProduct ({ state }, productName) {
    return searchProduct(state.db, productName)
  },

  setAllConstraints ({ dispatch }) {
    const nutrientIDs = nutrients.map(nutrient => nutrient[0])
    const constraintsPayload = { nutrientIDs, checkExtremum: true }
    dispatch('setConstraints', constraintsPayload)
  },

  _setCalcium ({ state, dispatch }) {
    const birthdate = state.settings.birthdate
    const age = (new Date() - birthdate) / getMsInDay() / 365.25
    const min = age > 25 ? 950 : 1000
    const max = age > 51 ? 2000 : 2500
    return dispatch('_putConstraint', {
      nutrientID: 1087,
      min,
      max,
      isExactValues: true
    })
  },

  _setCalories ({ state, dispatch }) {
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
    const calories = Math.round(
      basalMetabolicRate * physicalActivityLevel * goalCoefficient
    )
    const payload = { nutrientID: 1008, nutrientCount: calories }
    return dispatch('_putConstraint', payload)
  },

  async _setCarbohydrates ({ dispatch }) {
    const carbohydratesDailyIntake = {
      male: [
        [160, 165, 175, 185],
        [215, 230, 250, 260],
        [275, 290, 300, 320]
      ],
      female: [
        [120, 150, 170, 150],
        [150, 190, 200, 220],
        [200, 245, 260, 240]
      ]
    }
    let payload = {
      nutrientID: 1005,
      nutrientDailyIntake: carbohydratesDailyIntake
    }
    payload = await dispatch('_getConstraintPayload', payload)
    return dispatch('_putConstraint', payload)
  },

  async setConstraints ({ state, dispatch, commit }, payload) {
    const resolves = await dispatch('_setConstraints', payload.nutrientIDs)
    Promise.all(resolves).then(async () => {
      const userID = state.settings.userID
      const constraints = await state.db.constraints
        .where('user_id')
        .equals(userID)
        .toArray()
      if (payload.checkExtremum) {
        const extremumIndex = constraints.findIndex(
          constraint => constraint.target !== 2
        )
        if (extremumIndex === -1) {
          const id = constraints.find(
            constraint => constraint.nutrient_id === 1008
          ).id
          const updatePayload = { id, value: { target: 0 } }
          dispatch('updateTarget', updatePayload)
        }
      }
      commit('setConstraints', constraints)
    })
  },

  async _setConstraints ({ dispatch, state }, nutrientIDs) {
    const isReady = []
    if (nutrientIDs.includes(1008)) {
      isReady.push(dispatch('_setCalories'))
    }
    if (nutrientIDs.includes(1003)) {
      isReady.push(dispatch('_setProtein'))
    }
    if (nutrientIDs.includes(1004)) {
      isReady.push(dispatch('_setFat'))
    }
    if (nutrientIDs.includes(1005)) {
      isReady.push(dispatch('_setCarbohydrates'))
    }
    if (nutrientIDs.includes(1087)) {
      isReady.push(dispatch('_setCalcium'))
    }
    const birthdate = state.settings.birthdate
    const age = (new Date() - birthdate) / getMsInDay() / 365.25
    if (nutrientIDs.includes(1089)) {
      isReady.push(dispatch('_setIron', age))
    }
    if (nutrientIDs.includes(1114)) {
      isReady.push(dispatch('_setVitaminD', age))
    }
    if (nutrientIDs.includes(1090)) {
      isReady.push(dispatch('_setMagnesium', age))
    }
    let payloadSet = [
      [1018, 0, 24],
      [1057, 0, 100],
      [1058, 0, 250],
      [1079, 30, null],
      [1091, 580, 4000],
      [1093, 500, 1500],
      [1103, 70, 300],
      [1105, 900, 1500],
      [1107, 4800, null],
      [1109, 15, 300],
      [1122, 8000, 21000],
      [1123, 12000, null],
      [1166, 1.6, null],
      [1177, 400, 1000],
      [1178, 4, null],
      [1253, 0, 3000]
    ]
    const sexIndex = state.settings.sex === 'male' ? 2 : 1
    const payloadSetBySex = [
      [1092, 3400, 2600, null],
      [1095, 9.4, 6.8, 40],
      [1098, 1.6, 1.3, 5],
      [1106, 900, 700, 3000],
      [1162, 110, 95, 2000],
      [1165, 1.2, 1.1, null],
      [1175, 1.7, 1.6, 25],
      [1180, 550, 425, 3500],
      [1185, 120, 90, null]
    ].map(payload => {
      payload.splice(sexIndex, 1)
      return payload
    })
    payloadSet = payloadSet.concat(payloadSetBySex)
    payloadSet = payloadSet.filter(payload => nutrientIDs.includes(payload[0]))
    payloadSet.forEach(async payload => {
      isReady.push(
        dispatch('_putConstraint', {
          nutrientID: payload[0],
          min: payload[1],
          max: payload[2],
          isExactValues: true
        })
      )
    })
    return isReady
  },

  _setIron ({ state, dispatch }, age) {
    const sex = state.settings.sex
    const min = sex === 'female' && age < 51 ? 18 : 8
    return dispatch('_putConstraint', {
      nutrientID: 1089,
      min,
      max: 45,
      isExactValues: true
    })
  },

  _setMagnesium ({ state, dispatch }, age) {
    const sex = state.settings.sex
    const min = sex === 'male' ? (age < 31 ? 400 : 420) : age < 31 ? 310 : 320
    return dispatch('_putConstraint', {
      nutrientID: 1090,
      min,
      max: null,
      isExactValues: true
    })
  },

  _setVitaminD ({ dispatch }, age) {
    const min = age < 71 ? 15 : 20
    return dispatch('_putConstraint', {
      nutrientID: 1114,
      min,
      max: 100,
      isExactValues: true
    })
  },

  setProductsList ({ commit }) {
    const productsList = products.map(product => ({
      id: product[0],
      name: product[1]
      // favored: product.favored,
    }))
    commit('setProductsList', productsList)
  },

  async _setFat ({ dispatch }) {
    const fatDailyIntake = {
      male: [
        [40, 40, 40, 40],
        [55, 60, 60, 65],
        [70, 70, 75, 80]
      ],
      female: [
        [30, 35, 35, 40],
        [45, 50, 50, 55],
        [60, 60, 65, 70]
      ]
    }
    let payload = { nutrientID: 1004, nutrientDailyIntake: fatDailyIntake }
    payload = await dispatch('_getConstraintPayload', payload)
    return dispatch('_putConstraint', payload)
  },

  async _setProtein ({ dispatch }) {
    const proteinDailyIntake = {
      male: [
        [165, 170, 175, 185],
        [145, 155, 165, 175],
        [180, 190, 200, 210]
      ],
      female: [
        [140, 150, 165, 175],
        [115, 125, 135, 145],
        [155, 165, 175, 185]
      ]
    }
    let payload = { nutrientID: 1003, nutrientDailyIntake: proteinDailyIntake }
    payload = await dispatch('_getConstraintPayload', payload)
    return dispatch('_putConstraint', payload)
  },

  async setRation ({ state, commit }, date) {
    const ration = await getRation(state.db, state.settings.userID, date)
    commit('setRation', ration)
  },

  async setRationForPeriod ({ state, commit }) {
    let ration = await getRation(
      state.db,
      state.settings.userID,
      state.period.start,
      state.period.end
    )
    ration = ration.map(product => ({
      id: product.product_id,
      value: product.mass
    }))
    commit('setRationForPeriod', ration)
  },

  setSettings ({ state, commit }, payload) {
    commit('setSettings', payload)
    state.db.users.update(state.settings.userID, payload)
  },

  async setUserID ({ state, commit }) {
    const lastUser = await state.db.users.toCollection().last()
    const userID = lastUser.id

    commit('setSettings', {
      setting: 'userID',
      value: userID
    })
  },

  switchLock ({ commit, state }, payload) {
    const userID = state.settings.userID
    const mutationPayload = { min_mutable: +!payload, max_mutable: +!payload }
    state.db.constraints
      .where('user_id')
      .equals(userID)
      .modify(mutationPayload)
    commit('updateConstraints', mutationPayload)
  },

  toggleFavored ({ state }, payload) {
    state.db.filters
      .where({ user_id: state.settings.userID, product_id: payload.id })
      .modify({ favored: payload.favored })
  },

  toggleFilter ({ commit }) {
    commit('setFilter')
  },

  async toggleSelected ({ state, commit }, payload) {
    commit('setStatus', {
      recordingToDB: true
    })
    const userID = state.settings.userID
    const filters = state.db.filters
    const oldSelectedIndices = state.selected
      .filter(selectedItem => selectedItem.selected === 1)
      .map(selectedItem => selectedItem.id)
    const newSelectedIndices = payload.map(payloadItem => payloadItem.id)
    commit('setSelectedProducts', payload)
    const unselected = arraysDifference(oldSelectedIndices, newSelectedIndices)
    const selected = arraysDifference(newSelectedIndices, oldSelectedIndices)
    modifySelected(filters, userID, unselected, 0)
    modifySelected(filters, userID, selected, 1)
    commit('setStatus', {
      recordingToDB: false
    })
  },

  updateConstraint ({ state, commit }, payload) {
    state.db.constraints.update(payload.id, payload.value)
    commit('updateConstraint', payload)
  },

  async updateTarget ({ state, dispatch }, payload) {
    const constraintsWithNotRangeTarget = await state.db.constraints
      .where('target')
      .notEqual(2)
      .toArray()
    dispatch('updateConstraint', payload)
    if (constraintsWithNotRangeTarget.length) {
      const id = constraintsWithNotRangeTarget[0].id
      if (id !== payload.id) {
        payload = { id, value: { target: 2 } }
        dispatch('updateConstraint', payload)
      }
    }
  }
}

export { actions }
