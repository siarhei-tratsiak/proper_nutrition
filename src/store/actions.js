import { dates } from '@/api/dates'
import { IDBS } from '@/api/indexedDBService'
import { simplex } from '@/api/simplex'
import { nutrients as nutrientsEN } from '@/data/nutrients_en'
import { nutrients as nutrientsRU } from '@/data/nutrients_ru'
import i18n from '@/plugins/i18n'
import router from '@/router'
import { service } from '@/store/service'
import { Device } from '@capacitor/device'

const actions = {
  deleteRation ({ state }, id) {
    IDBS.deleteRation(state.db, id)
  },

  editRation ({ state }, ration) {
    IDBS.editRations(state.db, ration)
  },

  getCategoryIsExpanded ({ state, commit }) {
    const categoryIsExpanded = state.productsList.map(() => false)
    commit('setCategoryIsExpanded', categoryIsExpanded)
  },

  async getSolution ({ getters, commit }, nutrients) {
    const {
      restrictionMatrix,
      constraintsVector,
      objectiveCoefficients,
      selectedProductIDs
    } = getters.getConditions(nutrients)
    let result = simplex({
      restrictionMatrix,
      constraintsVector,
      objectiveCoefficients,
      maximumIterations: 2000
    })
    const resultStatus = result.status
    commit('setStateObject', {
      objectName: 'status',
      state: { resultStatus }
    })
    result = result.solution
      .map((productValue, index) => service
        .getProductsData(index, productValue, selectedProductIDs))
      .filter(product => product.mass !== 0)
    const payload = { name: 'resultProducts', value: result }
    commit('setState', payload)
    commit('setStateObject', {
      objectName: 'status',
      state: { isLoading: false }
    })
    router.push('/result')
  },

  async initData ({ commit, dispatch }) {
    const db = await IDBS.initDatabase()
    const payload = { name: 'db', value: db }
    commit('setState', payload)
    commit('setProductsList')
    await dispatch('_initUser')
    dispatch('setAllConstraints')
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
    i18n.locale = lastUser.language
  },

  async makeBackUp ({ state, commit }) {
    let message = ''
    try {
      const uri = await IDBS.makeBackUp(state.db)
      if (uri) {
        message = i18n.t('snackbar.message[2]', { uri: uri.uri })
      }
    } catch (error) {
      message = error.toString()
    } finally {
      const snackbarPayload = {
        objectName: 'snackbar',
        state: {
          isOpened: true,
          message
        }
      }
      commit('setStateObject', snackbarPayload)
    }
  },

  async restoreDB ({ state, commit, dispatch }, file) {
    if (file) {
      const db = await IDBS.restoreDB(state.db, file)
      if (db) {
        const dbPayload = { name: 'db', value: db }
        commit('setState', dbPayload)
        dispatch('_setSnackbarMessage')
      } else {
        const snackbarPayload = {
          objectName: 'snackbar',
          state: { isOpened: true, message: i18n.t('snackbar.message[1]') }
        }
        commit('setStateObject', snackbarPayload)
      }
    }
  },

  setAllConstraints ({ dispatch }) {
    const nutrients = i18n.locale === 'ru'
      ? nutrientsRU
      : nutrientsEN
    const nutrientIDs = nutrients.map(nutrient => nutrient[0])
    const constraintsPayload = { nutrientIDs, checkExtremum: true }
    dispatch('setConstraints', constraintsPayload)
  },

  async setConstraints ({ commit, dispatch, getters, state }, payload) {
    const userID = state.settings.userID
    let nutrientIDs = payload.nutrientIDs
    const constraints = getters.getConstraints(nutrientIDs)
    const nutrientMinMaxValues = service.getNutrientMinMaxValues(
      constraints, userID
    )
    const existingConstraints = await IDBS.getNutrientConstraints(
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
      await IDBS.addConstraints(state.db, addData)
    }
    const nutrients = i18n.locale === 'ru'
      ? nutrientsRU
      : nutrientsEN
    nutrientIDs = nutrients.map(nutrient => nutrient[0])
    const newConstraints = await IDBS.getNutrientConstraints(
      state.db, userID, nutrientIDs
    )
    const constraintsPayload = {
      name: 'constraints',
      value: newConstraints
    }
    commit('setState', constraintsPayload)
    if (payload.checkExtremum) {
      dispatch('_checkExtremum', newConstraints)
    }
  },

  async _setSnackbarMessage ({ state, commit }) {
    const info = await Device.getInfo()
    const isWeb = info.platform === 'web'
    let reload = ''
    let isActionExit = false
    if (isWeb) {
      location.reload()
    } else {
      reload = i18n.t('snackbar.message[3]')
      isActionExit = true
    }
    const snackbarPayload = {
      objectName: 'snackbar',
      state: {
        isActionExit,
        isOpened: true,
        message: i18n.t('snackbar.message[0]', { reload })
      }
    }
    commit('setStateObject', snackbarPayload)
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
    const settingsPayload = { objectName: 'settings', state: payload }
    commit('setStateObject', settingsPayload)
    const updatePayload = {
      changes: payload,
      key: state.settings.userID,
      tableName: 'users'
    }
    IDBS.updateTable(state.db, updatePayload)
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
    IDBS.modifyConstraints(state.db, userID, mutationPayload)
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
    const isOldTarget = service.isOldTarget(oldTarget, payload.id)
    if (isOldTarget) {
      const constraintPayload = { id: oldTarget[0].id, value: { target: 2 } }
      dispatch('updateConstraint', constraintPayload)
    }
  },

  updateConstraint ({ state, commit }, payload) {
    const updatePayload = {
      changes: payload.value,
      key: payload.id,
      tableName: 'constraints'
    }
    IDBS.updateTable(state.db, updatePayload)
    commit('updateConstraint', payload)
  }
}

export { actions }
