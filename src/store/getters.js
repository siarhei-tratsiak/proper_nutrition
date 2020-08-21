import {
  getA,
  getB,
  getC,
  getConstraintWithRation,
  getFilteredNutrients,
  getIndices,
  getSelectedProducts
} from "@/store/store_service.js";

const getters = {
  getConditions: state =>
    async function (nutrients) {
      const msInDay = 24 * 60 * 60 * 1000;
      const days = Math.round(
        (state.period.end - state.period.start) / msInDay
      );
      const simplexConstraints = state.constraints.map(constraint => {
        [constraint.min, constraint.max] = getConstraintWithRation(
          nutrients,
          constraint,
          days
        );
        return constraint;
      });
      const db = await state.db;
      const selectedProducts = await getSelectedProducts(db);
      const groupedNutrients = getFilteredNutrients(selectedProducts);
      const objective = simplexConstraints.find(
        constraint => constraint.target !== 2
      );
      const A = getA(groupedNutrients, simplexConstraints);
      const b = getB(simplexConstraints, objective);
      const c = getC(groupedNutrients, objective);
      const indices = getIndices(groupedNutrients);
      return {
        A,
        b,
        c,
        indices
      };
    },

  getReducedConstraints: state => () => {
    return state.constraints.map(constraint => [
      constraint.nutrient_id,
      constraint.min,
      constraint.max
    ]);
  }
};

export { getters };
