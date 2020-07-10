<template>
  <v-data-table
    disable-pagination
    :headers="headers"
    hide-default-footer
    item-key="name"
    :items="nutrients"
    mobile-breakpoint="600"
  >
    <template v-slot:item.value="{ item }">
      <ProgressBarCell :nutrient="item"></ProgressBarCell>
    </template>
  </v-data-table>
</template>

<script>
import { mapState } from "vuex";
import { nutrientIndices } from "@/data/nutrientIndices.js";
import { nutrient as nutrients } from "@/data/nutrient.js";
import { foodNutrient } from "@/data/foodNutrient.js";
import { conditions } from "@/data/DBSettings.js";
import ProgressBarCell from "@/components/nutrientsTable/ProgressBarCell";

export default {
  components: { ProgressBarCell },

  computed: {
    ...mapState(["days", "products"]),

    nutrients: function() {
      const usedNutrients = this._getUsedNutrients();
      const nutrientValues = this._getNutrientValues(this.productIDs);
      const reducedConstraints = this._getReducedConstraints();
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

    _foodNutrientWithCurrentID(foodNutrientRecord, productID) {
      const foodNutrientProductID = foodNutrientRecord[0];
      return productID === foodNutrientProductID;
    },

    _forMultipleProducts(productIDs) {
      const usedfoodNutrients = foodNutrient.filter(foodNutrientRecord =>
        this._usedfoodNutrients(foodNutrientRecord, productIDs)
      );
      const nutrientValuesTotal = usedfoodNutrients.map(
        this._getNutrientValuesTotal
      );
      const summedNutrientValues = nutrientValuesTotal.reduce(this._rowsSum);
      return summedNutrientValues;
    },

    _forSingleProduct(productID) {
      const foodNutrientWithCurrentID = foodNutrient.find(foodNutrientRecord =>
        this._foodNutrientWithCurrentID(foodNutrientRecord, productID)
      );
      const nutrientValues = foodNutrientWithCurrentID[1];
      return nutrientValues;
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

    _getNutrientValues(productIDs) {
      const isSingeProduct = Number.isInteger(productIDs);
      const nutrientValues = isSingeProduct
        ? this._forSingleProduct(productIDs)
        : this._forMultipleProducts(productIDs);
      return nutrientValues;
    },

    _getNutrientValuesTotal(foodNutrient) {
      const productID = foodNutrient[0];
      const productValue = this._getProductValue(productID);
      const nutrientValues = foodNutrient[1];
      const nutrientValuesTotal = nutrientValues.map(
        nutrientValue => (nutrientValue * productValue) / 100
      );
      return nutrientValuesTotal;
    },

    _getProductValue(productID) {
      return this.products.find(product => product.id === productID).value;
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
      const days = this.isResult ? this.days : 1;
      const minAbs = nutrientConstraints[1] * days;
      const maxAbs = nutrientConstraints[2] * days;
      const comparison = [minAbs, nutrientValue, maxAbs || null];
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
    },

    _rowsSum(acc, nutrientValues) {
      return acc.map(
        (nutrientValue, index) => nutrientValues[index] + nutrientValue
      );
    },

    _usedfoodNutrients(foodNutrientRecord, productIDs) {
      const productID = foodNutrientRecord[0];
      const isUsed = productIDs.includes(productID);
      return isUsed;
    }
  },

  props: ["isResult", "productIDs"]
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
