import {
  conditions,
} from '@/data/DBSettings';

const getters = {

  async getConditions(state) {
    const simplexConditions = JSON.parse(
        JSON.stringify(conditions),
    ); // deep cloning
    const namedVectorNames = simplexConditions.constraints.map(
        (constraint) => constraint.namedVector,
    );
    const multipliers = simplexConditions.constraints.map(
        (constraint) => constraint.constraint === '>=' ? -1 : 1,
    );
    const db = await state.db;
    if (db.products) {
      const products = await db.products.toArray();

      const A = namedVectorNames.map((name, index) => products.map(
          (product) => product[name] * multipliers[index]),
      );
      const b = simplexConditions.constraints.map(
          (constraint, index) => constraint.constant * multipliers[index],
      );
      const c = products.map(
          (product) => -product[simplexConditions.objective],
      );

      return {
        A,
        b,
        c,
      };
    }
  },

};

export {getters};
