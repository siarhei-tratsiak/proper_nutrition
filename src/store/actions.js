import { dates } from '@/api/dates'
import {
  deleteRation,
  editRations,
  IDBS,
  searchProduct
} from '@/api/indexedDBService'
import { simplex } from '@/api/simplex'
import { nutrients } from '@/data/nutrients_ru'
import router from '@/router'
import {
  isOldTarget,
  service
} from '@/store/service'

const actions = {
  deleteRation ({ state }, id) {
    const db = state.db
    deleteRation(db, id)
  },

  editRation ({ state }, ration) {
    const db = state.db
    editRations(db, ration)
  },

  getCategoryIsExpanded ({ state, commit }) {
    const categoryIsExpanded = state.productsList.map(() => false)
    commit('setCategoryIsExpanded', categoryIsExpanded)
  },

  async getSolution ({ getters, commit }, nutrients) {
    commit('setStateObject', {
      objectName: 'status',
      state: { isLoading: true }
    })
    commit('setDays')
    const {
      restrictionMatrix,
      constraintsVector,
      objectiveCoefficients,
      selectedProductIDs
    } = getters.getConditions(nutrients)
    /* restrictionMatrix = [[1, -2], [-1, -1], [1, -1], [0, 1]]
    constraintsVector = [-2, -4, 2, 6]
    objectiveCoefficients = [-1, -2] */
    let result = simplex({
      restrictionMatrix,
      constraintsVector,
      objectiveCoefficients
    })
    const isResult = !result.status
    commit('setStateObject', {
      objectName: 'status',
      state: { isResult }
    })
    result = result.solution
      .map((productValue, index) => service
        .getProductsData(index, productValue, selectedProductIDs))
      .filter(product => product.mass !== 0)
    commit('setProducts', result)
    commit('setStateObject', {
      objectName: 'status',
      state: { isLoading: false }
    })
    router.push('Result')
  },

  async initData ({ commit, dispatch }) {
    const db = await IDBS.initDatabase()
    commit('setDB', db)
    commit('setProductsList')
    await dispatch('_initUser')
    dispatch('_setAllConstraints')
    dispatch('_initSelected')
  },

  async _initUser ({ state, commit }) {
    const lastUser = await IDBS.getLastUser(state.db)
    lastUser.userID = lastUser.id
    delete lastUser.id
    const userPayload = Object.assign(
      { state: lastUser }, { objectName: 'settings' }
    )
    commit('setStateObject', userPayload)
  },

  _setAllConstraints ({ dispatch }) {
    const nutrientIDs = nutrients.map(nutrient => nutrient[0])
    const constraintsPayload = { nutrientIDs, checkExtremum: true }
    dispatch('setConstraints', constraintsPayload)
  },

  async setConstraints ({ commit, dispatch, getters, state }, payload) {
    const userID = state.settings.userID
    const nutrientIDs = payload.nutrientIDs
    const constraints = getters.getConstraints(nutrientIDs)
    const nutrientMinMaxValues = service.getNutrientMinMaxValues(
      constraints, userID
    )
    let existingConstraints = await IDBS.getNutrientConstraints(
      state.db, userID, nutrientIDs
    )
    existingConstraints.forEach(constraint =>
      dispatch('_updateConstraint', { constraint, nutrientMinMaxValues })
    )
    const existingConstraintNutrientIDs = existingConstraints.map(
      constraint => constraint.nutrient_id
    )
    const addData = nutrientMinMaxValues
      .filter(minMaxValue => service.notMatchingIDs(
        minMaxValue.nutrient_id, existingConstraintNutrientIDs
      ))
      .map(minMaxValue => service.toNotMinMax(minMaxValue))
    const isAddData = addData.length
    if (isAddData) {
      IDBS.addConstraints(state.db, addData)
    }
    existingConstraints = await IDBS.getNutrientConstraints(
      state.db, userID, nutrientIDs
    )
    commit('setConstraints', existingConstraints)
    if (payload.checkExtremum) {
      dispatch('_checkExtremum', existingConstraints)
    }
  },

  _updateConstraint ({ state }, payload) {
    const nutrientMinMaxValue = payload.nutrientMinMaxValues.find(
      value => value.nutrient_id === payload.constraint.nutrient_id
    )
    IDBS.updateConstraint(state.db, payload.constraint, nutrientMinMaxValue)
  },

  _checkExtremum ({ dispatch }, constraints) {
    if (service.isNoExtremum(constraints)) {
      dispatch('_updateTarget', constraints)
    }
  },

  _updateTarget ({ dispatch }, constraints) {
    const id = constraints.find(
      constraint => constraint.nutrient_id === 1008
    ).id
    const updatePayload = { id, value: { target: 0 } }
    dispatch('updateTarget', updatePayload)
  },

  async _initSelected ({ state, commit }) {
    const userID = state.settings.userID
    let filters = await IDBS.getUserFilters(state.db, userID)
    const isNoFilters = !filters.length
    if (isNoFilters) {
      filters = await IDBS.addFilters(state.db, userID)
    }
    const selectedProductIDs = filters
      .filter(row => row.selected === 1)
      .map(selectedProduct => selectedProduct.product_id)
    commit('setState',
      { name: 'selectedProductIDs', value: selectedProductIDs })
    commit('setStateObject', { objectName: 'status', state: { selected: true } })
  },

  searchProduct ({ state }, productName) {
    return searchProduct(state.db, productName)
  },

  async setRation ({ state, commit }, date) {
    const ration = await IDBS.getRation(state.db, state.settings.userID, date)
    commit('setState', { name: 'ration', value: ration })
  },

  async setRationForPeriod ({ state, commit, dispatch }) {
    dispatch('_checkPeriod')
    let ration = await IDBS.getRation(
      state.db,
      state.settings.userID,
      state.period.start,
      state.period.end
    )
    ration = ration.map(product => ({
      id: product.product_id,
      value: product.mass
    }))
    commit('setState', { name: 'rationForPeriod', value: ration })
  },

  _checkPeriod ({ state, commit }) {
    const start = state.period.start
    if (!start) {
      const start = dates.getToday()
      const end = dates.getTomorrow()
      const payload = { objectName: 'period', state: { start, end } }
      commit('setStateObject', payload)
    }
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

  async toggleSelected ({ state, commit }, payload) {
    const db = state.db
    const userID = state.settings.userID
    const oldSelectedIndices = state.selectedProductIDs
    const newSelectedIndices = payload.map(payloadItem => payloadItem.id)
    const unselected = service
      .arraysDifference(oldSelectedIndices, newSelectedIndices)
    let isSelected = +false
    IDBS.modifySelected(db, userID, unselected, isSelected)
    const selected = service
      .arraysDifference(newSelectedIndices, oldSelectedIndices)
    isSelected = +true
    IDBS.modifySelected(db, userID, selected, isSelected)
    commit('setSelectedProductIDs', payload)
  },

  async updateTarget ({ state, dispatch }, payload) {
    const oldTarget = await IDBS.getConstraintsWithNotRangeTarget(state.db)
    dispatch('updateConstraint', payload)
    if (isOldTarget(oldTarget, payload.id)) {
      payload = { id: oldTarget.id, value: { target: 2 } }
      dispatch('updateConstraint', payload)
    }
  },

  updateConstraint ({ state, commit }, payload) {
    IDBS.updateTarget(state.db, payload)
    commit('updateConstraint', payload)
  }
}

export { actions }
