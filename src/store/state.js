const state = {
  db: {},
  favored: [],
  isFilterOn: false,
  products: [],
  nutrients: [],
  productsList: [],
  ration: [],
  selected: [],
  selectedDate: new Date().toISOString().substr(0, 10),
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
    dbIsReady: false,
    recordingToDB: false,
    resultIsOpened: false,
    selected: false,
  },
};

export {state};
