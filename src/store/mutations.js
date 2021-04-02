import { dates } from '@/api/dates'
import { products } from '@/data/products.js'

const mutations = {
  clearEditedProduct (state) {
    Object.keys(state.editedProduct).forEach(
      key => (state.editedProduct[key] = undefined)
    )
  },

  setDays (state) {
    const start = state.period.start
    const end = state.period.end
    state.days = dates.getDays(start, end)
  },

  setProductsList (state) {
    const productsList = products.map(product => ({
      id: product[0],
      name: product[1]
    }))
    state.productsList = productsList
  },

  setSelectedDate (state, date) {
    const msInDay = dates.getMsInDay()
    const dateInMs = Date.parse(date)
    const dayStart = dateInMs - (dateInMs % msInDay)
    state.selectedDate = dayStart
  },

  setSelectedProduct (state, payload) {
    state.selected.find(curVal => curVal.id === payload.id).selected =
      payload.selected
  },

  setSelectedProductIDs (state, payload) {
    state.selectedProductIDs = payload.map(product => product.id)
  },

  setSettings (state, status) {
    Object.keys(status).forEach(key => (state.status[key] = status[key]))
  },

  setState (state, payload) {
    state[payload.name] = payload.value
  },

  setStateObject (state, payload) {
    Object.keys(payload.state)
      .forEach(key => (state[payload.objectName][key] = payload.state[key]))
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
