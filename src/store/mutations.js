const mutations = {

  setCounting(state, condition) {
    state.counting = condition;
  },

  setDB(state, db) {
    state.db = db;
  },

  setFavored(state, favored) {
    state.favored = favored;
  },

  setFilter(state) {
    state.isFilterOn = !state.isFilterOn;
  },

  setNutrients(state, nutrients) {
    state.nutrients = nutrients;
  },

  setPanel(state, panel) {
    /* const panel = state.panel;
    if (!panel.includes(index)) {
      panel.push(index);
    }*/
    state.panel = panel;
  },

  setProducts(state, products) {
    state.products = products;
  },

  setProductsList(state, productsList) {
    state.productsList = productsList;
  },

  setSelected(state, selected) {
    state.selected = selected;
  },

  setSelectedAll(state, payload) {
    state.selected.forEach(function(curVal) {
      curVal.selected = payload.selected;
    });
  },

  setSelectedCategory(state, payload) {
    state.selected
        .filter((curVal) => curVal.category_id === payload.category_id)
        .forEach(function(curVal) {
          curVal.selected = payload.selected;
        });
  },

  setSelectedProduct(state, payload) {
    state.selected
        .find((curVal) => curVal.id == payload.id)
        .selected = payload.selected;
  },

  setSettings(state, payload) {
    state.settings[payload.setting] = payload.value;
  },

  setStatus(state, status) {
    Object.keys(status)
        .forEach((key) => state.status[key] = status[key]);
  },
};

export {
  mutations,
};
