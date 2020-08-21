import Dexie from "dexie";
import { DBName } from "@/data/DBSettings";
import { defaultSettings } from "@/data/defaultSettings";
import { food as products } from "@/data/food.js";

async function _checkNewUsers(db, products, filtersTable) {
  const uidsFromFilters = await _userIdsFromFilters(db);
  let filtersData = [];
  await db.users
    .where("id")
    .noneOf(uidsFromFilters)
    .eachPrimaryKey(id => {
      const userFiltersData = products.map(product => [product[0], id, 1, 0]);
      filtersData = filtersData.concat(userFiltersData);
    });
  filtersTable.data = filtersData;
  await _fillDB(db, filtersTable);
}

async function _checkDB(db, tables, products) {
  const isChecked = tables.reduce(async (acc, table) => {
    const count = await db[table.name].count();
    if (count < table.data.length) {
      const isFilled = await _fillDB(db, table);
      return acc + isFilled;
    }
    if (table.name === "users") {
      const filtersTable = tables.find(table => table.name === "filters");
      await _checkNewUsers(db, products, filtersTable);
    }
    return true;
  }, false);
  return isChecked;
}

async function _createDB(tables) {
  const schemaDefinition = {};
  tables.forEach(function (table) {
    schemaDefinition[table.name] = table.columns.join(", ");
  });
  const db = new Dexie(DBName);
  db.version(6).stores(schemaDefinition);
  return db;
}

function deleteRation(db, id) {
  db.rations.delete(id);
}

function editRations(db, ration) {
  db.rations.put(ration);
}

async function _fillDB(db, table) {
  const valuesList = await _prepareData(table);
  const tableName = table.name;
  await db
    .transaction("rw", db[tableName], () => {
      valuesList.forEach(row => {
        db[tableName].put(row);
      });
    })
    .catch(function (e) {
      throw new Error(e);
    });
  return true;
}

async function getRation(db, userID, start, end = undefined) {
  let rations = [];
  if (end) {
    rations = await db.rations
      .where(["user_id", "date"])
      .between([userID, start], [userID, end], true, true)
      .toArray();
  } else {
    rations = await db.rations
      .where({ user_id: userID, date: start })
      .toArray();
  }
  const rationProductIDs = rations.map(ration => ration.product_id);
  const filteredProducts = products.filter(product =>
    rationProductIDs.includes(product[0])
  );
  const result = rations.map(ration => {
    const product = filteredProducts.find(
      product => product[0] === ration.product_id
    );
    ration.product_name = product[1];
    return ration;
  });
  return result;
}

async function initDatabase() {
  const constraintsColumnsNames = [
    "++id",
    "user_id",
    "nutrient_id",
    "min",
    "min_mutable",
    "max",
    "max_mutable",
    "target",
    "[user_id+nutrient_id]"
  ];
  const filtersColumnsNames = [
    "++id",
    "product_id",
    "user_id",
    "selected",
    "favored",
    "[user_id+favored]",
    "[user_id+product_id]"
  ];
  const rationsColumnsNames = [
    "++id",
    "user_id",
    "date",
    "product_id",
    "mass",
    "[user_id+date]"
  ];
  const usersColumnsNames = ["++id"].concat(Object.keys(defaultSettings));
  const tables = [
    { name: "constraints", data: [], columns: constraintsColumnsNames },
    {
      name: "filters",
      data: [],
      columns: filtersColumnsNames
    },
    {
      name: "rations",
      data: [],
      columns: rationsColumnsNames
    },
    {
      name: "users",
      data: [Object.values(defaultSettings)],
      columns: usersColumnsNames
    }
  ];
  const db = await _createDB(tables);
  const isChecked = await _checkDB(db, tables, products);
  if (isChecked) {
    return db;
  }
}

function _prepareData(table) {
  let valuesList = table.data;
  let columns = table.columns;
  valuesList = valuesList.map(values => {
    const obj = {};
    if (columns[0] === "++id") {
      columns = columns.slice(1);
    }
    columns.forEach(function (column, value) {
      obj[column] = values[value];
    });
    return obj;
  });
  return valuesList;
}

function searchProduct(db, productName) {
  const re = new RegExp(productName.toLowerCase(), "g");
  return db.products
    .filter(product => re.test(product.name.toLowerCase()))
    .toArray();
}

async function _userIdsFromFilters(db) {
  const filters = await db.filters.toArray();
  const rawUserIds = filters.map(row => row.user_id);
  const uniqUserIds = [...new Set(rawUserIds)];
  return uniqUserIds;
}

export { deleteRation, editRations, getRation, initDatabase, searchProduct };
