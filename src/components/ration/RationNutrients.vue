<template>
  <v-card class="flex-grow-1 ma-1">
    <v-card-title>
      {{ $t('result.nutrientsHeader', { recommendations: "" }) }}
    </v-card-title>

    <NutrientsTable :nutrients="nutrientsTableData" />
  </v-card>
</template>

<script>
import NutrientsTable from '@/components/common/nutrientsTable/NutrientsTable'
import { nutrientIndices } from '@/data/nutrientIndices'
import { np } from '@/api/np'
import { foodNutrients } from '@/data/foodNutrients'
import { mapState } from 'vuex'
import GetNutrientsTableData from '@/mixins/GetNutrientsTableData'

export default {
  components: {
    NutrientsTable
  },

  computed: {
    ...mapState(['ration']),

    nutrientsTableData: function () {
      return this.nutrients()
    },

    rationProductIDs: function () {
      const onlyUnique = (value, index, self) => self.indexOf(value) === index
      return this.ration
        .map(product => product.product_id)
        .filter(onlyUnique)
    }
  },

  methods: {
    _getNutrientValues: function () {
      const usedfoodNutrients = foodNutrients.filter(this._usedfoodNutrients)
      const nutrientValuesTotal = usedfoodNutrients
        .map(this._getNutrientValuesTotal)
      const summedNutrientValues = nutrientValuesTotal.length
        ? nutrientValuesTotal.reduce(this._rowsSum)
        : np.zeros(nutrientIndices.length)
      return summedNutrientValues
    },

    _usedfoodNutrients: function (foodNutrientRecord) {
      const productID = foodNutrientRecord[0]
      const isUsed = this.rationProductIDs.includes(productID)
      return isUsed
    },

    _getNutrientValuesTotal: function (foodNutrientRecord) {
      const productID = foodNutrientRecord[0]
      const productValue = this._getProductValue(productID)
      const nutrientValues = foodNutrientRecord[1]
      const nutrientValuesTotal = nutrientValues.map(
        nutrientValue => (nutrientValue * productValue) / 100
      )
      return nutrientValuesTotal
    },

    _getProductValue: function (productID) {
      const filterProducts = product => product.product_id === productID
      const sumProducts = (sum, product) => sum + product.mass
      const findedRation = this.ration
        .filter(filterProducts)
        .reduce(sumProducts, 0)
      const rationProductValue = findedRation || 0
      return rationProductValue
    },

    _rowsSum: function (acc, nutrientValues) {
      return acc.map(
        (nutrientValue, index) => nutrientValues[index] + nutrientValue
      )
    },

    _getMinimaxAbs: function (nutrientConstraints) {
      const minAbs = nutrientConstraints[1]
      const maxAbs = nutrientConstraints[2]
        ? nutrientConstraints[2]
        : null
      return { minAbs, maxAbs }
    }
  },

  mixins: [GetNutrientsTableData]
}
</script>
