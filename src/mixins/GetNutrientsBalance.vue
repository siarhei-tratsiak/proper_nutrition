<script>
import { foodNutrients } from '@/data/foodNutrients'
import { mapActions, mapState } from 'vuex'
import { np } from '@/api/np'
import { nutrientIndices } from '@/data/nutrientIndices'
import GetNutrietsTableData from '@/mixins/GetNutrientsTableData'

export default {
  computed: {
    ...mapState(['products', 'rationForPeriod', 'selectedProductIDs'])
  },

  created: function () {
    this.setRationForPeriod()
  },

  methods: {
    ...mapActions(['setRationForPeriod']),

    // do not move to GetNutrietsTableData
    // these functions may differ in parent components
    _getMinimaxAbs (days, nutrientConstraints) {
      const minAbs = nutrientConstraints[1] * days
      const maxAbs = nutrientConstraints[2]
        ? nutrientConstraints[2] * days
        : null
      return { minAbs, maxAbs }
    },

    _getNutrientValues () {
      const nutrientsCount = nutrientIndices.length
      let nutrientValues = np.zeros(nutrientsCount)
      const isMultipleProducts = this.products.length ||
        this.rationForPeriod.length
      if (isMultipleProducts) {
        nutrientValues = this._forMultipleProducts()
      }
      return nutrientValues
    },

    _forMultipleProducts () {
      const isHome = this.$route.name === 'Home'
      const usedfoodNutrients = foodNutrients.filter(foodNutrientRecord =>
        this._usedfoodNutrients(foodNutrientRecord, isHome))
      const nutrientValuesTotal = usedfoodNutrients.map(
        this._getNutrientValuesTotal
      )
      const summedNutrientValues = nutrientValuesTotal.length
        ? nutrientValuesTotal.reduce(this._rowsSum)
        : np.zeros(65)
      return summedNutrientValues
    },

    _usedfoodNutrients (foodNutrientRecord, isHome) {
      const productID = foodNutrientRecord[0]
      const isUsed =
        (isHome ? false : this.selectedProductIDs.includes(productID)) ||
        this.rationProductIDs.includes(productID)
      return isUsed
    },

    _getNutrientValuesTotal (foodNutrients) {
      const productID = foodNutrients[0]
      const productValue = this._getProductValue(productID)
      const nutrientValues = foodNutrients[1]
      const nutrientValuesTotal = nutrientValues.map(
        nutrientValue => (nutrientValue * productValue) / 100
      )
      return nutrientValuesTotal
    },

    _getProductValue (productID) {
      const findedProduct = this.products.find(
        product => product.id === productID
      )
      const resultProductValue = findedProduct ? findedProduct.mass : 0
      const findedRation = this.rationForPeriod.find(
        product => product.id === productID
      )
      const rationProductValue = findedRation ? findedRation.value : 0
      return resultProductValue + rationProductValue
    },

    _getProductIDs () {
      return this.products.map(product => product.id)
    },

    _getRationProductIDs () {
      return this.rationForPeriod.map(product => product.id)
    },

    _rowsSum (acc, nutrientValues) {
      return acc.map(
        (nutrientValue, index) => nutrientValues[index] + nutrientValue
      )
    }
  },

  mixins: [GetNutrietsTableData]
}
</script>
