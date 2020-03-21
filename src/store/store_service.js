function clauseForSelectedAll(filters, userId) {
  return filters.where('user_id').equals(userId);
}

async function clauseForSelectedCategory(state, payload, filters, userId) {
  const categoryProducts = await state.db.products
      .where('category_id').equals(payload.category_id).toArray();
  const categoryProductsIds = categoryProducts.map((product) => product.id);
  return filters
      .where('product_id').anyOf(categoryProductsIds)
      .and((filter) => filter.user_id === userId);
}

function clauseForSelectedProduct(filters, userId, payload) {
  return filters.where({user_id: userId, product_id: payload.id});
}

async function getSelectedProducts(db) {
  const products = await db.products.toArray();
  const selectedFilters = await db.filters
      .where({selected: 1}).toArray();
  const selectedFildersIDs = selectedFilters
      .map((filter) => filter.product_id);
  return products.filter(
      (product) => selectedFildersIDs.includes(product.id),
  );
}

export {
  clauseForSelectedAll,
  clauseForSelectedCategory,
  clauseForSelectedProduct,
  getSelectedProducts,
};
