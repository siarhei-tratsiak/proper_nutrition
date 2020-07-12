const mutations = {
  setDays(state) {
    const start = state.period.start;
    const end = state.period.end;
    const msInDay = 24 * 60 * 60 * 1000;
    state.days = (end - start) / msInDay;
  },

  setDB(state, db) {
    state.db = db;
  },

  setEditedProduct(state, product = null) {
    if (product) {
      Object.keys(product).forEach(
        key => (state.editedProduct[key] = product[key])
      );
    } else {
      Object.keys(state.editedProduct).forEach(
        key => (state.editedProduct[key] = undefined)
      );
    }
  },

  setFavored(state, favored) {
    state.favored = favored;
  },

  setFilter(state) {
    state.isFilterOn = !state.isFilterOn;
  },

  setHorizontal(state, isHorizontal) {
    state.isHorizontal = isHorizontal;
  },

  setPeriod(state, period) {
    Object.keys(period).forEach(key => (state.period[key] = period[key]));
  },

  setProducts(state, products) {
    state.products = products;
  },

  setProductsList(state, productsList) {
    state.productsList = productsList;
  },

  setRation(state, ration) {
    state.ration = ration;
  },

  setRationForPeriod(state, ration) {
    state.rationForPeriod = ration;
  },

  setSelected(state, selected) {
    state.selected = selected;
  },

  setSelectedAll(state, payload) {
    state.selected.forEach(function (curVal) {
      curVal.selected = payload.selected;
    });
  },

  setSelectedCategory(state, payload) {
    state.selected
      .filter(curVal => curVal.category_id === payload.category_id)
      .forEach(function (curVal) {
        curVal.selected = payload.selected;
      });
  },

  setSelectedDate(state, date) {
    const msInDay = 24 * 60 * 60 * 1000;
    const ms = Date.parse(date);
    state.selectedDate = ms - (ms % msInDay);
  },

  setSelectedProduct(state, payload) {
    state.selected.find(curVal => curVal.id == payload.id).selected =
      payload.selected;
  },

  setSelectedProducts(state, payload) {
    state.selected.forEach(
      selectedItem =>
        (selectedItem.selected = +payload.some(
          product => product.id === selectedItem.id
        ))
    );
  },

  setSettings(state, payload) {
    state.settings[payload.setting] = payload.value;
  },

  setStatus(state, status) {
    Object.keys(status).forEach(key => (state.status[key] = status[key]));
  }
};

export { mutations };
