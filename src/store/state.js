const state = {
  constraints: [],
  days: 1,
  db: {},
  editedProduct: {
    date: null,
    id: null,
    mass: null,
    product_id: null,
    user_id: null
  },
  nutrients: [],
  period: {
    start: null,
    name: '',
    end: null
  },
  resultProducts: [],
  productSearch: '',
  productsList: [],
  ration: [],
  rationForPeriod: [],
  selectedProductIDs: [],
  selectedDate: null,
  settings: {
    activity: null,
    birthdate: null,
    disabled: true,
    goal: '',
    height: null,
    language: null,
    sex: '',
    userID: null,
    weight: null
  },
  status: {
    isHorizontal: false,
    isLoading: false,
    isResult: false,
    productDialogIsOpened: false,
    selected: false
  }
}

export { state }
