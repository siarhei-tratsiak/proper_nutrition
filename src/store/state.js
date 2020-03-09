const state = {
  db: {},
  favored: [],
  isFilterOn: false,
  products: [],
  counting: 'not started',
  nutrients: [],
  panel: [],
  productsList: [],
  selected: [],
  settings: {
    sex: '',
    age: undefined,
    weight: undefined,
    height: undefined,
    activity: undefined,
    goal: '',
    disabled: true,
    userId: undefined,
  },
  status: {
    selected: false,
  },
};

export {state};
