const state = {
  db: {},
  favored: [],
  isFilterOn: false,
  products: [],
  nutrients: [],
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
    counting: false,
    recordingToDB: false,
    resultIsOpened: false,
    selected: false,
  },
};

export {state};
