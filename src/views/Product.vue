<template>
  <v-card>
    <v-card-title>
      {{ productName }}

      <v-spacer />

      <AddProductButton />
    </v-card-title>

    <NutrientsTable :nutrients='nutrients()' />
    <ProductDialog />
  </v-card>
</template>

<script>
import { foodNutrients } from '@/data/foodNutrients.js'
import { IDBS } from '@/api/indexedDBService'
import GetNutrietsTableData from '@/mixins/GetNutrientsTableData'
import NutrientsTable from '@/components/common/nutrientsTable/NutrientsTable'
import AddProductButton from '@/components/common/AddProductButton'
import ProductDialog from '@/components/common/dialog/ProductDialog'
import { mapGetters } from 'vuex'

export default {
  components: {
    AddProductButton,
    NutrientsTable,
    ProductDialog
  },

  computed: {
    productName: function () {
      const products = IDBS.getProducts(this.$i18n.locale)
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
    ...mapGetters(['getReducedConstraints']),

    _getNutrientValues: function () {
      const foodNutrientWithCurrentID = foodNutrients.find(
        this._foodNutrientWithCurrentID
      )
      const nutrientValues = foodNutrientWithCurrentID[1]
      return nutrientValues
    },

    _foodNutrientWithCurrentID: function (foodNutrientRecord) {
      const foodNutrientProductID = foodNutrientRecord[0]
      return this.productID === foodNutrientProductID
    },

    _getReducedConstraints: function () {
      const days = 1
      return this.getReducedConstraints()(days)
    }
  },

  mixins: [GetNutrietsTableData]
}
</script>
