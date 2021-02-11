const state = {
  constraints: [],
  db: {},
  editedProduct: {
    date: undefined,
    id: undefined,
    mass: undefined,
    product_id: undefined,
    user_id: undefined
  },
  favored: [],
  isFilterOn: false,
  isHorizontal: false,
  nutrients: [],
  period: {
    start: null,
    name: 'Сегодня',
    end: null
  },
  products: [],
  productSearch: '',
  productsList: [],
  ration: [],
  rationForPeriod: [],
  selected: [],
  selectedDate: null,
  settings: {
    sex: '',
    birthdate: undefined,
    weight: undefined,
    height: undefined,
    activity: undefined,
    goal: '',
    disabled: true,
    userID: undefined
  },
  status: {
    counting: false,
    productDialogIsOpened: false,
    recordingToDB: false,
    selected: false
  }
}

export { state }
