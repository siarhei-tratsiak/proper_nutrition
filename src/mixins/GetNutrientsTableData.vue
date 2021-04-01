<script>
import { conditions } from '@/data/DBSettings'
import { dates } from '@/api/dates'
import { mapGetters, mapState } from 'vuex'
import { nutrients } from '@/data/nutrients_ru'
import { nutrientIndices } from '@/data/nutrientIndices'
import ProgressBarCell from '@/components/nutrientsTable/ProgressBarCell'

export default {
  components: { ProgressBarCell },

  computed: {
    ...mapGetters(['getReducedConstraints']),

    ...mapState(['constraints', 'period', 'products', 'productsList', 'rationForPeriod']),

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

    rationProductIDs: function () {
      return this.rationForPeriod.map((product) => product.id)
    }
  },

  methods: {
    _getUsedNutrients: function () {
      return nutrients
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
      const days = dates.getDays(this.period.start, this.period.end)
      const nutrients = usedNutrients.map(usedNutrient =>
        this._getProgressBarData({
          days,
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
      const { minAbs, maxAbs } = this._getMinimaxAbs(
        payload.days,
        nutrientConstraints
      )
      const comparison = [minAbs, nutrientValue, maxAbs]
      const base = this._getBase(comparison)
      const value = minAbs + maxAbs === 0 ? 0 : base * nutrientValue
      return {
        base,
        isMain: !!(minAbs || maxAbs),
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

    _combineConstraints: function (acc, constraint) {
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

    _getReducedConstraints: function () {
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
