import { foodNutrient } from "@/data/foodNutrient.js";
import { food } from "@/data/food.js";
import { nutrientIndices } from "@/data/nutrientIndices.js";

function arraysDifference(arr1, arr2) {
  return arr1.filter(x => !arr2.includes(x));
}

function clauseForSelectedAll(filters, userId) {
  return filters.where("user_id").equals(userId);
}

function clauseForSelectedProducts(filters, userID, payload) {
  const payloadIDs = payload.map(id => [userID, id]);
  return filters.where(["user_id", "product_id"]).anyOf(payloadIDs);
}

function getA(multipliers, groupedNutrients, simplexConditions) {
  const constraintsIndices = simplexConditions.constraints.map(
    constraint => constraint[0]
  );
  const A = constraintsIndices.map((nutrientID, index) => {
    const nutrientPosition = getNutrientPosition(nutrientID);
    const row = groupedNutrients.map(
      product => product[1][nutrientPosition] * multipliers[index]
    );
    return row;
  });
  return A;
}

function getB(simplexConditions, multipliers) {
  return simplexConditions.constraints.map(
    (constraint, index) => constraint[2] * multipliers[index]
  );
}

function getC(groupedNutrients, objective) {
  const objectivetPosition = getNutrientPosition(objective);
  return groupedNutrients.map(food => -food[1][objectivetPosition]);
}

function getConstraintWithRation(nutrients, constraint, days) {
  const nutrientID = constraint[0];
  const nutrientIndex = nutrientIndices.findIndex(
    nutrientIndex => nutrientIndex === nutrientID
  );
  const nutrientValue = nutrients[nutrientIndex].valueAbs;
  const border = constraint[2];
  let result = border * days - nutrientValue;
  if (result <= 0) {
    result = constraint[1] === ">=" ? 0 : Infinity;
  }
  return result;
}

function getFilteredNutrients(selectedProducts) {
  const selectedProductsIndices = selectedProducts.map(product => product[0]);
  return foodNutrient.filter(product =>
    selectedProductsIndices.includes(product[0])
  );
}

function getIndices(groupedNutrients) {
  return groupedNutrients.map(product => product[0]);
}

function getNutrientPosition(nutrientID) {
  return nutrientIndices.indexOf(nutrientID);
}

//it can't be getter because of async
async function getSelectedProducts(db) {
  const selectedFilters = await db.filters.where({ selected: 1 }).toArray();
  const selectedFildersIDs = selectedFilters.map(filter => filter.product_id);
  const result = food.filter(product =>
    selectedFildersIDs.includes(product[0])
  );
  return result;
}

function modifySelected(filters, userID, selectedIDs, isSelected) {
  const whereClauseUnselected = clauseForSelectedProducts(
    filters,
    userID,
    selectedIDs
  );
  whereClauseUnselected.modify({
    selected: isSelected
  });
}

export {
  arraysDifference,
  clauseForSelectedAll,
  clauseForSelectedProducts,
  getA,
  getB,
  getC,
  getConstraintWithRation,
  getFilteredNutrients,
  getIndices,
  getSelectedProducts,
  modifySelected
};
