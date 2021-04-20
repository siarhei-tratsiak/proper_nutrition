<script>
import { mapGetters, mapState } from 'vuex'
import { nutrientIndices } from '@/data/nutrientIndices'
import { nutrients as nutrientsRU } from '@/data/nutrients_ru'
import { nutrients as nutrientsEN } from '@/data/nutrients_en'
import ProgressBarCell from '@/components/nutrientsTable/ProgressBarCell'

export default {
  components: { ProgressBarCell },

  computed: {
    ...mapGetters(['getReducedConstraints']),

    ...mapState(['constraints', 'period', 'products', 'productsList', 'rationForPeriod']),

    rationProductIDs: function () {
      const onlyUnique = (value, index, self) => self.indexOf(value) === index
      return this.rationForPeriod
        .map(product => product.id)
        .filter(onlyUnique)
    }
  },

  methods: {
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

    _getUsedNutrients: function () {
      const importedNutrients = this.$i18n.locale === 'ru'
        ? nutrientsRU
        : nutrientsEN
      return importedNutrients
        .filter(this._isFromNutrientIndices)
        .map(this._sliceNutrient)
    },

    _isFromNutrientIndices: function (nutrient) {
      return nutrientIndices.includes(nutrient[0])
    },

    _sliceNutrient: function (nutrient) {
      return nutrient.slice(0, 3)
    },

    _getNutrients: function (usedNutrients, reducedConstraints, nutrientValues) {
      const nutrients = usedNutrients.map(usedNutrient =>
        this._getProgressBarData({
          nutrientValues,
          reducedConstraints,
          usedNutrient
        })
      )
      return nutrients
    },

    _getProgressBarData: function (payload) {
      const nutrientID = payload.usedNutrient[0]
      const mockNutrientConstraints = [null, 0, null]
      const nutrientConstraints =
        this._findConstraintWithID(payload.reducedConstraints, nutrientID) ||
        mockNutrientConstraints
      const usedNutrientID = payload.usedNutrient[0]
      const rowIndex = this._findIndex(usedNutrientID)
      const nutrientValue = payload.nutrientValues[rowIndex]
      const { minAbs, maxAbs } = this._getMinimaxAbs(nutrientConstraints)
      const comparison = [minAbs, nutrientValue, maxAbs]
      const base = this._getBase(comparison)
      const isMain = minAbs > 0 || typeof maxAbs === 'number'
      const valuePayload = { base, isMain, maxAbs, minAbs, nutrientValue }
      const value = this._getValue(valuePayload)
      return {
        base,
        id: nutrientID,
        isMain,
        max: base * maxAbs,
        maxAbs,
        min: base * minAbs,
        minAbs,
        name: payload.usedNutrient[1],
        units: payload.usedNutrient[2],
        value,
        valueAbs: nutrientValue
      }
    },

    _findConstraintWithID: function (reducedConstraints, nutrientID) {
      return reducedConstraints.find(
        (constraint) => constraint[0] === nutrientID
      )
    },

    _findIndex: usedNutrientID => nutrientIndices
      .findIndex(nutrientID => nutrientID === usedNutrientID),

    _getBase: function (comparison) {
      const maxAbs = Math.max(...comparison)
      const base = maxAbs === 0 ? 0 : 100 / maxAbs
      return base
    },

    _getValue: function (payload) {
      const isStriped = payload.isMain || (payload.nutrientValue === 0)
      const value = payload.minAbs + payload.maxAbs === 0
        ? 0
        : payload.base * payload.nutrientValue
      return isStriped
        ? value
        : 100
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
