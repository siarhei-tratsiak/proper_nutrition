<script>
import { foodNutrients } from '@/data/foodNutrients'
import { mapActions, mapGetters, mapState } from 'vuex'
import { np } from '@/api/np'
import { nutrientIndices } from '@/data/nutrientIndices'
import GetNutrietsTableData from '@/mixins/GetNutrientsTableData'
import { dates } from '@/api/dates'

export default {

  computed: {
    ...mapState(['days', 'period', 'resultProducts', 'rationForPeriod', 'selectedProductIDs'])
  },

  created: function () {
    this.setRationForPeriod()
  },

  methods: {
    ...mapActions(['setRationForPeriod']),
    ...mapGetters(['getReducedConstraints']),

    // do not move to GetNutrietsTableData
    // these functions may differ in parent components

    _getNutrientValues: function () {
      const nutrientsCount = nutrientIndices.length
      let nutrientValues = np.zeros(nutrientsCount)
      const isMultipleProducts = this.$route.name !== 'Product'
      if (isMultipleProducts) {
        nutrientValues = this._forMultipleProducts()
      }
      return nutrientValues
    },

    _forMultipleProducts: function () {
      const isHome = this.$route.name === 'Home'
      const usedfoodNutrients = foodNutrients.filter(foodNutrientRecord =>
        this._usedfoodNutrients(foodNutrientRecord, isHome))
      const nutrientValuesTotal = usedfoodNutrients
        .map(this._getNutrientValuesTotal)
      const summedNutrientValues = nutrientValuesTotal.length
        ? nutrientValuesTotal.reduce(this._rowsSum)
        : np.zeros(nutrientIndices.length)
      return summedNutrientValues
    },

    _usedfoodNutrients: function (foodNutrientRecord, isHome) {
      const productID = foodNutrientRecord[0]
      const isUsed =
        (isHome ? false : this.selectedProductIDs.includes(productID)) ||
        this.rationProductIDs.includes(productID)
      return isUsed
    },

    _getNutrientValuesTotal: function (foodNutrients) {
      const productID = foodNutrients[0]
      const productValue = this._getProductValue(productID)
      const nutrientValues = foodNutrients[1]
      const nutrientValuesTotal = nutrientValues.map(
        nutrientValue => (nutrientValue * productValue) / 100
      )
      return nutrientValuesTotal
    },

    _getProductValue: function (productID) {
      const resultProduct = this.resultProducts.find(
        product => product.id === productID
      )
      const resultProductValue = resultProduct ? resultProduct.mass : 0
      const filterProducts = product => product.id === productID
      const sumProducts = (sum, product) => sum + product.value
      const findedRation = this.rationForPeriod
        .filter(filterProducts)
        .reduce(sumProducts, 0)
      const rationProductValue = findedRation || 0
      return resultProductValue + rationProductValue
    },

    _getProductIDs: function () {
      return this.resultProducts.map(product => product.id)
    },

    _getReducedConstraints: function () {
      const days = dates.getDays(this.period.start, this.period.end)
      return this.getReducedConstraints()(days)
    },

    _rowsSum: function (acc, nutrientValues) {
      return acc.map(
        (nutrientValue, index) => nutrientValues[index] + nutrientValue
      )
    }
  },

  mixins: [GetNutrietsTableData]
}
</script>
