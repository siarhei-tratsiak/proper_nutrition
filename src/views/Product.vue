<template>
  <v-card>
    <v-card-title>{{ productName }}</v-card-title>

    <NutrientsTable :nutrients='nutrients' />
  </v-card>
</template>

<script>
import { foodNutrients } from '@/data/foodNutrients.js'
import { products } from '@/data/products'
import GetNutrietsTableData from '@/mixins/GetNutrientsTableData'
import NutrientsTable from '@/components/nutrientsTable/NutrientsTable'

export default {
  components: {
    NutrientsTable
  },

  computed: {
    productName: function () {
      const product = products.find(product => product[0] === this.productID)
      const productName = product[1]
      return productName
    }
  },

  data: function () {
    return {
      productID: +this.$route.params.id
    }
  },

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

  mixins: [GetNutrietsTableData]
}
</script>
