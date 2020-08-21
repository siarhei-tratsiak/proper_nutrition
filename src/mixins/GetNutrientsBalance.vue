<script>
import { foodNutrient } from "@/data/foodNutrient.js";
import { mapActions, mapState } from "vuex";
import { zeros } from "@/api/np.js";
import GetNutrietsTableData from "@/mixins/GetNutrientsTableData";

export default {
  computed: {
    ...mapState(["period", "products", "rationForPeriod"]),

    productIDs: function() {
      return this.products.map(product => product.id);
    },

    rationProductIDs: function() {
      return this.rationForPeriod.map(product => product.id);
    }
  },

  created: function() {
    this.setRationForPeriod();
  },

  methods: {
    ...mapActions(["setRationForPeriod"]),

    _forMultipleProducts() {
      const isHome = this.$route.name === "Home";
      const usedfoodNutrients = foodNutrient.filter(foodNutrientRecord =>
        this._usedfoodNutrients(foodNutrientRecord, isHome)
      );
      const nutrientValuesTotal = usedfoodNutrients.map(
        this._getNutrientValuesTotal
      );
      const summedNutrientValues = nutrientValuesTotal.length
        ? nutrientValuesTotal.reduce(this._rowsSum)
        : zeros(65);
      return summedNutrientValues;
    },

    _getMinimaxAbs(nutrientConstraints) {
      const msInDay = 24 * 60 * 60 * 1000;
      const days = Math.round((this.period.end - this.period.start) / msInDay);
      const minAbs = nutrientConstraints[1] * days;
      const maxAbs = nutrientConstraints[2]
        ? nutrientConstraints[2] * days
        : null;
      return { minAbs, maxAbs };
    },

    _getNutrientValues() {
      let nutrientValues = zeros(65);
      if (this.products.length || this.rationForPeriod.length) {
        nutrientValues = this._forMultipleProducts();
      }
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

    _getProductIDs() {
      return this.products.map(product => product.id);
    },

    _getProductValue(productID) {
      const findedProduct = this.products.find(
        product => product.id === productID
      );
      const resultProductValue = findedProduct ? findedProduct.value : 0;
      const findedRation = this.rationForPeriod.find(
        product => product.id === productID
      );
      const rationProductValue = findedRation ? findedRation.value : 0;
      return resultProductValue + rationProductValue;
    },

    _getRationProductIDs() {
      return this.rationForPeriod.map(product => product.id);
    },

    _rowsSum(acc, nutrientValues) {
      return acc.map(
        (nutrientValue, index) => nutrientValues[index] + nutrientValue
      );
    },

    _usedfoodNutrients(foodNutrientRecord, isHome) {
      const productID = foodNutrientRecord[0];
      const isUsed =
        (isHome ? false : this.productIDs.includes(productID)) ||
        this.rationProductIDs.includes(productID);
      return isUsed;
    }
  },

  mixins: [GetNutrietsTableData]
};
</script>
