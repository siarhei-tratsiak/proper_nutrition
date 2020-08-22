<template>
  <v-card>
    <v-data-table
      disable-pagination
      :headers="headers"
      hide-default-footer
      item-key="name"
      :items="nutrients"
      mobile-breakpoint="600"
    >
      <template v-slot:[`item.value`]="{ item }">
        <ProgressBarCell :nutrient="item"></ProgressBarCell>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { foodNutrient } from '@/data/foodNutrient.js'
import GetNutrietsTableData from '@/mixins/GetNutrientsTableData'

export default {
  methods: {
    _foodNutrientWithCurrentID (foodNutrientRecord) {
      const foodNutrientProductID = foodNutrientRecord[0]
      return this.productID === foodNutrientProductID
    },

    _getMinimaxAbs (nutrientConstraints) {
      const minAbs = nutrientConstraints[1]
      const maxAbs = nutrientConstraints[2]
      return { minAbs, maxAbs }
    },

    _getNutrientValues () {
      const foodNutrientWithCurrentID = foodNutrient.find(
        this._foodNutrientWithCurrentID
      )
      const nutrientValues = foodNutrientWithCurrentID[1]
      return nutrientValues
    }
  },

  mixins: [GetNutrietsTableData],

  props: ['productID']
}
</script>
