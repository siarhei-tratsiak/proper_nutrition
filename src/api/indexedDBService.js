import Dexie from 'dexie';
import {
  products0,
} from '@/data/products0';
import {
  products1,
} from '@/data/products1';
import {
  products2,
} from '@/data/products2';
import {
  products3,
} from '@/data/products3';
import {
  products4,
} from '@/data/products4';
import {
  products5,
} from '@/data/products5';
import {
  products6,
} from '@/data/products6';
import {
  products7,
} from '@/data/products7';
import {
  products8,
} from '@/data/products8';
import {
  products9,
} from '@/data/products9';
import {
  products10,
} from '@/data/products10';
import {
  categories,
} from '@/data/categories';
import {
  DBName,
  productsColumnsNames,
} from '@/data/DBSettings';
import {
  trackingChanges,
  defaultSettings,
} from '@/data/defaultSettings';

async function initDatabase() {
  const categoriesColumnsNames = ['id', 'category'];
  const changesColumnsNames = ['++id', 'user_id', 'parameter',
    'date_time', 'value'];
  const filtersColumnsNames = ['++id', 'product_id', 'user_id',
    'selected', 'favored', '[user_id+favored]', '[user_id+product_id]',
    '[user_id+category_id]'];
  const rationsColumnsNames = ['++id', 'user_id', 'date',
    'product_id', 'mass', '[user_id+date]'];
  const usersColumnsNames = ['++id'].concat(trackingChanges);
  const products = [...products0, ...products1, ...products2, ...products3,
    ...products4, ...products5, ...products6, ...products7, ...products8,
    ...products9, ...products10,
  ];
  const tables = [{
    name: 'products',
    data: products,
    columns: productsColumnsNames,
  },
  {
    name: 'categories',
    data: categories,
    columns: categoriesColumnsNames,
  },
  {
    name: 'changes',
    data: [],
    columns: changesColumnsNames,
  },
  {
    name: 'filters',
    data: [],
    columns: filtersColumnsNames,
  },
  {
    name: 'rations',
    data: [],
    columns: rationsColumnsNames,
  },
  {
    name: 'users',
    data: [Object.values(defaultSettings)],
    columns: usersColumnsNames,
  },
  ];
  const db = await createDB(tables);
  const isChecked = await checkDB(db, tables, products);
  if (isChecked) {
    return db;
  }
}

async function createDB(tables) {
  const schemaDefinition = {};
  tables.forEach(function(table) {
    schemaDefinition[table.name] = table.columns.join(', ');
  });
  const db = new Dexie(DBName);
  db.version(1).stores(schemaDefinition);
  return db;
}

async function checkDB(db, tables, products) {
  const isChecked = tables.reduce(async (acc, table) => {
    const count = await db[table.name].count();
    if (count < table.data.length) {
      const isFilled = await fillDB(db, table);
      return acc + isFilled;
    }
    if (table.name === 'users') {
      const filtersTable = tables.find((table) => table.name === 'filters');
      await checkNewUsers(db, products, filtersTable);
    }
    return true;
  }, false);
  return isChecked;
}

async function fillDB(db, table) {
  const valuesList = await prepareData(table);
  const tableName = table.name;
  await db.transaction('rw', db[tableName], () => {
    valuesList.forEach((row) => {
      db[tableName].put(row);
    });
  })
      .catch(function(e) {
        throw new Error(e);
      });
  return true;
}

async function getRation(db, userID, date) {
  return await db.rations
      .where({user_id: userID, date: date}).toArray();
}

function prepareData(table) {
  let valuesList = table.data;
  let columns = table.columns;
  valuesList = valuesList.map((values) => {
    const obj = {};
    if (columns[0] === '++id') {
      columns = columns.slice(1);
    }
    columns.forEach(function(column, value) {
      obj[column] = values[value];
    });
    return obj;
  });
  return valuesList;
}

async function checkNewUsers(db, products, filtersTable) {
  const uidsFromFilters = await userIdsFromFilters(db);
  let filtersData = [];
  await db.users.where('id').noneOf(uidsFromFilters).eachPrimaryKey((id) => {
    const userFiltersData = products.map((product) => [product[0], id, 1, 0]);
    filtersData = filtersData.concat(userFiltersData);
  });
  filtersTable.data = filtersData;
  await fillDB(db, filtersTable);
}

async function userIdsFromFilters(db) {
  const filters = await db.filters.toArray();
  const rawUserIds = filters.map((row) => row.user_id);
  const uniqUserIds = [...new Set(rawUserIds)];
  return uniqUserIds;
}

export {
  getRation,
  initDatabase,
};
