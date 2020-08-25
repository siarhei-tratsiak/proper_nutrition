import Dexie from 'dexie'
import { defaultParameters } from '@/data/defaultParameters'
import { products } from '@/data/products'

function _createDB (tables) {
  const schemaDefinition = _schemaDefinition(tables)
  const db = new Dexie('ProperNutritionDB')
  db.version(6).stores(schemaDefinition)
  return db
}

function deleteRation (db, id) {
  db.rations.delete(id)
}

function editRations (db, ration) {
  db.rations.put(ration)
}

async function _fillDB (db, table) {
  const records = await _prepareData(table)
  db[table.name].bulkPut(records)
}

async function _fillMissingRecords (db, tables) {
  const fillMissingRecords = async table => {
    const numberOfRecords = await db[table.name].count()
    const notAllDataInTable = numberOfRecords < table.data.length
    if (notAllDataInTable) {
      _fillDB(db, table)
    }
  }
  tables.forEach(fillMissingRecords)
}

async function getRation (db, userID, start, end = undefined) {
  let rations = []
  if (end) {
    rations = await db.rations
      .where(['user_id', 'date'])
      .between([userID, start], [userID, end], true, true)
      .toArray()
  } else {
    rations = await db.rations
      .where({ user_id: userID, date: start })
      .toArray()
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

function _getTables () {
  const constraintsColumnsNames = [
    '++id',
    'user_id',
    'nutrient_id',
    'min',
    'min_mutable',
    'max',
    'max_mutable',
    'target',
    '[user_id+nutrient_id]'
  ]
  const filtersColumnsNames = [
    '++id',
    'product_id',
    'user_id',
    'selected',
    'favored',
    '[user_id+favored]',
    '[user_id+product_id]'
  ]
  const rationsColumnsNames = [
    '++id',
    'user_id',
    'date',
    'product_id',
    'mass',
    '[user_id+date]'
  ]
  const userColumnNames = ['++id'].concat(Object.keys(defaultParameters))
  const userData = [Object.values(defaultParameters)]
  const tables = [
    { name: 'constraints', data: [], columns: constraintsColumnsNames },
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
      columns: userColumnNames
    }
  ]
  return tables
}

async function initDatabase () {
  const tables = _getTables()
  const db = _createDB(tables)
  _fillMissingRecords(db, tables)
  return db
}

function _prepareData (table) {
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

function _schemaDefinition (tables) {
  const schemaDefinition = {}
  const defineFields = table => {
    schemaDefinition[table.name] = table.columns.join(', ')
  }
  tables.forEach(defineFields)
  return schemaDefinition
}

function searchProduct (db, productName) {
  const re = new RegExp(productName.toLowerCase(), 'g')
  return db.products
    .filter(product => re.test(product.name.toLowerCase()))
    .toArray()
}

export { deleteRation, editRations, getRation, initDatabase, searchProduct }
