const state = {
  constraints: [],
  days: 1,
  db: {},
  editedProduct: {
    date: undefined,
    id: undefined,
    mass: undefined,
    product_id: undefined,
    user_id: undefined
  },
  nutrients: [],
  period: {
    start: null,
    name: '',
    end: null
  },
  products: [],
  productSearch: '',
  productsList: [],
  ration: [],
  rationForPeriod: [],
  selectedProductIDs: [],
  selectedDate: null,
  settings: {
    activity: undefined,
    birthdate: undefined,
    disabled: true,
    goal: '',
    height: undefined,
    language: undefined,
    sex: '',
    userID: undefined,
    weight: undefined
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
