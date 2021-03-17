<template>
  <v-card>
    <v-card-title>{{ productName }}</v-card-title>
    <NutrientsTable :productID="productID"></NutrientsTable>
  </v-card>
</template>

<script>
import { products } from '@/data/products'
import NutrientsTable from '@/components/nutrientsTable/NutrientsTable'

export default {
  components: { NutrientsTable },

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
  }
}
</script>
