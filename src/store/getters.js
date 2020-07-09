import { conditions } from "@/data/DBSettings";
import { deepCopy } from "@/api/deepCopy.js";
import {
  getA,
  getB,
  getC,
  getFilteredNutrients,
  getIndices,
  getSelectedProducts
} from "@/store/store_service.js";

const getters = {
  getConditions: state =>
    async function () {
      const simplexConditions = deepCopy(conditions);
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
