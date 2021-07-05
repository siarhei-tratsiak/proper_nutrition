import { defaultUser } from '@/data/defaultParameters'
import { products as productsEN } from '@/data/products_en'
import { products as productsRU } from '@/data/products_ru'
import { selected } from '@/data/selected'
import i18n from '@/plugins/i18n'
import Dexie from 'dexie'
import { exportDB, importDB, peakImportFile } from 'dexie-export-import'
import download from 'downloadjs'

const IDBS = {
  addConstraints: (db, constraints) => db.constraints.bulkAdd(constraints),

  addFilters: function (db, userID) {
    const products = this.getProducts(i18n.locale)
    const selectedRecords = products.map(
      product => _getSelectedRecord(product, userID)
    )
    const getUserFilters = this.getUserFilters
    return db.transaction('rw', db.filters, async () => {
      db.filters.bulkAdd(selectedRecords)
      const userFilters = getUserFilters(db, userID)
      return userFilters
    })
  },

  deleteRation: (db, id) => db.rations.delete(id),

  editRations: (db, ration) => db.rations.put(ration),

  getConstraintsWithNotRangeTarget: (db) => db.constraints
    .where('target')
    .notEqual(2)
    .toArray(),

  getLastUser: (db) => db.users.toCollection().last(),

  getNutrientConstraints: (db, userID, nutrientIDs) => db.constraints
    .where('nutrient_id')
    .anyOf(nutrientIDs)
    .filter(constraint => constraint.user_id === userID)
    .toArray(),

  getProducts: (locale) => locale === 'ru' ? productsRU : productsEN,

  getRation: async function (db, userID, start, end = undefined) {
    let rations = db.rations
    const whereClause = _rationWhereClause(rations, userID, start, end)
    rations = await whereClause.toArray()
    const rationProductIDs = rations.map(ration => ration.product_id)
    const products = this.getProducts(i18n.locale)
    const rationProducts = products.filter(product =>
      rationProductIDs.includes(product[0])
    )
    const result = rations.map(ration => _getration(ration, rationProducts))
    return result
  },

  getSelectedFilters: async (db) => db.filters
    .where({ selected: 1 })
    .toArray(),

  getUserFilters: (db, userID) => db.filters
    .where('user_id')
    .equals(userID)
    .toArray(),

  initDatabase: async () => {
    const tables = await _getTables()
    const db = _createDB(tables)
    await _fillMissingRecords(db, tables)
    return db
  },

  makeBackUp: async (db) => {
    const blob = await exportDB(db)
    download(blob, 'proper-nutrition.json', 'application/json')
  },

  modifyConstraints: (db, userID, payload) => {
    db.constraints
      .where('user_id')
      .equals(userID)
      .modify(payload)
  },

  modifySelected: (db, userID, selectedIDs, isSelected) => {
    db.filters
      .where('product_id')
      .anyOf(selectedIDs)
      .and(filter => filter.user_id === userID)
      .modify({ selected: isSelected })
  },

  restoreDB: async (db, blob) => {
    const importMeta = await peakImportFile(blob)
    const dbName = importMeta.data.databaseName
    const tables = importMeta.data.tables.map(table => table.name)
    const tablesList = [
      'constraints',
      'filters',
      'rations',
      'users'
    ]
    const areTablesMatch = tables
      .every(tableName => tablesList.includes(tableName))
    if (dbName === 'ProperNutritionDB' && areTablesMatch) {
      await db.delete()
      return await importDB(blob)
    }
  },

  updateConstraint: (db, constraint, nutrientMinMaxValue) => {
    const constraintID = constraint.id
    const newConstraint = Object.assign({}, nutrientMinMaxValue)
    if (constraint.min_mutable) {
      delete newConstraint.min
    }
    if (constraint.max_mutable) {
      delete newConstraint.max
    }
    return db.constraints.update(constraintID, newConstraint)
  },

  updateTable: (db, payload) => {
    db[payload.tableName].update(payload.key, payload.changes)
  }
}

async function _getTables () {
  const constraintsColumnsNames = ['++id', 'user_id', 'nutrient_id', 'min', 'min_mutable', 'max', 'max_mutable', 'target', '[user_id+nutrient_id]']
  const filtersColumnsNames = ['++id', 'product_id', 'user_id', 'selected', 'favored', '[user_id+favored]', '[user_id+product_id]']
  const rationsColumnsNames = ['++id', 'user_id', 'date', 'product_id', 'mass', '[user_id+date]']
  const userColumnsNames = _getUserColumnsNames()
  const userData = await _getUserData()
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

function _getration (ration, rationProducts) {
  const product = rationProducts.find(
    product => product[0] === ration.product_id
  )
  ration.product_name = product[1]
  return ration
}

function _getUserColumnsNames () {
  const defaultUserKeys = Object.keys(defaultUser)
  const userColumnsNames = ['++id'].concat(defaultUserKeys)
  return userColumnsNames
}

async function _getUserData () {
  const defaultUserValues = [await Promise.all(Object.values(defaultUser))]
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

function _getSelectedRecord (product, userID) {
  const productID = product[0]
  const isSelected = +selected.includes(productID)
  return {
    product_id: productID,
    user_id: userID,
    selected: isSelected
  }
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

function _rationWhereClause (rations, userID, start, end) {
  let whereClause = rations
  if (end) {
    whereClause = rations
      .where(['user_id', 'date'])
      .between([userID, start], [userID, end])
  } else {
    whereClause = rations
      .where({ user_id: userID, date: start })
  }
  return whereClause
}

export { IDBS }
