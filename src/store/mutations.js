const mutations = {
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
        key => (state.editedProduct[key] = null)
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

  setNutrients(state, nutrients) {
    state.nutrients = nutrients;
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
    state.selectedDate = date;
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
