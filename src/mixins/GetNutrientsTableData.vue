<script>
import { conditions } from "@/data/DBSettings.js";
import { mapGetters } from "vuex";
import { nutrient as nutrients } from "@/data/nutrient.js";
import { nutrientIndices } from "@/data/nutrientIndices.js";
import ProgressBarCell from "@/components/nutrientsTable/ProgressBarCell";

export default {
  components: { ProgressBarCell },

  computed: {
    ...mapGetters(["getReducedConstraints"]),

    nutrients: function() {
      const usedNutrients = this._getUsedNutrients();
      const nutrientValues = this._getNutrientValues();
      const reducedConstraints = this.getReducedConstraints();
      const nutrients = this._getNutrients(
        usedNutrients,
        reducedConstraints,
        nutrientValues
      );
      return nutrients;
    }
  },

  data: function() {
    return {
      headers: [
        { text: "нутриент", value: "name" },
        { text: "в 100 г продукта", value: "value" },
        { text: "ед. изм.", value: "units" }
      ]
    };
  },

  methods: {
    _combineConstraints(acc, constraint) {
      const constraintNutrientID = constraint[0];
      const borderValue = constraint[2];
      if (acc.length > 0) {
        const lastAccConstraint = acc[acc.length - 1];
        const lastAccNutrientID = lastAccConstraint[0];
        if (constraintNutrientID === lastAccNutrientID) {
          lastAccConstraint.push(borderValue);
          return acc;
        }
      }
      acc.push([constraintNutrientID, borderValue]);
      return acc;
    },

    _findConstraintWithID(reducedConstraints, nutrientID) {
      return reducedConstraints.find(
        constraint => constraint[0] === nutrientID
      );
    },

    _getBase(comparison) {
      const maxAbs = Math.max(...comparison);
      const base = maxAbs === 0 ? 0 : 100 / maxAbs;
      return base;
    },

    _getNutrient(nutrientIndex) {
      return nutrients
        .find(nutrient => nutrient[0] === nutrientIndex)
        .slice(0, 3);
    },

    _getNutrients(usedNutrients, reducedConstraints, nutrientValues) {
      const nutrients = usedNutrients.map((usedNutrient, rowIndex) => {
        const progressBarData = this._getProgressBarData(
          reducedConstraints,
          nutrientValues,
          usedNutrient,
          rowIndex
        );
        return progressBarData;
      });
      return nutrients;
    },

    _getProgressBarData(
      reducedConstraints,
      nutrientValues,
      usedNutrient,
      rowIndex
    ) {
      const nutrientID = usedNutrient[0];
      const mockNutrientConstraints = [null, 0, null];
      const nutrientConstraints =
        this._findConstraintWithID(reducedConstraints, nutrientID) ||
        mockNutrientConstraints;
      const nutrientValue = nutrientValues[rowIndex];
      const { minAbs, maxAbs } = this._getMinimaxAbs(nutrientConstraints);
      const comparison = [minAbs, nutrientValue, maxAbs];
      const base = this._getBase(comparison);
      const value = minAbs + maxAbs === 0 ? 0 : base * nutrientValue;
      return {
        base,
        minAbs,
        valueAbs: nutrientValue,
        maxAbs: maxAbs,
        min: base * minAbs,
        value,
        max: base * maxAbs,
        name: usedNutrient[1],
        units: usedNutrient[2]
      };
    },

    _getReducedConstraints() {
      const initialAcc = [];
      return conditions.constraints.reduce(
        this._combineConstraints,
        initialAcc
      );
    },

    _getUsedNutrients() {
      return nutrientIndices.map(this._getNutrient);
    }
  }
};
</script>

<style>
th:first-of-type.text-start {
  width: 200px;
}
th:last-of-type.text-start {
  width: 100px;
}
</style>
