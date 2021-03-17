<template>
  <v-card>
    <v-data-table
      disable-pagination
      :headers="headers"
      hide-default-footer
      item-key="name"
      :items="nutrients"
      :mobile-breakpoint="mobileBreakpoint"
    >
      <template v-slot:[`item.value`]="{ item }">
        <ProgressBarCell :nutrient="item"></ProgressBarCell>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { foodNutrients } from '@/data/foodNutrients.js'
import GetNutrietsTableData from '@/mixins/GetNutrientsTableData'

export default {
  data: () => ({
    mobileBreakpoint: '600'
  }),

  methods: {
    _getMinimaxAbs (_, nutrientConstraints) {
      const minAbs = nutrientConstraints[1]
      const maxAbs = nutrientConstraints[2]
      return { minAbs, maxAbs }
    },

    _getNutrientValues () {
      const foodNutrientWithCurrentID = foodNutrients.find(
        this._foodNutrientWithCurrentID
      )
      const nutrientValues = foodNutrientWithCurrentID[1]
      return nutrientValues
    },

    _foodNutrientWithCurrentID (foodNutrientRecord) {
      const foodNutrientProductID = foodNutrientRecord[0]
      return this.productID === foodNutrientProductID
    }
  },

  mixins: [GetNutrietsTableData],

  props: ['productID']
}
</script>
