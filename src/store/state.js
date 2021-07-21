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
    id: null,
    end: null
  },
  platform: '',
  productSearch: '',
  productsList: [],
  ration: [],
  rationForPeriod: [],
  resultProducts: [],
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
  snackbar: {
    isActionExit: false,
    isOpened: false,
    message: ''
  },
  status: {
    isHorizontal: false,
    isLoading: false,
    resultStatus: null,
    productDialogIsOpened: false,
    selected: false
  }
}

export { state }
