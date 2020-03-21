const state = {
  db: {},
  favored: [],
  isFilterOn: false,
  products: [],
  counting: 'not started', // 'started', 'finished'
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
    recordingToDB: false,
    resultIsOpened: false,
    selected: false,
  },
};

export {state};
