import Dexie from 'dexie'
import { defaultUser } from '@/data/defaultParameters'
import { products } from '@/data/products'

const IDBS = {
  addConstraints: (db, constraints) => {
    return db.constraints.bulkAdd(constraints)
  },

  getConstraintsWithNotRangeTarget: (db) => {
    return db.constraints
      .where('target')
      .notEqual(2)
      .toArray()
  },

  getFilters: (db, userID) => {
    return db.filters
      .where('user_id')
      .equals(userID)
      .toArray()
  },

  getLastUser: function (db) {
    return db.users.toCollection().last()
  },

  getNutrientConstraints: function (db, userID, nutrientIDs) {
    return db.constraints
      .where('nutrient_id')
      .anyOf(nutrientIDs)
      .filter(constraint => constraint.user_id === userID)
      .toArray()
  },

  initDatabase: async function () {
    const tables = _getTables()
    const db = _createDB(tables)
    await _fillMissingRecords(db, tables)
    return db
  },

  updateTarget: (db, payload) => {
    db.constraints.update(payload.id, payload.value)
  }
}

function _getTables () {
  const constraintsColumnsNames = ['++id', 'user_id', 'nutrient_id', 'min', 'min_mutable', 'max', 'max_mutable', 'target', '[user_id+nutrient_id]']
  const filtersColumnsNames = ['++id', 'product_id', 'user_id', 'selected', 'favored', '[user_id+favored]', '[user_id+product_id]']
  const rationsColumnsNames = ['++id', 'user_id', 'date', 'product_id', 'mass', '[user_id+date]']
  const userColumnsNames = _getUserColumnsNames()
  const userData = _getUserData()
  const tables = [
    {
      name: 'constraints',
      data: [],
      columns: constraintsColumnsNames
    },
    {
      name: 'filters',
      data: [],
      columns: filtersColumnsNames
    },
    {
      name: 'rations',
      data: [],
      columns: rationsColumnsNames
    },
    {
      name: 'users',
      data: userData,
      columns: userColumnsNames
    }
  ]
  return tables
}

function _getUserColumnsNames () {
  const defaultUserKeys = Object.keys(defaultUser)
  const userColumnsNames = ['++id'].concat(defaultUserKeys)
  return userColumnsNames
}

function _getUserData () {
  const defaultUserValues = [Object.values(defaultUser)]
  return defaultUserValues
}

function _createDB (tables) {
  const db = new Dexie('ProperNutritionDB')
  const schemaDefinition = _getSchemaDefinition(tables)
  db.version(6).stores(schemaDefinition)
  return db
}

function _getSchemaDefinition (tables) {
  const schemaDefinition = {}
  const defineFields = table => {
    schemaDefinition[table.name] = _columnNamesString(table.columns)
  }
  tables.forEach(defineFields)
  return schemaDefinition
}

function _columnNamesString (columnsList) {
  return columnsList.join(', ')
}

async function _fillMissingRecords (db, tables) {
  const fillMissingRecords = async table => {
    const numberOfRecords = await db[table.name].count()
    const notAllDataInTable = numberOfRecords < table.data.length
    if (notAllDataInTable) {
      _putRecordsToTable(db, table)
    }
  }
  const promises = tables.map(fillMissingRecords)
  await Promise.all(promises)
}

function _putRecordsToTable (db, table) {
  const records = _dataToRecords(table)
  db[table.name].bulkPut(records) // faster than put()
}

function _dataToRecords (table) {
  const columnNames = table.columns
  const dataToRecord = values => {
    const record = {}
    const columnNamesWithoutID = columnNames.slice(1)
    const addValueToRecord = (columnName, index) => {
      record[columnName] = values[index]
    }
    columnNamesWithoutID.forEach(addValueToRecord)
    return record
  }
  const records = table.data.map(dataToRecord)
  return records
}

function deleteRation (db, id) {
  db.rations.delete(id)
}

function editRations (db, ration) {
  db.rations.put(ration)
}

function getConstraint (db, userID, nutrientID) {
  return db.constraints
    .where({
      user_id: userID,
      nutrient_id: nutrientID
    })
    .toArray()
}

function getConstraints (db, userID) {
  return db.constraints
    .where('user_id')
    .equals(userID)
    .toArray()
}

async function getRation (db, userID, start, end = undefined) {
  let rations = []
  if (end) {
    rations = await db.rations
      .where(['user_id', 'date'])
      .between([userID, start], [userID, end], true, true)
      .toArray()
  } else {
    rations = await db.rations.where({ user_id: userID, date: start }).toArray()
  }
  const rationProductIDs = rations.map(ration => ration.product_id)
  const filteredProducts = products.filter(product =>
    rationProductIDs.includes(product[0])
  )
  const result = rations.map(ration => {
    const product = filteredProducts.find(
      product => product[0] === ration.product_id
    )
    ration.product_name = product[1]
    return ration
  })
  return result
}

function searchProduct (db, productName) {
  const re = new RegExp(productName.toLowerCase(), 'g')
  return db.products
    .filter(product => re.test(product.name.toLowerCase()))
    .toArray()
}

function updateConstraint (db, constraint, nutrientMinMaxValue) {
  const constraintID = constraint.id
  const newConstraint = Object.assign({}, nutrientMinMaxValue)
  if (constraint.min_mutable) {
    delete newConstraint.min
  }
  if (constraint.max_mutable) {
    delete newConstraint.max
  }
  return db.constraints.update(constraintID, newConstraint)
}

export {
  deleteRation,
  editRations,
  getConstraint,
  getConstraints,
  getRation,
  IDBS,
  searchProduct,
  updateConstraint
}
