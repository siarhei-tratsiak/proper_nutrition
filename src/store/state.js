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
  selectedProductIDs: [],
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
    isLoading: false,
    isResult: false,
    productDialogIsOpened: false,
    selected: false
  }
}

export { state }
