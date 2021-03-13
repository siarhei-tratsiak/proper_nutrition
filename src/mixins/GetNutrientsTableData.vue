<script>
import { conditions } from '@/data/DBSettings'
import { dates } from '@/api/dates'
import { foodNutrients } from '@/data/foodNutrients'
import { mapGetters, mapState } from 'vuex'
import { nutrient as nutrients } from '@/data/nutrient'
import { nutrientIndices } from '@/data/nutrientIndices'
import { np } from '@/api/np'
import ProgressBarCell from '@/components/nutrientsTable/ProgressBarCell'

export default {
  components: { ProgressBarCell },

  computed: {
    ...mapGetters(['getReducedConstraints']),

    ...mapState(['period', 'products', 'productsList', 'rationForPeriod']),

    nutrients: function () {
      const usedNutrients = this._getUsedNutrients()
      const nutrientValues = this._getNutrientValues()
      const reducedConstraints = this.getReducedConstraints()
      const nutrients = this._getNutrients(
        usedNutrients,
        reducedConstraints,
        nutrientValues
      )
      return nutrients
    },

    productIDs: function () {
      return this.productsList.map(product => product.id)
    },

    rationProductIDs: function () {
      return this.rationForPeriod.map(product => product.id)
    }
  },

  data: function () {
    return {
      headers: [
        { text: 'нутриент', value: 'name' },
        { text: 'в 100 г продукта', value: 'value' },
        { text: 'ед. изм.', value: 'units' }
      ]
    }
  },

  methods: {
    _getUsedNutrients () {
      return nutrients
        .filter(this._isFromNutrientIndices)
        .map(this._sliceNutrient)
    },

    _isFromNutrientIndices (nutrient) {
      return nutrientIndices.includes(nutrient[0])
    },

    _sliceNutrient (nutrient) {
      return nutrient.slice(0, 3)
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
      const usedfoodNutrients = foodNutrients.filter(this._usedfoodNutrients)
      const nutrientValuesTotal = usedfoodNutrients.map(
        this._getNutrientValuesTotal
      )
      const summedNutrientValues = nutrientValuesTotal.length
        ? nutrientValuesTotal.reduce(this._rowsSum)
        : np.zeros(65)
      return summedNutrientValues
    },

    _usedfoodNutrients (foodNutrientRecord) {
      const isHome = this.$route.name === 'Home'
      const productID = foodNutrientRecord[0]
      const isUsed =
        (isHome ? false : this.productIDs.includes(productID)) ||
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
      const resultProductValue = findedProduct ? findedProduct.value : 0
      const findedRation = this.rationForPeriod.find(
        product => product.id === productID
      )
      const rationProductValue = findedRation ? findedRation.value : 0
      return resultProductValue + rationProductValue
    },

    _getNutrients (usedNutrients, reducedConstraints, nutrientValues) {
      const days = dates.getDays(this.period.start, this.period.end)
      const nutrients = usedNutrients.map((usedNutrient, rowIndex) =>
        this._getProgressBarData({
          days,
          nutrientValues,
          reducedConstraints,
          rowIndex,
          usedNutrient
        })
      )
      return nutrients
    },

    _getProgressBarData (payload) {
      const nutrientID = payload.usedNutrient[0]
      const mockNutrientConstraints = [null, 0, null]
      const nutrientConstraints =
        this._findConstraintWithID(payload.reducedConstraints, nutrientID) ||
        mockNutrientConstraints
      const nutrientValue = payload.nutrientValues[payload.rowIndex]
      const { minAbs, maxAbs } = this._getMinimaxAbs(
        payload.days, nutrientConstraints)
      const comparison = [minAbs, nutrientValue, maxAbs]
      const base = this._getBase(comparison)
      const value = minAbs + maxAbs === 0 ? 0 : base * nutrientValue
      return {
        base,
        minAbs,
        valueAbs: nutrientValue,
        maxAbs: maxAbs,
        min: base * minAbs,
        value,
        max: base * maxAbs,
        name: payload.usedNutrient[1],
        units: payload.usedNutrient[2]
      }
    },

    _getMinimaxAbs (days, nutrientConstraints) {
      const minAbs = nutrientConstraints[1] * days
      const maxAbs = nutrientConstraints[2]
        ? nutrientConstraints[2] * days
        : null
      return { minAbs, maxAbs }
    },

    _getBase (comparison) {
      const maxAbs = Math.max(...comparison)
      const base = maxAbs === 0 ? 0 : 100 / maxAbs
      return base
    },

    _findConstraintWithID (reducedConstraints, nutrientID) {
      return reducedConstraints.find(
        constraint => constraint[0] === nutrientID
      )
    },

    _combineConstraints (acc, constraint) {
      const constraintNutrientID = constraint[0]
      const borderValue = constraint[2]
      if (acc.length > 0) {
        const lastAccConstraint = acc[acc.length - 1]
        const lastAccNutrientID = lastAccConstraint[0]
        if (constraintNutrientID === lastAccNutrientID) {
          lastAccConstraint.push(borderValue)
          return acc
        }
      }
      acc.push([constraintNutrientID, borderValue])
      return acc
    },

    _getReducedConstraints () {
      const initialAcc = []
      return conditions.constraints.reduce(
        this._combineConstraints,
        initialAcc
      )
    }

  }
}
</script>

<style>
th:first-of-type.text-start {
  width: 200px;
}
th:last-of-type.text-start {
  width: 100px;
}
</style>
