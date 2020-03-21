import {
  conditions,
} from '@/data/DBSettings';
import {
  getSelectedProducts,
} from '@/store/store_service.js';
import {deepCopy} from '@/api/deepCopy.js';

const getters = {

  getConditions: (state) => async function() {
    const simplexConditions = deepCopy(conditions);
    const namedVectorNames = simplexConditions.constraints.map(
        (constraint) => constraint.namedVector,
    );
    const multipliers = simplexConditions.constraints.map(
        (constraint) => constraint.constraint === '>=' ? -1 : 1,
    );
    const db = await state.db;
    if (db.products) {
      const selectedProducts = await getSelectedProducts(db);
      const A = namedVectorNames.map((name, index) => selectedProducts.map(
          (product) => product[name] * multipliers[index]),
      );
      const b = simplexConditions.constraints.map(
          (constraint, index) => constraint.constant * multipliers[index],
      );
      const c = selectedProducts.map(
          (product) => -product[simplexConditions.objective],
      );
      const indices = selectedProducts.map((product) => product.id);
      return {
        A,
        b,
        c,
        indices,
      };
    }
  },

};

export {getters};
