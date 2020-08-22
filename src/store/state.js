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
  /* [
    {
      name: "Energy",
      constraint: ">=",
      constant: 1800,
      count: 2800.0000000000064
    },
    {
      name: "Energy",
      constraint: "<=",
      constant: 2800,
      count: 2800.0000000000064
    },
    {
      name: "Protein",
      constraint: ">=",
      constant: 65,
      count: 65.00000000000115
    },
    {
      name: "Protein",
      constraint: "<=",
      constant: 117,
      count: 65.00000000000115
    },
    {
      name: "Total lipid (fat)",
      constraint: ">=",
      constant: 70,
      count: 153.99999999999977
    },
    {
      name: "Total lipid (fat)",
      constraint: "<=",
      constant: 154,
      count: 153.99999999999977
    },
    {
      name: "Carbohydrate, by difference",
      constraint: ">=",
      constant: 87,
      count: 586.0000000000017
    },
    {
      name: "Carbohydrate, by difference",
      constraint: "<=",
      constant: 586,
      count: 586.0000000000017
    },
    {
      name: "Alcohol, ethyl",
      constraint: ">=",
      constant: 0,
      count: 23.999999999999485
    },
    {
      name: "Alcohol, ethyl",
      constraint: "<=",
      constant: 24,
      count: 23.999999999999485
    },
    {
      name: "Caffeine",
      constraint: ">=",
      constant: 0,
      count: 300.00000000000523
    },
    {
      name: "Caffeine",
      constraint: "<=",
      constant: 300,
      count: 300.00000000000523
    },
    {
      name: "Theobromine",
      constraint: ">=",
      constant: 0,
      count: 1.1085553143989175e-12
    },
    {
      name: "Theobromine",
      constraint: "<=",
      constant: 250,
      count: 1.1085553143989175e-12
    },
    {
      name: "Fiber, total dietary",
      constraint: ">=",
      constant: 20,
      count: 20.000000000000494
    },
    {
      name: "Calcium, Ca",
      constraint: ">=",
      constant: 1000,
      count: 1000.0000000000101
    },
    {
      name: "Iron, Fe",
      constraint: ">=",
      constant: 20,
      count: 20.00000000000003
    },
    {
      name: "Magnesium, Mg",
      constraint: ">=",
      constant: 420,
      count: 770.0000000000008
    },
    {
      name: "Magnesium, Mg",
      constraint: "<=",
      constant: 770,
      count: 770.0000000000008
    },
    {
      name: "Phosphorus, P",
      constraint: ">=",
      constant: 1000,
      count: 1000.0000000000077
    },
    {
      name: "Potassium, K",
      constraint: ">=",
      constant: 1800,
      count: 5000.000000000041
    },
    {
      name: "Potassium, K",
      constraint: "<=",
      constant: 5000,
      count: 5000.000000000041
    },
    {
      name: "Sodium, Na",
      constraint: ">=",
      constant: 500,
      count: 1500.0000000000334
    },
    {
      name: "Sodium, Na",
      constraint: "<=",
      constant: 1500,
      count: 1500.0000000000334
    },
    {
      name: "Zinc, Zn",
      constraint: ">=",
      constant: 11,
      count: 11.0000000000002
    },
    {
      name: "Copper, Cu",
      constraint: ">=",
      constant: 0.9,
      count: 2.790712699500176
    },
    {
      name: "Selenium, Se",
      constraint: ">=",
      constant: 70,
      count: 100.0000000000058
    },
    {
      name: "Selenium, Se",
      constraint: "<=",
      constant: 100,
      count: 100.0000000000058
    },
    {
      name: "Retinol",
      constraint: ">=",
      constant: 900,
      count: 900.0000000000236
    },
    {
      name: "Vitamin A, RAE",
      constraint: ">=",
      constant: 900,
      count: 1316.7569534176343
    },
    {
      name: "Carotene, beta",
      constraint: ">=",
      constant: 5000,
      count: 5000.000000000146
    },
    {
      name: "Vitamin E (alpha-tocopherol)",
      constraint: ">=",
      constant: 10,
      count: 28.58875081125296
    },
    {
      name: "Vitamin D (D2 + D3)",
      constraint: ">=",
      constant: 15,
      count: 14.999999999999659
    },
    {
      name: "Vitamin D (D2 + D3)",
      constraint: "<=",
      constant: 100,
      count: 14.999999999999659
    },
    {
      name: "Lycopene",
      constraint: ">=",
      constant: 5000,
      count: 5000.000000000231
    },
    {
      name: "Lutein + zeaxanthin",
      constraint: ">=",
      constant: 5000,
      count: 5000.0000000002165
    },
    {
      name: "Vitamin C, total ascorbic acid",
      constraint: ">=",
      constant: 90,
      count: 90.00000000000014
    },
    {
      name: "Thiamin",
      constraint: ">=",
      constant: 1.2,
      count: 1.2000000000000368
    },
    {
      name: "Riboflavin",
      constraint: ">=",
      constant: 1.3,
      count: 2.0023887045974806
    },
    {
      name: "Niacin",
      constraint: ">=",
      constant: 20,
      count: 20.000000000000895
    },
    {
      name: "Vitamin B-6",
      constraint: ">=",
      constant: 2,
      count: 2.2661566127123476
    },
    {
      name: "Folate, total",
      constraint: ">=",
      constant: 200,
      count: 200.0000000000029
    },
    {
      name: "Vitamin B-12",
      constraint: ">=",
      constant: 2.4,
      count: 12.91989740146102
    },
    {
      name: "Choline, total",
      constraint: ">=",
      constant: 550,
      count: 550.0000000000088
    },
    {
      name: "Choline, total",
      constraint: "<=",
      constant: 3500,
      count: 550.0000000000088
    },
    {
      name: "Vitamin K (phylloquinone)",
      constraint: ">=",
      constant: 120,
      count: 120.00000000000504
    },
    {
      name: "Vitamin E, added",
      constraint: ">=",
      constant: 15,
      count: 15.000000000000385
    },
    {
      name: "Vitamin B-12, added",
      constraint: ">=",
      constant: 2.4,
      count: 2.399999999999863
    },
    {
      name: "Vitamin B-12, added",
      constraint: "<=",
      constant: 55,
      count: 2.399999999999863
    },
    {
      name: "Cholesterol",
      constraint: ">=",
      constant: 0,
      count: 3000.000000000021
    },
    {
      name: "Cholesterol",
      constraint: "<=",
      constant: 3000,
      count: 3000.000000000021
    }
  ], */
  period: {
    start: null,
    name: 'Сегодня',
    end: null
  },
  products: [],
  /* [
    {
      id: 1126,
      category: null,
      name: "Coconut milk",
      value: 46.68917380463019
    },
    {
      id: 2309,
      category: null,
      name: "Beef liver, braised",
      value: 5.768952722587687
    },
    { id: 2484, category: null, name: "Eel, smoked", value: 7.353115590560382 },
    {
      id: 2592,
      category: null,
      name: "Pompano, raw",
      value: 59.270921605486095
    },
    {
      id: 2388,
      category: null,
      name: "Luncheon meat, loaf type",
      value: 111.99816556121694
    },
    {
      id: 2796,
      category: null,
      name: "Oysters, canned",
      value: 2.944530699578627
    },
    {
      id: 3929,
      category: null,
      name: "Egg, yolk only, raw",
      value: 30.563201093142588
    },
    {
      id: 4303,
      category: null,
      name: "Soybean curd cheese",
      value: 77.35731487004955
    },
    {
      id: 4316,
      category: null,
      name: "Soybean meal",
      value: 4.231246391014705
    },
    {
      id: 4466,
      category: null,
      name: "Flax seeds",
      value: 0.04391443354296873
    },
    {
      id: 7701,
      category: null,
      name: "Tomatoes, red, dried",
      value: 10.89277155679482
    },
    {
      id: 9251,
      category: null,
      name: "Yogurt covered fruit snacks candy rolls, with high vitamin C",
      value: 26.868866736093285
    },
    {
      id: 9327,
      category: null,
      name: "Dietetic or low calorie candy, NFS",
      value: 39.7712658695179
    },
    {
      id: 7372,
      category: null,
      name: "Radicchio, raw",
      value: 49.724324476977415
    },
    { id: 4306, category: null, name: "Natto", value: 0.9501805560987366 },
    { id: 9018, category: null, name: "Lard", value: 101.86076301294187 },
    {
      id: 9049,
      category: null,
      name: "Wheat germ oil",
      value: 3.184532819477537
    },
    { id: 9684, category: null, name: "Brandy", value: 71.8562874251497 },
    {
      id: 1462,
      category: null,
      name: "Cocoa powder, not reconstituted",
      value: 11.996260495391258
    },
    {
      id: 6955,
      category: null,
      name: "Apple yogurt dessert, baby food, strained",
      value: 6.803578258339099
    },
    {
      id: 8955,
      category: null,
      name: "Sweet potatoes and chicken, baby food, strained",
      value: 181.98123446240095
    },
    {
      id: 9101,
      category: null,
      name: "Sugar substitute, stevia, powder",
      value: 329.58799255507796
    },
    {
      id: 9115,
      category: null,
      name: "Maple syrup",
      value: 15.584499849034017
    },
    { id: 9128, category: null, name: "Molasses", value: 145.56606560925297 },
    {
      id: 9446,
      category: null,
      name: "Coffee, instant, decaffeinated, not reconstituted ",
      value: 9.758030278555827
    },
    {
      id: 9479,
      category: null,
      name: "Tea, iced, instant, black, unsweetened, dry",
      value: 4.559044520839298
    },
    {
      id: 9724,
      category: null,
      name: "Nutritional powder mix (Kellogg's Special K20 Protein Water)",
      value: 20.098316591483144
    },
    {
      id: 9732,
      category: null,
      name: "Nutritional powder mix, whey based, NFS",
      value: 2.563895323298709
    }
  ], */
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
    dbIsReady: false,
    productDialogIsOpened: false,
    recordingToDB: false,
    selected: false
  }
}

export { state }
