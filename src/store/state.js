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
  snackbar: {
    isActionExit: false,
    isOpened: false,
    message: null
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
