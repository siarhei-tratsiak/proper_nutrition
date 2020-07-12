import { conditions } from "@/data/DBSettings";
import { deepCopy } from "@/api/deepCopy.js";
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
      const simplexConditions = deepCopy(conditions);
      const msInDay = 24 * 60 * 60 * 1000;
      const days = Math.round(
        (state.period.end - state.period.start) / msInDay
      );
      simplexConditions.constraints.forEach(constraint => {
        constraint[2] = getConstraintWithRation(nutrients, constraint, days);
      });
      const multipliers = simplexConditions.constraints.map(constraint =>
        constraint[1] === ">=" ? -1 : 1
      );
      const db = await state.db;
      const selectedProducts = await getSelectedProducts(db);
      const groupedNutrients = getFilteredNutrients(selectedProducts);
      const A = getA(multipliers, groupedNutrients, simplexConditions);
      const b = getB(simplexConditions, multipliers);
      const c = getC(groupedNutrients, simplexConditions.objective);
      const indices = getIndices(groupedNutrients);
      return {
        A,
        b,
        c,
        indices
      };
    }
};

export { getters };
