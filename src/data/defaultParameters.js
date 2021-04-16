const defaultUser = {
  sex: 'male',
  birthdate: 585014400000, // 16.07.1988
  weight: 68,
  height: 174,
  activity: 1,
  goal: 1,
  language: _getLocale()
}

function _getLocale () {
  const browserLanguages = navigator.languages
  const availableLanguages = ['ru', 'en']
  const intersection = browserLanguages.filter(
    language => availableLanguages.includes(language)
  )
  const selectedLanguage = intersection.length === 0 ? 'en' : intersection[0]
  return selectedLanguage
}

const carbohydratesDailyIntake = {
  male: [
    [160, 165, 175, 185],
    [215, 230, 250, 260],
    [275, 290, 300, 320]
  ],
  female: [
    [120, 150, 170, 150],
    [150, 190, 200, 220],
    [200, 245, 260, 240]
  ]
}

const fatDailyIntake = {
  male: [
    [40, 40, 40, 40],
    [55, 60, 60, 65],
    [70, 70, 75, 80]
  ],
  female: [
    [30, 35, 35, 40],
    [45, 50, 50, 55],
    [60, 60, 65, 70]
  ]
}

const nutrientConstraints = [
  [1018, 0, 24],
  [1051, 1000, 3700],
  [1057, 0, 100],
  [1058, 0, 250],
  [1079, 30, null],
  [1091, 580, 4000],
  [1093, 500, 1500],
  [1103, 70, 300],
  [1105, 900, 1500],
  [1107, 4800, null],
  [1109, 15, 300],
  [1122, 8000, 21000],
  [1123, 5000, 10000],
  [1166, 1.6, null],
  [1177, 400, 1000],
  [1178, 4, null],
  [1253, 0, 3000]
]

const nutrientConstraintsBySex = [
  [1092, 3400, 2600, null],
  [1095, 9.4, 6.8, 40],
  [1098, 1.6, 1.3, 5],
  [1106, 900, 700, 3000],
  [1162, 110, 95, 2000],
  [1165, 1.2, 1.1, null],
  [1175, 1.7, 1.6, 25],
  [1180, 550, 425, 3500],
  [1185, 120, 90, null]
]

const proteinDailyIntake = {
  male: [
    [165, 170, 175, 185],
    [145, 155, 165, 175],
    [180, 190, 200, 210]
  ],
  female: [
    [140, 150, 165, 175],
    [115, 125, 135, 145],
    [155, 165, 175, 185]
  ]
}

export {
  carbohydratesDailyIntake,
  defaultUser,
  fatDailyIntake,
  nutrientConstraints,
  nutrientConstraintsBySex,
  proteinDailyIntake
}
