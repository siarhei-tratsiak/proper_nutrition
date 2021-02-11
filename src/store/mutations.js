import { products } from '@/data/products.js'

const mutations = {
  setConstraints (state, constraints) {
    state.constraints = constraints
  },

  setDays (state) {
    const start = state.period.start
    const end = state.period.end
    const msInDay = 24 * 60 * 60 * 1000
    state.days = (end - start) / msInDay
  },

  setDB (state, db) {
    state.db = db
  },

  setEditedProduct (state, product = null) {
    if (product) {
      Object.keys(product).forEach(
        key => (state.editedProduct[key] = product[key])
      )
    } else {
      Object.keys(state.editedProduct).forEach(
        key => (state.editedProduct[key] = undefined)
      )
    }
  },

  setFavored (state, favored) {
    state.favored = favored
  },

  setFilter (state) {
    state.isFilterOn = !state.isFilterOn
  },

  setHorizontal (state, isHorizontal) {
    state.isHorizontal = isHorizontal
  },

  setPeriod (state, period) {
    Object.keys(period).forEach(key => (state.period[key] = period[key]))
  },

  setProducts (state, products) {
    state.products = products
  },

  setProductSearch (state, productName) {
    state.productSearch = productName
  },

  setProductsList (state) {
    const productsList = products.map(product => ({
      id: product[0],
      name: product[1]
    }))
    state.productsList = productsList
  },

  setRation (state, ration) {
    state.ration = ration
  },

  setRationForPeriod (state, ration) {
    state.rationForPeriod = ration
  },

  setSelected (state, selected) {
    state.selected = selected
  },

  setSelectedAll (state, payload) {
    state.selected.forEach(function (curVal) {
      curVal.selected = payload.selected
    })
  },

  setSelectedCategory (state, payload) {
    state.selected
      .filter(curVal => curVal.category_id === payload.category_id)
      .forEach(function (curVal) {
        curVal.selected = payload.selected
      })
  },

  setSelectedDate (state, date) {
    const msInDay = 24 * 60 * 60 * 1000
    const ms = Date.parse(date)
    state.selectedDate = ms - (ms % msInDay)
  },

  setSelectedProduct (state, payload) {
    state.selected.find(curVal => curVal.id === payload.id).selected =
      payload.selected
  },

  setSelectedProducts (state, payload) {
    const selectedIDs = payload.map(product => product.id)
    const stateSelectedIDs = state.selected
      .filter(product => !!product.selected)
      .map(product => product.id)
    const difference = selectedIDs.filter(id => !stateSelectedIDs.includes(id))
    difference.forEach(id => {
      const index = state.selected.findIndex(product => product.id === id)
      state.selected[index].selected = 1
    })
  },

  setSettings (state, status) {
    Object.keys(status).forEach(key => (state.status[key] = status[key]))
  },

  setStateObject (state, payload) {
    Object.keys(payload.state).forEach(key => (state[payload.objectName][key] = payload.state[key]))
  },

  setStatus (state, status) {
    Object.keys(status).forEach(key => (state.status[key] = status[key]))
  },

  updateConstraint (state, payload) {
    const constraintIndex = state.constraints.findIndex(
      constraint => constraint.id === payload.id
    )
    Object.keys(payload.value).forEach(
      key => (state.constraints[constraintIndex][key] = payload.value[key])
    )
  },

  updateConstraints (state, payload) {
    state.constraints.forEach(constraint =>
      Object.keys(payload).forEach(key => (constraint[key] = payload[key]))
    )
  }
}

export { mutations }
